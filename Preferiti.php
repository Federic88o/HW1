<?php
  session_start();
    
  if (!isset($_SESSION['username'])) {
  header("Location: login.php");
  exit();
}
$utente = $_SESSION['username'];

$conn= mysqli_connect("localhost", "root", "", "test");
$dati = array();

$query ="SELECT img_preferiti as img, tipo as tipo, razza as specie, voto as voto FROM preferiti WHERE username = '$utente' order by razza desc";
$res= mysqli_query($conn, $query);
if(mysqli_num_rows($res) > 0 ){
    while ($row = mysqli_fetch_assoc($res)) {
        $dati[] = $row;
        /*$eventi[]=array('img' => $row['img'], 'tipo'=> $row['tipo'], 'razza'=>['razza'])*/
    }
}


mysqli_free_result($res);
mysqli_close($conn);

echo json_encode($dati);

?>