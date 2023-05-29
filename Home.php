<?php

    // Avvia la sessione
    session_start();
    // Verifica se l'utente è loggato
    if(!isset($_SESSION['username']))
    {
        // Vai alla login
        header("Location: Login.php");
        exit;
    }

?>

<html>
    <head>
		<title>HMW1</title>
		<meta charset="utf-8">
		<link rel="stylesheet" href="style_home.css?ts=<?=time()?>&quot"/>
		<script src="script_home.js?ts=<?=time()?>&quot"  defer="true"></script>
		<meta name="viewport" content="width=device-width, initial-scale=1"> 
    </head>
    <body>

    <nav>
        <div id='Logo'><img id='img_logo'src="assets\Logo.png"></div>
        <div id='container'>
            <div class='button visita'> Ciao, <?php echo $_SESSION["username"]?></br>
          <a class ='size' href="Profilo.php">Visita il tuo profile</a></div>
          <a class='button  scelta_rapida'>Cane</a>
          <a class='button  scelta_rapida'>Gatto</a>
          <a class='button' href='Logout.php'>LOGOUT</a>

          <div id="menu_apri">
            <div></div>
            <div></div>
            <div></div>
          </div>
          <div id='Menu_Laterale' class='hidden'> 
            <div class="container_menu">
                <div class="container_profilo"> 
                    <div id="Profilo"><img src='assets/Profilo.jpg'></div> 
                    <div id="Info_sotto_profilo"> <a href='Profilo.php'>Ciao, <?php echo $_SESSION["username"]?></div></a>
                </div>
                <div id="menu_chiudi">
                    <div></div>
                    <div></div>
                    <div></div>
                </div>
            </div>

            <div class='section'> 
              <ul> 
                <li class = 'elenco Home_iniziale'>Home</li>  
                <li class = 'elenco scelta_rapida'>Cane</li>
                <li class = 'elenco  scelta_rapida'>Gatto</li>
                <li class = 'elenco'> <a href="Logout.php">Logout</a></li>
              <ul>
            </div>

          </div>
        </div>
      </nav>

      <div id ='Titolo'><h1>CERCA E SALVA I TUOI ANIMALI PREFERITI </h1></div>
 
      <form name ='search_content' id='search_content'>
			<label>Inserisci la parola chiave Dog o Cat: <input type='text' name = 'content' id ='content'></label>
      <span class='Sugg hidden'>Seleziona la razza:</span>
      <select name = 'tipo_dog' id='tipo_dog' class='hidden Dog'>
        <option>affenpinscher</option>
        <option>boxer</option>
        <option>chihuahua</option>
        <option>chow</option>
        <option>collie</option>
        <option>husky</option>
        <option>labrador</option>
        <option>malamute</option>
        <option>pitbull</option>
        <option>waterdog</option>
        <option>whippet</option>
        <option>Vedi tuttte le razze di cani</option>
			</select>
      <select name = 'tipo_cat' id='tipo_cat' class='hidden Cat'>
        <option>Abyssinian</option>
        <option>Javanese</option>
        <option>Ragdoll</option>
        <option>Balinese</option>
        <option>Birman</option>
        <option>Bombay</option>
        <option>Donskoy</option>
        <option>Chartreux</option>
        <option>Cheetoh</option>
        <option>Cymric</option>
        <option>Cyprus</option>
        <option>Vedi tutte le razze di gatti</option>
			</select>	
			<label>&nbsp;<input name="submit" type='submit' id='submit'value="Cerca"></label> </br>
      <span class='Sugg size'> (Suggerimento:Va bene sia in italiano sia in inglese)</span>
		</form>
    <div class='Altre_razze'></div>
    <article id="view">	
    <img class='sfondo_home'src="assets\sfondo_home.png">
		</article>
      
    <footer>
    <em>Web Programming 2023</em></br>
      Federico Finocchiaro </br>
      <em>1000015266<em>
    </footer>   
    </body>
</html>