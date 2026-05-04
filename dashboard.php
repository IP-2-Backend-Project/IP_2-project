<?php
session_start(); 
require 'config/db.php'; 

if (!isset($_SESSION['user_id'])) {
    header("Location: login.php");
    exit();
}
echo "Welcome, " . htmlspecialchars($_SESSION['username'], ENT_QUOTES, 'UTF-8');
?>
