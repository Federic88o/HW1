const razza_dog= new Array(
  "affenpinscher","african","airedale","akita","appenzeller","australian","basenji","beagle","bluetick","borzoi","bouvier","boxer","brabancon","briard","buhund",
  "bulldog","bullterrier","cattledog","chihuahua","chow","clumber","cockapoo","collie","coonhound","corgi","cotondetulear","dachshund","dalmatian",
  "dane","deerhound","dhole","dingo","doberman","elkhound","entlebucher","eskimo","finnish","frise","germanshepherd","greyhound","groenendael",
  "havanese","hound","husky","keeshond","kelpie","komondor","kuvasz","labradoodle","labrador","leonberg","lhasa","malamute","malinois","maltese",
  "mastiff","mexicanhairless","mix","mountain","newfoundland","otterhound","ovcharka","papillon","pekinese","pembroke","pinscher","pitbull","pointer",
  "pomeranian","poodle","pug","puggle","pyrenees","redbone","retriever","ridgeback","rottweiler","saluki","samoyed","schipperke","schnauzer",
  "segugio","setter","sharpei","sheepdog","shiba","shihtzu","spaniel","spitz","springer","stbernard","terrier","tervuren","vizsla",
  "waterdog","weimaraner","whippet","wolfhound");
  function Riavvio(){
    const sezione = document.querySelector('#view');
    sezione.innerHTML = '';
    const img = document.createElement('img');
    img.src = 'assets/sfondo_home.png';
    img.classList.add('sfondo_home');
    sezione.appendChild(img);
  }
  const home = document.querySelector('.Home_iniziale');
  home.addEventListener('click', Riavvio);
function Apri_Menu(event){
  event.currentTarget.classList.add('hidden');
    const menu = document.getElementById('Menu_Laterale');
    menu.classList.remove('hidden');
    const saluto = document.querySelector('.visita');
    saluto.classList.add('hidden');
    const nav = document.querySelectorAll('.button');
    for(let box of nav){
      box.classList.add('hidden');
    }

}

function Chiudi_Menu(){
  document.querySelector('#menu_apri').classList.remove('hidden');
    const menu = document.getElementById('Menu_Laterale');
    menu.classList.add('hidden');
    const logout = document.querySelector('.button');
    logout.classList.remove('hidden');

    const saluto = document.querySelector('.visita');
    saluto.classList.remove('hidden');
    const nav = document.querySelectorAll('.button');
    for(let box of nav){
      box.classList.remove('hidden');
    }

}

const button1 = document.getElementById("menu_apri");
button1.addEventListener('click', Apri_Menu);
const button2 = document.getElementById("menu_chiudi");
button2.addEventListener('click', Chiudi_Menu);

//Scelta Cane-Gatto in input
function Animali(event){
  const input = event.currentTarget;
  const select_dog = document.querySelector('.Dog');
  const select_cat = document.querySelector('.Cat');
  const sugg = document.querySelector(".Sugg");
  if(input.value =='Dog' || input.value == 'Cane' || input.value == 'dog' || input.value == 'cane' || input.value =='DOG' || input.value == 'CANE'){
    sugg.classList.remove('hidden');
    select_dog.classList.remove('hidden');
    select_cat.classList.add('hidden');
  }else{
    sugg.classList.add('hidden');
    select_cat.classList.add('hidden');
    select_dog.classList.add('hidden');
  }if(input.value == 'Cat' || input.value =='Gatto' || input.value == 'cat' || input.value=='gatto'|| input.value =='GATTO' || input.value == 'CAT' ){
    sugg.classList.remove('hidden');
    select_cat.classList.remove('hidden');
    select_dog.classList.add('hidden');
  }

}
const animali = document.querySelector('#content');
animali.addEventListener('input', Animali);
animali.addEventListener('click', Chiudi_Menu);

