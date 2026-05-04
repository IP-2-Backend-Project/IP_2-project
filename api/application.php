<?php
require_once '../config/db.php';
require_once 'cors.php';

if (!isset($_SESSION['user_id'])) {
    http_response_code(401);
    echo json_encode(['error' => 'Not authenticated']);
    exit;
}

$stmt = $pdo->prepare(
    "SELECT a.*, u.name as applicant_name
     FROM applications a
     JOIN users u ON a.user_id = u.id
     WHERE a.user_id = ?
     ORDER BY a.created_at DESC"
);
$stmt->execute([$_SESSION['user_id']]);
echo json_encode($stmt->fetchAll(PDO::
