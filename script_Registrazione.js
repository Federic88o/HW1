function InserisciDati(event){
    let Dato = event.currentTarget;
    const info_dato = Dato.value; 
    Dato.value = '';
    Dato.classList.remove('esempio_Testo');
    function Controllo(){
        if(Dato.value.length === 0){
            Dato.value = info_dato;
            Dato.classList.add('esempio_Testo');
            Dato.addEventListener('click', InserisciDati);
        }
    }
    function FissaDati(){
        Dato.classList.remove('esempio_Testo');
        Dato.removeEventListener('click', InserisciDati);
    }

    Dato.addEventListener('blur', Controllo);
    Dato.addEventListener('input', FissaDati);
}

const boxes = document.querySelectorAll(".esempio_Testo");
for(const box of boxes){
    box.addEventListener('click', InserisciDati);
}

function checkName(event){
    const nome_completo = event.currentTarget;
    const input = nome_completo.value;
    const genitore = nome_completo.parentNode

    const contenitore_mess = genitore.parentNode.querySelector('div');
    contenitore_mess.innerHTML='';

    if(input === ''){
       const mess = document.createElement('span');
       mess.textContent = 'Inserire Nome e Cognome';
       mess.classList.add('errore');
       nome_completo.parentNode.appendChild(contenitore_mess);
       contenitore_mess.appendChild(mess);
       nome_completo.classList.add('input_errato');
    }else{
        nome_completo.classList.remove('input_errato');
        contenitore_mess.innerHTML = '';
    }
}

function jsonCheckEmail(json) {
    for(evento of json){
        console.log(evento);
        const input = document.querySelector('.email');
        const genitore = input.parentNode.parentNode;
        const contenitore_mess = genitore.querySelector('div');
        const mess = document.createElement('span');
        mess.textContent = evento;
        mess.classList.add('errore');
        input.parentNode.appendChild(contenitore_mess);
        contenitore_mess.appendChild(mess);
        input.classList.add('input_errato');
    }
}

function jsonCheckUsername(json) {
    for(evento of json){
        console.log(evento);
        const input = document.querySelector('.username');
        const genitore = input.parentNode.parentNode;
        const contenitore_mess = genitore.querySelector('div');
        const mess = document.createElement('span');
        mess.textContent = evento;
        mess.classList.add('errore');
        input.parentNode.appendChild(contenitore_mess);
        contenitore_mess.appendChild(mess);
        input.classList.add('input_errato');
    }
}

function fetchResponse(response) {
    if (!response.ok) return null;
    return response.json();
}
function checkUsername(event){
    const username = event.currentTarget;
    const input = username.value;
    const genitore = username.parentNode

    const contenitore_mess = genitore.parentNode.querySelector('div');
    contenitore_mess.innerHTML='';

    if(!/^[a-zA-Z0-9]{6,}$/.test(input)) {
        const mess = document.createElement('span');
        mess.textContent = "Non sono ammessi caratteri speciaili, minimo caratteri 6";
        mess.classList.add('errore');
        contenitore_mess.appendChild(mess);
        genitore.parentNode.appendChild(contenitore_mess);
        username.classList.add('input_errato');
    } else {
        username.classList.remove('input_errato');
        contenitore_mess.innerHTML = '';
        fetch("check_Username.php?q="+encodeURIComponent(input)).then(fetchResponse).then(jsonCheckUsername);
    }   

}

function checkEmail(event) {
    const email = event.currentTarget;
    const input = email.value;
    const genitore = email.parentNode

    const contenitore_mess = genitore.parentNode.querySelector('div');
    contenitore_mess.innerHTML = '';

    if(!/^[^\s@]+@[^\s@]+\.[^\s@]+$/.test(input)) {
        const mess = document.createElement('span');
        mess.textContent = "E-mail non valida";
        mess.classList.add('errore');
        contenitore_mess.appendChild(mess);
        genitore.parentNode.appendChild(contenitore_mess);
        email.classList.add('input_errato');
    } else {
        email.classList.remove('input_errato');
        contenitore_mess.innerHTML = '';
        fetch("check_Email.php?q="+encodeURIComponent(input)).then(fetchResponse).then(jsonCheckEmail);
    }
}

function checkPassword(event){
    const password = event.currentTarget;
    const input = password.value;
    const genitore = password.parentNode;

    const lista_errori = ["Deve contenere almenouna lettera Maiuscola", 
     "Deve contenere almeno una letterea Minuscola", 
     "Deve contenere alemno un numero",
     "Deve contenere almeno un carattere speciale",
     "Deve avere lunghezza compresa tra 8 e 20 caratteri"];

    const contenitore_mess = genitore.parentNode.querySelector('div');
    contenitore_mess.innerHTML = '';
    if(!/^(?=.*[a-z])(?=.*[A-Z])(?=.*\d)(?=.*[^a-zA-Z0-9]).{8,20}$/.test(input)) {
        const mess = document.createElement('span');
        mess.textContent = "Password non valida";
        mess.classList.add('errore');
        contenitore_mess.appendChild(mess);
        const ul = document.createElement("ul");
        for (let i = 0; i < lista_errori.length; i++) {
            const li = document.createElement("li");
            li.textContent = lista_errori[i];
            ul.appendChild(li);
        }
        ul.classList.add('errore');
        contenitore_mess.appendChild(ul);
        genitore.parentNode.appendChild(contenitore_mess);
        password.classList.add('input_errato');
    } else {
        password.classList.remove('input_errato');
        contenitore_mess.innerHTML = '';
    }

}
const check_nome_completo = document.querySelector('.nome_completo');
check_nome_completo.addEventListener('blur', checkName);

const check_username = document.querySelector('.username');
check_username.addEventListener('blur', checkUsername);

const check_email = document.querySelector('.email');
check_email.addEventListener('blur', checkEmail);

const check_password = document.querySelectorAll('.password');
for(let box of check_password){
    box.addEventListener('blur', checkPassword);
}
