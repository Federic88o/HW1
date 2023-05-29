<?php
  session_start();
    
  if (!isset($_SESSION['username'])) {
  header("Location: login.php");
  exit();
}
$id = $_SESSION['username'];

$img = $_GET["img"];
$voto = $_GET["voto"];

$conn= mysqli_connect("localhost", "root", "", "test");

if($voto<=10 && $voto>=0){
    $query = "UPDATE preferiti SET voto = '$voto' WHERE username = '$id' and img_preferiti= '$img'";
    mysqli_query($conn, $query);

}
mysqli_close($conn); 

?>