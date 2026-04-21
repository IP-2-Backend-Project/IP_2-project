<?php
session_start();
require_once '../config/db.php';

if (!isset($_SESSION["user_id"])) {
    echo "User not logged in";
    exit();
}

if ($_SERVER["REQUEST_METHOD"] == "POST") {

    if (isset($_FILES["file"])) {

        $file = $_FILES["file"];

        $fileName = $file["name"];
        $fileTmpName = $file["tmp_name"];
        $fileSize = $file["size"];
        $fileError = $file["error"];

        $uploadDir = "../uploads/";
        
        $allowedTypes = ["pdf", "doc", "docx", "jpg", "png"];

        $fileExt = strtolower(pathinfo($fileName, PATHINFO_EXTENSION));

        if (!in_array($fileExt, $allowedTypes)) {
            echo "Invalid file type!";
            exit();
        }

        $maxSize = 2 * 1024 * 1024; // 2MB

        if ($fileSize > $maxSize) {
            echo "File is too large!";
            exit();
        }

        // check if there is error while uploading
        if ($fileError !== 0) {
            echo "Error uploading file!";
            exit();
        }

        $fileType = mime_content_type($fileTmpName);

        $allowedMime = [
            "application/pdf",
            "image/jpeg",
            "image/png",
            "application/msword",
            "application/vnd.openxmlformats-officedocument.wordprocessingml.document"
        ];

        if (!in_array($fileType, $allowedMime)) {
            echo "Invalid file content!";
            exit();
        }

        $newFileName = uniqid("", true) . "." . $fileExt;

        $filePath = $uploadDir . $newFileName;

        if (move_uploaded_file($fileTmpName, $filePath)) {

            // save the file path to the database
            $sql = "INSERT INTO uploads (file_path) VALUES (?)";

            $stmt = $pdo->prepare($sql);
            $stmt->execute([$filePath]);

            echo json_encode([
    "status" => "success",
    "message" => "File uploaded successfully"
]);
        } else {
            echo "File upload failed";
        }

    }

}
?>
