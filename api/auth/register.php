<?php
require '../../config/db.php';

header("Content-Type: application/json");

$data = json_decode(file_get_contents("php://input"), true);
if (!$data) {
    echo json_encode([
        "status" => "error",
        "message" => "No input data received"
    ]);
    exit();
}

$fullname = trim($data['fullname']);
$email = trim($data['email']);
$password = $data['password'];
$phone = trim($data['phone']);

if (empty($fullname) || empty($email) || empty($password) || empty($phone)) {
    echo json_encode(["message" => "All fields are required"]);
    exit();
}

if (!filter_var($email, FILTER_VALIDATE_EMAIL)) {
    echo json_encode(["message" => "Invalid email"]);
    exit();
}

if (strlen($password) < 6) {
    echo json_encode(["message" => "Password must be at least 6 characters"]);
    exit();
}

$stmt = $pdo->prepare("SELECT id FROM users WHERE email = ?");
$stmt->execute([$email]);

if ($stmt->fetch()) {
    echo json_encode(["message" => "Email already exists"]);
    exit();
}

$hashedPassword = password_hash($password, PASSWORD_DEFAULT);

$stmt = $pdo->prepare("INSERT INTO users (fullname, email, password, phone, role) VALUES (?, ?, ?, ?, ?)");
$stmt->execute([$fullname, $email, $hashedPassword, $phone, "applicant"]);

echo json_encode([
    "status" => "success",
    "message" => "Registration successful"
]);  ?>
