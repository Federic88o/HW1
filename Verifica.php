<?php

session_start();

if (!isset($_SESSION['username'])) {
    header("Location: login.php");
    exit();
}
$utente = $_SESSION['username'];
$img = $_POST["img"];
$conn= mysqli_connect("localhost", "root", "", "test");
$errore=0;
$query = "SELECT voto FROM preferiti WHERE username = '$utente' AND img_preferiti= '$img'"; 
$res = mysqli_query($conn, $query);
if(mysqli_num_rows($res) > 0 ){
    $row = mysqli_fetch_assoc($res);
    echo $row['voto'];

}else{
        echo $errore;
}


    mysqli_free_result($res);
    mysqli_close($conn);


?>