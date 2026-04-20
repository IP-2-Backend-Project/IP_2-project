<?php
session_start();

// check if the user is logged in
if (!isset($_SESSION["user_id"])) {
    echo "User not logged in";
    exit();
}

if ($_SESSION["role"] !== "admin") {
    echo json_encode([
        "status" => "error",
        "message" => "Access denied"
    ]);
    exit();
}

if ($_SERVER["REQUEST_METHOD"] == "POST") {
    if (isset($_POST["application_id"]) && isset($_POST["status"])) {

        $application_id = $_POST["application_id"];
        $status = $_POST["status"];

        $allowed_status = ["Pending", "Accepted", "Rejected"];

        if (!in_array($status, $allowed_status)) {
            echo "Invalid status value";
            exit();
        }

        $sql = "UPDATE applications
                SET status = ?
                WHERE id = ?";

        $stmt = $pdo->prepare($sql);
        $stmt->execute([$status, $application_id]);

        echo "Status updated successfully";

    } else {
        echo "invalid application or status";
    }

}


?>


