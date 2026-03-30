<?php
session_start();
require '../config/db.php'; 

if ($user_is_valid) {

    $_SESSION['user_id'] = $user['id'];  
    $_SESSION['username'] = $username;   

    header("Location: ../dashboard.php"); 
    exit();
} else {
    echo "Invalid login credentials";
}
?>