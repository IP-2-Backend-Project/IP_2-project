<?php

header("Content-Type: application/json");
header("Access-Control-Allow-Origin: *");

require_once "../config/db.php";

$data = json_decode(
    file_get_contents("php://input")
);

$name = $data->name;
$email = $data->email;
$password = $data->password;

try {

    $sql = "INSERT INTO users
            (name, email, password)
            VALUES
            (:name, :email, :password)";

    $stmt = $pdo->prepare($sql);

    $stmt->execute([
        ":name" => $name,
        ":email" => $email,
        ":password" => $password
    ]);

    echo json_encode([
        "status" => "success",
        "message" => "User registered successfully"
    ]);

} catch (PDOException $e) {

    echo json_encode([
        "status" => "error",
        "message" => "Registration failed"
    ]);

}

?>
