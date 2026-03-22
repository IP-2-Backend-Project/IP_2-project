<?php
if ($_SERVER["REQUEST_METHOD"] == "POST") {
    $username = $_POST['username'];
    $password = $_POST['password'];
    
    $hashed_password = password_hash($password, PASSWORD_DEFAULT);
}
?>