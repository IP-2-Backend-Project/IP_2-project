<?php

require 'config.php'; 
// Now just check the variable
if (!isset($_SESSION['user_id'])) { // Use user_id or username based on your login logic
    header("Location: login.php");
    exit();
}

echo "Welcome, " . $_SESSION['username'];
?>