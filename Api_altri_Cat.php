<?php
api_altri_cat();
function api_altri_cat(){
    $api_key= 'live_5uIDZaBbAJIN6sN6Wx7BxBL5ZzwNGxSkcrnAXl38hIOFWVP6mAvuT6JOELpVTYyD';
    
    $curl=curl_init();
    $url = 'https://api.thecatapi.com/v1/breeds';
    curl_setopt($curl, CURLOPT_URL, $url);
    curl_setopt($curl, CURLOPT_RETURNTRANSFER, 1);
    $result=curl_exec($curl);

    echo $result;
    curl_close($curl);
 
}

?>