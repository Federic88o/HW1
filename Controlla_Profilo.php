<?php
  session_start();
    
  if (!isset($_SESSION['username'])) {
  header("Location: login.php");
  exit();
}
$id = $_SESSION['username'];
$img = $_GET['img'];

$conn= mysqli_connect("localhost", "root", "", "test");

$conn= mysqli_connect("localhost", "root", "", "test");
$val=0;
$query = "SELECT img_profilo FROM profilo WHERE username = '$id'"; 
$res = mysqli_query($conn, $query);
if(mysqli_num_rows($res) > 0 ){
    $row = mysqli_fetch_assoc($res);
    echo $row['img_profilo'];
}else{
    $query2 = "INSERT INTO profilo values (\"$id\",\"$img\")"; 
    $insert = mysqli_query($conn, $query2);
    $row = mysqli_fetch_assoc($insert);
    echo $row['img_profilo'];
}

mysqli_free_result($res);
mysqli_close($conn);
?>