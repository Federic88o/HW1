<?php
    // Avvia la sessione
    session_start();
    // Verifica l'accesso
    if(isset($_SESSION["username"])){
        header("Location: Home.php");
    }
    $errore = array();
    // Verifica l'esistenza di dati POST
    if(isset($_POST["username"]) && isset($_POST["password"])){

        // Connetti al database
        $conn = mysqli_connect("localhost", "root", "", "test");
        $errore = array();

        // Escape dell'input
        $username = mysqli_real_escape_string($conn, $_POST["username"]);
        $password = mysqli_real_escape_string($conn, $_POST["password"]);

        // Cerca utenti con quelle credenziali
        $query = "SELECT * FROM utenti where username = '".$username."'";
        $res_utente_esiste = mysqli_query($conn, $query);
        $password = mysqli_real_escape_string($conn, $_POST["password"]);

        // Verifica la correttezza delle credenziali
        if(mysqli_num_rows($res_utente_esiste) > 0){
            $query_verifica_password = "SELECT * FROM utenti where username = '".$username."' AND password = '".$password."'";
            $res = mysqli_query($conn, $query_verifica_password);
            if(mysqli_num_rows($res) > 0){
                // Imposta la variabile di sessione
                $_SESSION["username"] = $_POST["username"]; 
                // Vai alla pagina home_db.php
                header("Location: Home.php");
                exit;
            }if(($password === '')){
                $errore[] = "Compilare tutti i campi";
            }else{
                $errore[] = "Username non esiste";
                $errore[] = 'Password errata';   
            }
        }else{ if(($password === '')){
            $errore[] = "Compilare tutti i campi";
        }$errore[] = "Username non esiste";
        $errore[] = 'Password errata'; 
        }
    }
?>
<html>

	<head>
		<title>HMW1</title>
		<meta charset="utf-8">
		<link rel="stylesheet" href="style.css?ts=<?=time()?>&quot"/> 
		<script src="script_login.js?ts=<?=time()?>&quot"  defer="true"></script>
		<meta name="viewport" content="width=device-width, initial-scale=1"> 
	</head>
	
	<body>
        <div class="Titolo"><img src="assets\Logo.png"></div>
        
        <article id = 'login'>
            <div class="Sottotitolo" ><h1>ACCEDI</h1></div>
            <form class="Credenziali" name='name_form' method= 'post'>
                <div><label>Inserisci username
                    <input type='text' name = 'username' class='content' ></label>
                    <?php foreach ($errore as $valore) { 
                        if($valore === "Username non esiste")
                        echo "<div class='errore'> $valore </div>" ;} ?></div>             
                
                <div><label id='pass_nascosta'>Inserisci la tua password
                        <input type='password' name = 'password' class='content NascondiPass'></label>
                    <label id='pass_visibile' class='hidden'>Inserisci la tua password
				        <input type='text' name = 'password' class='content MostraPass'></label> 
                    <?php foreach ($errore as $valore) { 
                        if($valore === "Password errata")
                        echo "<div class='errore'> $valore </div>" ;} ?></div>
                
                <div id="Tasto">
                <label id ='check'><input type="checkbox" id='checkbox'> Mostra Password</label>
                <label>&nbsp;<input type='submit' class='submit' value='Accedi'></label>
                </div>
            </form>
            <?php foreach ($errore as $valore) { 
                if($valore === "Compilare tutti i campi")
                echo "<div id='final_err' class='errore'> $valore </div>" ;} ?>
                
            <div class="Nuovo_iscritto">
                Sei nuovo??</br>
                <a href="Registrazione.php">Crea subito il tuo Account</a>
            </div>
        </article>
	</body>
</html>