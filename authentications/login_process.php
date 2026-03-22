<?php

session_start();

if ($user_is_valid) {
    $_SESSION['username'] = $username; 
    header("Location: dashboard.php");
    exit();
}
?>