<?php

require_once "../../config/cors.php";
require_once "../../config/db.php";

header("Content-Type: application/json");

$data = json_decode(file_get_contents("php://input"), true);

if (!$data) {
    echo json_encode([
        "status" => "error",
        "message" => "Invalid input"
    ]);
    exit();
}

$email = trim($data['email']);
$password = $data['password'];

try {

    $stmt = $pdo->prepare("SELECT * FROM users WHERE email = ?");
    $stmt->execute([$email]);

    $user = $stmt->fetch(PDO::FETCH_ASSOC);

    if ($user && password_verify($password, $user['password'])) {

        $_SESSION['user_id'] = $user['id'];
        $_SESSION['role'] = $user['role'];

        echo json_encode([
            "status" => "success",
            "data" => [
                "id" => $user['id'],
                "email" => $user['email'],
                "role" => $user['role']
            ]
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
