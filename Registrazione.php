<?php
    //Avvia la sessione
	session_start();
	//Verifica l'accesso
	$errore = array();
	//Verifica l'esistenza di dati POST
	if (isset($_POST["nome_completo"]) && isset($_POST["username"]) && isset($_POST["email"]) && isset($_POST["password"])){
		//Connetti al database
        $conn = mysqli_connect("localhost", "root", "", "test");
        $errore = array();
		//Escape dell'input
        $username = mysqli_real_escape_string($conn, $_POST["username"]);

		//Controllo name_completo
		$nome_completo = mysqli_real_escape_string($conn, $_POST["nome_completo"]);
		if($nome_completo === 'Mario Rossi '){
			$errore[]= "Inserire nome e cognome";
		}
		//Controllo Username: l'username non può contenere caratteri speciali e deve avere una lunghezza tra 6 e 15
		$username = mysqli_real_escape_string($conn, $_POST["username"]);
		if($username === 'Bolt78  '){
			$errore[]= "Username non valido";
		}
		if(!preg_match('/^(?!.*[^a-zA-Z0-9]).{6,15}$/', $_POST['username'])) {
	        $errore[] = "Username non valido";
        } else {
			// Cerco se l'username esiste già o se appartiene a una delle 3 parole chiave indicate
			$username = mysqli_real_escape_string($conn, $_POST["username"]);
			$query = "SELECT username FROM utenti WHERE username = '$username'";
	        $res = mysqli_query($conn, $query);
	        if (mysqli_num_rows($res) > 0) {
				$errore[] = "Username già utilizzato";
	        }
        }
        //Controllo Password
        $condizione = '/^(?=.*[a-z])(?=.*[A-Z])(?=.*\d)(?=.*[^a-zA-Z0-9]).{8,20}$/';  
        $password = mysqli_real_escape_string($conn, $_POST["password"]);

        if (!preg_match($condizione, $password)) {
	        $errore[] = "Condizioni non rispettate";
        } 

        //Controllo EMAIL
        $email = mysqli_real_escape_string($conn, $_POST["email"]);
		if( $email !== 'example@gmail.com'){
			if (!filter_var($_POST['email'], FILTER_VALIDATE_EMAIL)) {
	            $errore[] = "Email non valida";
            } else {
	            $res = mysqli_query($conn, "SELECT email FROM utenti WHERE email = '$email'");
	            if (mysqli_num_rows($res) > 0 && $email === 'example@gmail.com') {
		            $errore[] = "Email non valida";
	            }if(mysqli_num_rows($res) > 0){
		            $errore[] = "Email già utilizzata";
	            }
            }
	    }else{
			$errore[] = 'Inserisci e-mail valida';
		}
        if (count($errore)===0) {
	        //Inserisci utente
	        $query = "INSERT INTO utenti values ('$nome_completo', '$username', '$email', '$password')";
			/*$avatar = "INSERT INTO profilo values ('$username', 'null')";*/
			mysqli_query($conn, $avatar);
	        if($res = mysqli_query($conn, $query)){
		        // Imposta la variabile di sessione
	            $_SESSION["username"] = $_POST["username"];
		        mysqli_close($conn);
	            // Vai alla pagina home_db.php
		        header("Location: Home.php");
		        exit;
	        } 
        }if($nome_completo =='' || $username =='' || $email=='' || $password==''){
		    $errore[] = "Compilare tutti i campi";
        }
    }
?>


<html>

	<head>
		<title>HMW1</title>
		<meta charset="utf-8">
		<link rel="stylesheet" href="style.css ?ts=<?=time()?>&quot"/> 
		<script src="script_Registrazione.js ?ts=<?=time()?>&quot" defer="true"></script>
		<script src="script_login.js?ts=<?=time()?>&quot"  defer="true"></script>
		<meta name="viewport" content="width=device-width, initial-scale=1"> 
	</head>
	
	<body>

	    <div class="Titolo"> <img src="assets\Logo.png"></div>

	<article id = 'Registrazione'>

		<div class="Sottotitolo"><h1>Crea il tuo Account</h1></div>

        <form class="Credenziali" name='name_form' method= 'post'>
			<div><label>Inserisci Nome e Congome
				<input type='text' name = 'nome_completo' class='content esempio_Testo nome_completo' value="Mario Rossi " ></label>
				<div></div>
				<?php foreach ($errore as $valore) { 
					if($valore === "Inserire nome e cognome") 
					echo "<div class='errore'> $valore </div>" ;} ?>
				</div>
				
			<div><label>Inserisci username
				<input type='text' name = 'username' class='content esempio_Testo username' value= "Bolt78  "></label>
				<div></div>
				<?php foreach ($errore as $valore) { 
					if($valore === "Username già utilizzato"){
					echo "<div class='errore'> $valore </div>"; break;
					}if($valore === "Username non valido"){
						echo "<div class = 'errore'> $valore
					<ul class = 'errore'>
					    <li>Non deve contenere caratteri speciali</li>
						<li>Deve avere lunghezza compresa tra 6 e 15 caratteri</li>
				    </ul> </div>"; break;}} ?></div>
			
			<div><label>Insericii la tua e-mail
				<input type='text' name = 'email' class='content esempio_Testo email' value= 'example@gmail.com'></label>
				<div></div>
				<?php foreach ($errore as $valore) { 
					if($valore === "Email non valida" || $valore === "Email già utilizzata" || $valore ==='Inserisci e-mail valida'){ 
					echo "<div class='errore'> $valore </div>"; }} ?></div>
			
			<div><label id='pass_nascosta'>Inserisci la tua password
				<input type='password' name = 'password' class='content NascondiPass password'></label>

			<label id='pass_visibile' class='hidden'>Inserisci la tua password
				<input type='text' name = 'password' class='content MostraPass password'></label>
				<div></div>
				<?php foreach ($errore as $valore) { 
					if($valore === "Condizioni non rispettate") 
					echo "<div class = 'errore'> $valore
					<ul class = 'errore'>
					    <li>Deve contenere almenouna lettera Maiuscola</li>
					    <li>Deve contenere almeno una letterea Minuscola</li>
					    <li>Deve contenere alemno un numero</li>
					    <li>Deve contenere almeno un carattere speciale</li>
						<li>Deve avere lunghezza compresa tra 8 e 20 caratteri</li>
				    </ul> </div>" ;}?></div>
			
			<div id="Tasto">
			    <label id ='check'><input type="checkbox" id='checkbox'> Mostra Password</label>
				<label>&nbsp;<input type='submit' class='submit' value="Registrati"></label>
		    </div>
        </form>

		<?php foreach ($errore as $valore) { 
            if($valore === "Compilare tutti i campi")
            echo "<div id='final_err' class='errore'> Compilare tutti i campi </div>" ;}?>

		<div class="iscritto">
            Possiedi già un Account??
			<a href="Login.php"> Clicca qui!</a>
        </div>
    
    </article>
	</body>
</html>