function Scelta_Rapida(event){
  event.preventDefault();
  const valore = event.target.textContent;
  const input = document.querySelector('#content');
  const sezione = document.querySelector('#view');

  const sugg = document.querySelector(".Sugg");
  const select_dog = document.querySelector('.Dog');
  const select_cat = document.querySelector('.Cat');

  if(valore=='Cane' || valore=='Gatto'){
    input.value=valore;
    if(valore=='Cane'){
      select_cat.classList.add('hidden');
      select_dog.classList.remove('hidden');
      sugg.classList.remove('hidden');
    }if(valore=='Gatto'){
      select_dog.classList.add('hidden');
      select_cat.classList.remove('hidden');
      sugg.classList.remove('hidden');
    }
  }else{
    input.value='';
    select_dog.classList.add('hidden');
    select_cat.classList.add('hidden');
    sugg.classList.add('hidden');
  }
  
  Chiudi_Menu()
}
const li = document.querySelectorAll('.scelta_rapida');
for(let box of li){
  box.addEventListener('click', Scelta_Rapida);}



function onJson_Cat(json) {
  console.log('JSON ricevuto');
  console.log(json);
  const sezione = document.querySelector('#view');
  sezione.innerHTML = '';
  sezione.classList.remove('space-around');
  let cont=0;

  for(let result of json){
    let controllo_gif = result.url.endsWith(".gif");
    if (!controllo_gif){
      razza = result.breeds[0].name
      const container = document.createElement('div');
      const img = document.createElement('img');
      const container_preferiti=document.createElement('div');
      container_preferiti.classList.add('preferiti');
      const img_preferiti =document.createElement('img');
      const voto = document.createElement('div'); 

      eseguiVerifica(result.url, img_preferiti,voto, container_preferiti); 

      img_preferiti.classList.add('check');
      img.src = result.url;
      container.classList.add('container_img');
      container.appendChild(img);
      container_preferiti.appendChild(img_preferiti);
      container.appendChild(container_preferiti);
      sezione.appendChild(container);
      cont++;
    }else{
      console.log('GIF');
    }
    if(cont>=10){
      break;
    }
  }
  Salva(razza);
}
function onJson_Dog(json) {
  console.log('JSON ricevuto');
  console.log(json);
  const sezione = document.querySelector('#view');
  sezione.innerHTML = '';
  sezione.classList.remove('space-around');
  let razza='';

  for(let result of json.message){
     razza = result;
      const container = document.createElement('div');
      const img = document.createElement('img');
      const container_preferiti=document.createElement('div');
      container_preferiti.classList.add('preferiti');
      const img_preferiti =document.createElement('img');
      const voto = document.createElement('div'); 
      
      eseguiVerifica(result, img_preferiti,voto, container_preferiti);

      img_preferiti.src ='assets/unlike.png';
      img.src = result;
      img_preferiti.classList.add('check');
      container.classList.add('container_img');
      container.appendChild(img);
      container_preferiti.appendChild(img_preferiti);

      container.appendChild(container_preferiti);
      sezione.appendChild(container);
  }
    Salva(razza);
}
  /* Serve per sapere se l'animlae è presente nel database */
  async function eseguiVerifica(result,img,votazione, container) {
    let formData = new FormData();
    formData.append('img', result);
    let opzioni = {
      method: 'POST',
      body: formData};
    let val = await fetch("Verifica.php", opzioni).then(response => response.text()).then(data => {return data});
    console.log(val);
    if(val>0 && val<=10){
      console.log(val);
      votazione.textContent= 'Voto:'+val;
      votazione.classList.add('val'); 
      img.src = 'assets/like.png'
      container.appendChild(votazione);
      container.classList.add('space-between');

    }else{img.src = 'assets/unlike.png';}
  }
