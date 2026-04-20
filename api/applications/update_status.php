session_start();

if ($_SESSION["role"] != "Recruiter") {

    echo "Access denied!";
    exit();

}
