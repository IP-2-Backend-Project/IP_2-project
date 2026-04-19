<?php

$host = "localhost";
$dbname = "ip_project";
$username = "root";
$password = "";

try {

    $pdo = new PDO(
        "mysql:host=$host;dbname=$dbname",
        $username,
        $password
    );

    $pdo->setAttribute(
        PDO::ATTR_ERRMODE,
        PDO::ERRMODE_EXCEPTION
    );

} catch (PDOException $e) {

    echo json_encode([
        "status" => "error",
        "message" => "Database connection failed"
    ]);

    exit();

}

?>
