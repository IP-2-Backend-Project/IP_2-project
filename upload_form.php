<?php
session_start();

if (!isset($_SESSION['user_id'])) {
    die("Please login first to upload files");
}
?>

<form action="upload.php" method="POST" enctype="multipart/form-data">

    <label>Select file:</label>
    <input type="file" name="file" required>

    <button type="submit">
        Upload
    </button>

</form>
