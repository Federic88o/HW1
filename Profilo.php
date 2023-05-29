<?php
    session_start();
    
    if (!isset($_SESSION['username'])) {
    header("Location: login.php");
    exit();
}
?>

<html>
    <head>
		<title>HMW1</title>
		<meta charset="utf-8">
		<link rel="stylesheet" href="Profilo.css?ts=<?=time()?>&quot"/>
		<script src="script_profilo.js?ts=<?=time()?>&quot"  defer="true"></script>
		<meta name="viewport" content="width=device-width, initial-scale=1"> 
    </head>
    <body> 
        <nav>
            <div class="container_profilo"> 
                <div class='nav_iniziale'>
                    <div id="container_img"> <img id="Profilo"src='assets/Profilo.jpg'>
                    <a class ='Tasto'> Cambia Immagine </a></div> 
                    <div id="Info_profilo"> <img id='img_logo'src="assets\Logo.png"> </div>
                </div>
                <div class='opzioni'>
                    <a id='Esci' href="Logout.php"> Esci</a>
                    <a href="Home.php"><img src='assets/Home.png'></a>
                </div>
            </div>
        </nav>
        <article><div class='container_preferiti'>
            <span class='categoria'>I tuoi preferiti</span>
            <span class='categoria'>Cani</span>
            <span class='categoria'>Gatti</span>
            <span class='categoria'>I più votati</span>
        </div>
        </article>
        <article id="view">	
		</article>

        <footer>
    <em>Web Programming 2023</em></br>
      Federico Finocchiaro </br>
      <em>1000015266<em>
    </footer>  
    </body>

</html>