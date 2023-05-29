<?php 


    $conn = mysqli_connect("localhost", "root", "", "test");

    $username = mysqli_real_escape_string($conn, $_GET["q"]);
    $errore = array();

    $query = "SELECT username FROM utenti WHERE username = '$username'";
    $res = mysqli_query($conn, $query);
    if (mysqli_num_rows($res) > 0) {
        $errore[] = "Username già utilizzato";
    }

    mysqli_free_result($res);
    mysqli_close($conn);

    echo json_encode($errore);
?>