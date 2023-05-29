<?php
  session_start();
    
  if (!isset($_SESSION['username'])) {
  header("Location: login.php");
  exit();
}
$utente = $_SESSION['username'];

$conn= mysqli_connect("localhost", "root", "", "test");
$dati = array();

$query = "SELECT nome_completo AS nome, username AS username, email AS email FROM utenti WHERE username = '$utente'";
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