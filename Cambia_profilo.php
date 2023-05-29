<?php
  session_start();
    
  if (!isset($_SESSION['username'])) {
  header("Location: login.php");
  exit();
}
$id = $_SESSION['username'];

$img = $_GET["img"];

$conn= mysqli_connect("localhost", "root", "", "test");

if($voto<=10 && $voto>=0){
    $query = "UPDATE profilo SET img_profilo = '$img' WHERE username = '$id'";
    mysqli_query($conn, $query);
}
mysqli_close($conn); 

?>