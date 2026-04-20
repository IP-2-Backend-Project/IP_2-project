<?php

header("Content-Type: application/json");
header("Access-Control-Allow-Origin: *");

require_once "../config/db.php";

$data = json_decode(
    file_get_contents("php://input")
);

$email = $data->email;
$password = $data->password;

try {

    $sql = "SELECT *
            FROM users
            WHERE email = :email
            AND password = :password";

    $stmt = $pdo->prepare($sql);

    $stmt->execute([
        ":email" => $email,
        ":password" => $password
    ]);

    $user = $stmt->fetch(PDO::FETCH_ASSOC);

    if ($user) {

        echo json_encode([
            "status" => "success",
            "user" => $user
        ]);

    } else {

        echo json_encode([
            "status" => "error",
            "message" => "Invalid email or password"
        ]);

    }

} catch (PDOException $e) {

    echo json_encode([
        "status" => "error",
        "message" => "Login failed"
    ]);

}

?>
