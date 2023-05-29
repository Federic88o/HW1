<?php
api_altri_dog();
function api_altri_dog(){
    
    $curl=curl_init();
    $url = 'https://dog.ceo/api/breeds/list/all';
    curl_setopt($curl, CURLOPT_URL, $url);
    curl_setopt($curl, CURLOPT_RETURNTRANSFER, 1);
    $result=curl_exec($curl);

    echo $result;
    curl_close($curl);
 
}

 
?>