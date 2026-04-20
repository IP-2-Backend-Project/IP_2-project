<?php
// Configuration 
$host    = "localhost";
$db      = "company_db";
$user    = "root";
$pass    = "";
$charset = "utf8mb4";

// TData Source 
$dsn = "mysql:host=$host;dbname=$db;charset=$charset";

// Connection Options
$options = [
    PDO::ATTR_ERRMODE            => PDO::ERRMODE_EXCEPTION, 
    PDO::ATTR_DEFAULT_FETCH_MODE => PDO::FETCH_ASSOC,       
    PDO::ATTR_EMULATE_PREPARES   => false                 
];
try {
    $pdo = new PDO($dsn, $user, $pass, $options);
} catch (\PDOException $e) {

    header('Content-Type: application/json');
    echo json_encode([
        "status" => "error",
        "message" => "Database connection failed: " . $e->getMessage()
    ]);
    exit;
}
?>