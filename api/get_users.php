<?php

header("Content-Type: application/json");
header("Access-Control-Allow-Origin: *");

require_once "../config/db.php";

try {

    $sql = "SELECT id, name, email FROM users";

    $stmt = $pdo->prepare($sql);

    $stmt->execute();

    $users = $stmt->fetchAll(
        PDO::FETCH_ASSOC
    );

    echo json_encode($users);

} catch (PDOException $e) {

    echo json_encode([
        "status" => "error",
        "message" => "Failed to fetch users"
    ]);

}

?>
