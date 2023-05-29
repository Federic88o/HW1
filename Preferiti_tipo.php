<?php
  session_start();
    
  if (!isset($_SESSION['username'])) {
  header("Location: login.php");
  exit();
}
$utente = $_SESSION['username'];
$tipo = $_GET['q'];

$conn= mysqli_connect("localhost", "root", "", "test");
$dati = array();

$query ="SELECT img_preferiti as img, razza as specie, voto as voto FROM preferiti WHERE username = '$utente' AND tipo= '$tipo'";
$res= mysqli_query($conn, $query);
if(mysqli_num_rows($res) > 0 ){
    while ($row = mysqli_fetch_assoc($res)) {
        $dati[] = $row;
    }
}


mysqli_free_result($res);
mysqli_close($conn);

echo json_encode($dati);

?>