<?php
  session_start();
    
  if (!isset($_SESSION['username'])) {
  header("Location: login.php");
  exit();
}
$id = $_SESSION['username'];

$img = $_GET["img"];
$tipo = $_GET["tipo"];
$razza = $_GET["razza"];
$input = $_GET["voto"];
$conn= mysqli_connect("localhost", "root", "", "test");

if($input<=10 && $input>=0){
    mysqli_query($conn, "INSERT INTO preferiti values (\"$id\",\"$img\", \"$tipo\", \"$razza\", \"$input\")");

}
mysqli_close($conn); 

?>