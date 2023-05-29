<?php
api_cat();
function api_cat(){
    $api_key= 'live_5uIDZaBbAJIN6sN6Wx7BxBL5ZzwNGxSkcrnAXl38hIOFWVP6mAvuT6JOELpVTYyD';
    $valore = $_GET["q"];

    $query = strtolower(substr($valore, 0, 4));
  
    $curl=curl_init();
    $url = 'https://api.thecatapi.com/v1/images/search?limit=10&breed_ids='.$query. '&api_key=' .$api_key;
    curl_setopt($curl, CURLOPT_URL, $url);
    curl_setopt($curl, CURLOPT_RETURNTRANSFER, 1);
    $result=curl_exec($curl);

    echo $result;
    curl_close($curl);
 
}

?>