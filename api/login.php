<?php
require_once '../config/db.php'; // your existing PDO connection
require_once 'cors.php';

$data = json_decode(file_get_contents('php://input'), true);
$email = $data['email'] ?? '';
$password = $data['password'] ?? '';

$stmt = $pdo->prepare("SELECT * FROM users WHERE email = ?");
$stmt->execute([$email]);
$user = $stmt->fetch();

if ($user && password_verify($password, $user['password'])) {
    $_SESSION['user_id'] = $user['id'];
    $_SESSION['role']    = $user['role'];
    echo json_encode(['success' => true, 'role' => $user['role']]);
} else {
    http_response_code(401);
    echo json_encode(['error' => 'Invalid email or password']);
}
