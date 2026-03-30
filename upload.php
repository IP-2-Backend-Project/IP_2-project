<?php

session_start();
require "db.php";

/* 1) Check login */

if (!isset($_SESSION["user_id"])) {
    die("Please login first");
}


if (isset($_FILES["file"])) {

    $user_id = $_SESSION["user_id"];

    $file_name = $_FILES["file"]["name"];
    $file_tmp  = $_FILES["file"]["tmp_name"];
    $file_size = $_FILES["file"]["size"];
    $file_type = $_FILES["file"]["type"];

    $new_name = time() . "_" . $file_name;

    $file_path = "uploads/" . $new_name;

    if (move_uploaded_file($file_tmp, $file_path)) {

        $sql = "INSERT INTO uploads
                (user_id, file_name, file_path, file_size, file_type)
                VALUES (?, ?, ?, ?, ?)";

        $stmt = $pdo->prepare($sql);

        $stmt->execute([
            $user_id,
            $file_name,
            $file_path,
            $file_size,
            $file_type
        ]);

        echo "File uploaded successfully";

    } else {

        echo "Upload failed";

    }
}
?>
