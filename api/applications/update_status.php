<?php
session_start();

// check if the user is logged in
if (!isset($_SESSION["user_id"])) {
    echo "User not logged in";
    exit();
}

if ($_SESSION["role"] != "Recruiter") {

    echo "Access denied!";
    exit();
}


?>