function onJson_Dog_razze(json) {
  console.log('JSON ricevuto');
  console.log(json);
  const sezione = document.querySelector('#view');
  sezione.innerHTML = '';

  const Titolo = document.createElement('div');
  Titolo.textContent = 'CLICCA SU UNA RAZZA';
  Titolo.classList.add('sposta');
  const lista_razze_1 = document.createElement("ul");
  const lista_razze_2 = document.createElement("ul");
  const lista_razze_3 = document.createElement("ul");
  let cont =0 ;
  lista_razze_1.appendChild(Titolo);

  for(let result in json.message){
    const li = document.createElement("li");
    cont++;
    if(cont<=32){
      CreaElencoDog(li,result, lista_razze_1, sezione)

    }if(cont>32 && cont<=64){
      CreaElencoDog(li,result, lista_razze_2, sezione);
      } if(cont>64){
        CreaElencoDog(li,result, lista_razze_3, sezione);
      }
  }
}
function CreaElencoDog(li,result, lista_razze, sezione){
  li.textContent = result;
  lista_razze.classList.add('lista_razze');
  lista_razze.appendChild(li);
  sezione.appendChild(lista_razze);
  sezione.classList.add('space-around');

  function Ricerca(){
    fetch("Api_Dog.php?q="+ result).then(onResponse).then(onJson_Dog);
  }
  li.addEventListener('click', Ricerca);
}

function onJson_Cat_razze(json) {
  console.log('JSON ricevuto');
  console.log(json);
  const sezione = document.querySelector('#view');
  sezione.innerHTML = '';

  const Titolo = document.createElement('div');
  Titolo.textContent = 'CLICCA SU UNA RAZZA';
  Titolo.classList.add('sposta');
  const lista_razze_1 = document.createElement("ul");
  const lista_razze_2 = document.createElement("ul");
  const lista_razze_3 = document.createElement("ul");
  let cont =0 ;
  lista_razze_1.appendChild(Titolo);

  for(let result of json){
    const li = document.createElement("li");
    cont++;
    if(cont<22){
      
      CreaElencoCat(li, result, lista_razze_1,sezione);

    }if(cont>22 && cont<44){
      
      CreaElencoCat(li, result, lista_razze_2,sezione);
      } if(cont>44){

        CreaElencoCat(li, result, lista_razze_3,sezione);
      }
  }
}
function CreaElencoCat(li, result,lista_razze, sezione){
      li.textContent = result.name;
      lista_razze.appendChild(li);
      lista_razze.classList.add('lista_razze');
      sezione.appendChild(lista_razze);
      sezione.classList.add('space-around');

      function Ricerca(){
        fetch("Api_Cat.php?q="+ result.id).then(onResponse).then(onJson_Cat);
      }
      li.addEventListener('click', Ricerca);

}
function onResponse(response) {
  console.log('Risposta ricevuta');
  return response.json();
}

function search(event){
  event.preventDefault();
  const input = document.querySelector('#content');
  const tipo_dog = document.querySelector('#tipo_dog').value;
  const tipo_cat = document.querySelector('#tipo_cat').value;

  if(input.value =='Dog' || input.value == 'Cane' || input.value == 'dog' || input.value == 'cane' || input.value =='DOG' || input.value == 'CANE'){
    if(tipo_dog == 'Vedi tuttte le razze di cani'){
      fetch("Api_altri_Dog.php?").then(onResponse).then(onJson_Dog_razze);
    }else{
      fetch("Api_Dog.php?q="+ tipo_dog).then(onResponse).then(onJson_Dog);
    }
  }
  if(input.value == 'Cat' || input.value =='Gatto' || input.value == 'cat' || input.value=='gatto'|| input.value =='CAT' || input.value == 'GATTO' ){
    if(tipo_cat=='Vedi tutte le razze di gatti'){
      fetch("Api_altri_Cat.php?").then(onResponse).then(onJson_Cat_razze);
    }else{
      fetch("Api_Cat.php?q="+ tipo_cat).then(onResponse).then(onJson_Cat);
    }
  }

}
const form = document.querySelector('form');
form.addEventListener('submit', search)


//Salva la razza dell'animale
function Salva(razza){
  const input = document.querySelector('#content');
  let animale ='';
  if(input.value == 'Cat' || input.value =='Gatto' || input.value == 'cat' || input.value=='gatto'){
    animale = razza;
  }else {
    for(box of razza_dog){
      if(razza.includes(box)){
        animale = box;
        break;
      }
    }
  }
  const check = document.querySelectorAll('.container_img');
  for(let box of check){
    box.addEventListener('click', function(event){
      let animal = animale;
      let tipo = input.value;
      Preferiti(event, animal,tipo)
    });
  }
}

