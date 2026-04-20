<?php
session_start();
require_once '../config/db.php';

if ($_SERVER["REQUEST_METHOD"] == "POST") {

    if (isset($_FILES["file"])) {

        $file = $_FILES["file"];

        $fileName = $file["name"];
        $fileTmpName = $file["tmp_name"];
        $fileSize = $file["size"];
        $fileError = $file["error"];

        $uploadDir = "../uploads/";
        $filePath = $uploadDir . basename($fileName);

        if (move_uploaded_file($fileTmpName, $filePath)) {

            $sql = "INSERT INTO uploads (file_path) VALUES (?)";

            $stmt = $pdo->prepare($sql);
            $stmt->execute([$filePath]);

            echo "File uploaded successfully";

        } else {
            echo "File upload failed";
        }

    }

}
?>
