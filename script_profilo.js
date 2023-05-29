function preferiti(){
    fetch("Preferiti.php").then(onResponse).then(onJson_Preferiti);
}

function preferiti_tipo(tipo){
    fetch("Preferiti_tipo.php?q=" + tipo).then(onResponse).then(onJson_Preferiti);
}
function piu_votati(){
    fetch("Piu_votati.php?").then(onResponse).then(onJson_Votati);
}

function Visualizza(event){
    const art = document.querySelector('#view');
    art.classList.remove('color');
    const button = document.querySelectorAll('.categoria');
    for(let box of button){
    box.classList.remove('color');
    }
    const categoria = event.currentTarget;
    categoria.classList.add('color');
    art.classList.add('background');

    if(categoria.textContent == 'I tuoi preferiti'){
        preferiti();
    }else{ 
        if(categoria.textContent == 'Cani'){preferiti_tipo('dog');}
        if(categoria.textContent == 'Gatti'){preferiti_tipo('cat');}
    }
    if(categoria.textContent == 'I più votati'){
        piu_votati();
    }

}

const button = document.querySelectorAll('.categoria');
for(let box of button){
    box.addEventListener('click', Visualizza);
}

function onJson(json) {
    console.log('JSON ricevuto');
    /*console.log(json);*/
    const view = document.querySelector('#Info_profilo');
    const lista = document.createElement('ul');
    const email = document.createElement('li');
    const username = document.createElement('li');
    const nome = document.createElement('li');
    lista.classList.add('dati')
    email.textContent = 'E-mail: ' + json[0].email;
    username.textContent = 'Username: ' + json[0].username;
    nome.textContent = 'Utente: ' + json[0].nome;

    
    lista.appendChild(nome);
    lista.appendChild(username);
    lista.appendChild(email);
    view.appendChild(lista);
}

function onResponse(response) {
    console.log('Risposta ricevuta');
    return response.json();
}

function Info_Profilo(){
    fetch("Info.php?").then(onResponse).then(onJson);
}

Info_Profilo();

function onJson_Preferiti(json) {
    console.log('JSON ricevuto');
    console.log(json);
    const view = document.querySelector('#view');
    view.innerHTML='';
    let cont =0;

    for(let box of json){
        const container = document.createElement('div');
        const img = document.createElement('img');
        const specie = document.createElement('span');
        const elimina = document.createElement('button');
        const cont_button = document.createElement('div');
        const voto = document.createElement('span');
        const matita = document.createElement('img');
        const voto_matita = document.createElement('div');
        voto_matita.classList.add('voto_matita');

        matita.src = 'assets/modifica.png';
        img.src = box.img;
        specie.textContent = 'Razza:' + box.specie;
        voto.textContent = 'Voto:' + box.voto;
        elimina.textContent = 'Elimina';
        elimina.classList.add('tasto');
        cont_button.classList.add('cont_tasto');
        matita.classList.add('matita');

        container.appendChild(img);
        container.appendChild(specie);
        const tipo = document.createElement('span');
        if(tipo !== 'null'){
            const tipo = document.createElement('span');
            tipo.textContent = 'Tipo:' + box.tipo;
            container.appendChild(tipo);
            tipo.classList.add('info');
        }
        voto_matita.appendChild(voto);
        voto_matita.appendChild(matita);
        container.appendChild(voto_matita);
        cont_button.appendChild(elimina);
        container.appendChild(cont_button);
        container.classList.add('container_img');
        specie.classList.add('info');
        voto.classList.add('info');

        matita.addEventListener('click', Aggiorna_voto);
        elimina.addEventListener('click', Elimina);

        view.appendChild(container);
        cont++;
        if(cont >= 15){
            break;
        }

    }
}

function onJson_Votati(json) {
    console.log('JSON ricevuto');
    console.log(json);
    const view = document.querySelector('#view');
    view.innerHTML='';
    let cont =0;

    for(let box of json){
        const container = document.createElement('div');
        const img = document.createElement('img');
        const specie = document.createElement('span');
        const voto = document.createElement('span');
        const aggiungi = document.createElement('button');
        const cont_button = document.createElement('div');
        img.src = box.img;
        specie.textContent = 'Razza:' + box.specie;
        voto.textContent = 'Voto:' + box.voto;

        container.appendChild(img);
        container.appendChild(specie);
        aggiungi.textContent = 'Aggiungi';
        aggiungi.classList.add('tasto');
        cont_button.classList.add('cont_tasto');
        const tipo = document.createElement('span');
        if(tipo !== 'null'){
            const tipo = document.createElement('span');
            tipo.textContent = 'Tipo:' + box.tipo;
            container.appendChild(tipo);
            tipo.classList.add('info');
        }
        container.appendChild(voto);

        /*Controllo se l'utente loggato ha già tra i preferiti */
        eseguiVerifica(img.src,container, cont_button, aggiungi);

        container.classList.add('container_img');
        specie.classList.add('info');
        voto.classList.add('info');


        view.appendChild(container);
        cont++;
        if(cont >= 15){
            break;
        }
    }
}
async function eseguiVerifica(img, container, cont_button,aggiungi) {
    let formData = new FormData();
    formData.append('img', img);
    let opzioni = {
      method: 'POST',
      body: formData};
    let val = await fetch("Verifica.php", opzioni).then(response => response.text()).then(data => {return data});
    console.log(val);
    if(val==0){
        cont_button.appendChild(aggiungi);
        container.appendChild(cont_button);
        aggiungi.addEventListener('click', Aggiungi);
    }
  }