function Preferiti(event, animal, tipo){
  const container = event.currentTarget;
  const img = container.querySelector('img.check');
  const img_api= container.querySelector('img');
  const container_preferiti = container.querySelector('.preferiti');
  let val ='';
  if(tipo =='Dog' || tipo=='Cane' || tipo=='dog' || tipo=='cane' || tipo.value =='DOG' || tipo.value == 'CANE'){
    val = 'dog';
  }else{
    val ='cat';
  }
  const container_voto = document.createElement('form');
  if(img.src =='http://localhost/Esempi_lezione/HW1/assets/unlike.png'){
    const voto = document.createElement('input');
    const submit= document.createElement("input");
    submit.type = "submit";
    submit.value = "Invia";
    const titolo = document.createElement('div');
    titolo.textContent = 'Dammi un voto:'
    titolo.classList.add('size');
    voto.classList.add('voto');
    submit.classList.add('invia_voto');
    img.src='assets/like.png';
    container_voto.appendChild(titolo);
    container_voto.appendChild(voto);
    container_voto.appendChild(submit);
    container_preferiti.appendChild(container_voto);
    voto.addEventListener('click', Stop);
    submit.addEventListener('click', Stop);
    /* submit del form */
    container_voto.addEventListener('submit', function(event){
      const razza = animal;
      const votazione = voto;
      const cont_voto = container_voto;
      const foto = img_api;
      const tipo = val;
      const container = container_preferiti;
      Voto(event, razza,votazione, cont_voto,foto, tipo, container)
    });

    container_preferiti.classList.add('space-between');
  }else{
    container_preferiti.innerHTML ='';
    const img = document.createElement('img');
    const reci = document.createElement('div');
    img.src='assets/unlike.png';
    img.classList.add('check');
    reci.appendChild(img);
    container_preferiti.appendChild(reci);

    container_preferiti.classList.remove('space-between');
    fetch("Elimina.php?img="+ img_api.src);
  }
}

function Voto(event, razza,votazione, cont_voto,foto,tipo, container){
  const err = document.createElement('span');
  event.preventDefault();
  const input = votazione.value;
  if(input<=10 && input>0){
    votazione.classList.remove('errore');
    const mess = cont_voto.querySelector('span.err');
    if(mess === 'null'){
      cont_voto.removeChild(err);
    }
    fetch("Aggiungi.php?img="+ foto.src +"&tipo="+tipo + "&razza=" + razza + "&voto=" + input);
    const valutazione_finale = document.createElement('div');
    cont_voto.remove();
    valutazione_finale.textContent= 'Voto:' + input;
    valutazione_finale.classList.add('val');

    container.appendChild(valutazione_finale);

  }else{
    const val_finale = container.querySelector('val');
    if(val_finale === 'null'){
      val_finale.remove();
    }
    cont_voto.classList.remove('hidden');
    votazione.classList.add('errore');
    err.textContent = 'Inserisci un numero tra 1 e 10';
    err.classList.add('err')
    cont_voto.appendChild(err);
  }
}


function Stop(event){
  event.stopPropagation();
}


const foto= ['assets/Avatar1.png', 'assets/Avatar3.png','assets/Avatar4.png','assets/Avatar5.png', 'assets/Avatar6.png',
'assets/Avatar7.png','assets/Avatar8.png','assets/Avatar9.png','assets/Avatar10.png','assets/Avatar11.png','assets/Avatar12.png','assets/Avatar13.png',
'assets/Avatar14.png','assets/Avatar15.png','assets/Avatar16.png','assets/Avatar17.png','assets/Avatar18.png'];
function Profilo(foto){
    const profilo = document.querySelector('#Profilo');
    const index = Math.floor(Math.random() * foto.length);
    const new_img = foto[index];
    const img = profilo.querySelector('img');

    controlla_Profilo(img, new_img);

    img.classList.add('border');

}

async function controlla_Profilo(img, new_img) {
    console.log(img.src);
    let val = await fetch("Controlla_Profilo.php?img=" + new_img).then(response => response.text()).then(data => {return data});
    img.src = val;
}

Profilo(foto);
