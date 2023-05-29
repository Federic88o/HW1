<?php
api_dog();
function api_dog(){
    $valore = $_GET["q"];
  
    $curl=curl_init();
    $url = 'https://dog.ceo/api/breed/'.$valore.'/images/random/10';
    curl_setopt($curl, CURLOPT_URL, $url);
    curl_setopt($curl, CURLOPT_RETURNTRANSFER, 1);
    $result=curl_exec($curl);

    echo $result;
    curl_close($curl);
 
}

?>