function Aggiungi(event){
    const evento = event.currentTarget;
    const parent =  evento.parentNode.parentNode;
    const img = parent.querySelector('img');
    const info = parent.querySelectorAll('span');
    const razza = info[0].textContent; 
    const tipo = info[1].textContent; 
    const voto = info[2].textContent;
    const s_voto = voto.substring(5);
    console.log(razza.substring(6));
    console.log(tipo.substring(5));
    console.log(parseInt(s_voto)); 
    console.log(img);

    fetch("Aggiungi.php?img="+ img.src +"&tipo="+ tipo.substring(5) + "&razza=" + razza.substring(6) + "&voto=" + parseInt(s_voto));
    evento.parentNode.remove();

}

function Elimina(event){
    const evento = event.currentTarget;
    const parent =  evento.parentNode.parentNode;
    const img = parent.querySelector('img');

    fetch("Elimina.php?img="+ img.src);
    parent.remove();
}

function Aggiorna_voto(event){
    const evento = event.currentTarget;
    const parent = evento.parentNode;
    const parent_box =  evento.parentNode.parentNode;
    const img = parent_box.querySelector('img');
    parent.innerHTML='';

    const container_voto = document.createElement('form');
    const voto = document.createElement('input');
    const submit= document.createElement("input");
    submit.type = "submit";
    submit.value = "Invia";
    const titolo = document.createElement('div');
    titolo.textContent = 'Dammi un voto:'
    titolo.classList.add('size');
    voto.classList.add('voto');
    submit.classList.add('invia_voto');
    container_voto.appendChild(titolo);
    container_voto.appendChild(voto);
    container_voto.appendChild(submit);
    parent.appendChild(container_voto);


    voto.addEventListener('click', Stop);
    submit.addEventListener('click', Stop);

    console.log(container_voto);
    container_voto.addEventListener('submit', function(event){
        const foto = img;
        const container = container_voto;
        const new_voto = voto;
        Invia(event, foto, container, new_voto)
    });

}
function Invia(event, foto, container, new_voto){
    event.preventDefault();
    const input = new_voto.value;
    if(input<=10 && input>0){
        new_voto.classList.remove('errore');
        const final_voto = document.createElement('span');
        container.innerHTML ='';
        final_voto.textContent= 'Voto:' + input;
        final_voto.classList.add('info');
        const matita = document.createElement('img');
        matita.src = 'assets/modifica.png';
        matita.classList.add('matita');

        container.appendChild(final_voto);
        container.appendChild(matita);

        matita.addEventListener('click', Aggiorna_voto);
        console.log(foto);
        console.log(input);
        fetch("Aggiorna.php?img="+ foto.src + "&voto=" + input);


    }else{
        const err = document.createElement('div');
        err.textContent = 'Inserisci un numero tra 1 e 10';
        err.classList.add('err');
        container.appendChild(err);
        new_voto.classList.add('errore')

    }
}

  

function Stop(event){
    event.stopPropagation();
}
  


const foto= ['assets/Avatar1.png', 'assets/Avatar3.png','assets/Avatar4.png','assets/Avatar5.png', 'assets/Avatar6.png',
'assets/Avatar7.png','assets/Avatar8.png','assets/Avatar9.png','assets/Avatar10.png','assets/Avatar11.png','assets/Avatar12.png','assets/Avatar13.png',
'assets/Avatar14.png','assets/Avatar15.png','assets/Avatar16.png','assets/Avatar17.png','assets/Avatar18.png'];

function Profilo(foto){
    const img = document.querySelector('#Profilo');
    const index = Math.floor(Math.random() * foto.length);
    const new_img = foto[index];

    controlla_Profilo(img, new_img);

}

async function controlla_Profilo(img, new_img) {

    let val = await fetch("Controlla_Profilo.php?img=" + new_img).then(response => response.text()).then(data => {return data});
    img.src = val;

}

Profilo(foto);



function Cambia (event){
    const button = event.currentTarget;
    console.log(button);
    const parent = button.parentNode;
    const img = parent.querySelector('img');
    const index = Math.floor(Math.random() * foto.length);
    img.src = foto[index];

    fetch("Cambia_profilo.php?img=" + img.src);

}
const cambia_immagine = document.querySelector('a.Tasto');
cambia_immagine.addEventListener('click', Cambia);
