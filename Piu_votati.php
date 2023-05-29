<?php

$conn= mysqli_connect("localhost", "root", "", "test");
$dati = array();

$query ="SELECT img_preferiti as img, tipo as tipo, razza as specie, ROUND(AVG(voto),2) as voto FROM preferiti GROUP BY img_preferiti order by voto desc";
/*voto rappresenta la media dei voti per ogni animale in ordine descescente */
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
