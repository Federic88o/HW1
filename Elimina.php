<?php
session_start();
    
if (!isset($_SESSION['username'])) {
header("Location: login.php");
exit();
}
$id = $_SESSION['username'];


    $img = $_GET["img"];

    $conn= mysqli_connect("localhost", "root", "", "test");
    mysqli_query($conn, "DELETE FROM preferiti where username = '$id' AND img_preferiti= '$img'");
    mysqli_close($conn);


 

?>