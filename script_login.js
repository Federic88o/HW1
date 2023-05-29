let errori_input = document.querySelectorAll('div div.errore');
for(let box of errori_input){
    if(box){
        let padre_errore = box.parentNode;
        console.log(padre_errore);
        const figlio_input = padre_errore.querySelector('.content');
        console.log(figlio_input);
        figlio_input.classList.add('input_errato');

        const figlio_mess = padre_errore.querySelector('div.errore')
        function Colore(event){
            //Rimuoviamo l'errore dell'input e il bordo rosso
            const dato = event.currentTarget;
            dato.classList.remove('input_errato');
            figlio_mess.remove();
            //Rimuoviamo l'errore finale
            const errore_finale = document.querySelector('#final_err');
            if(errore_finale){
                errore_finale.remove();
            }
        }
        figlio_input.addEventListener('input', Colore);
    }
}


function Mostra(event){
    let checkbox = event.currentTarget;
    let password_nascosta = document.querySelector('#pass_nascosta');
    let password_visibile = document.querySelector('#pass_visibile');
    if (checkbox.checked){
        password_nascosta.classList.add('hidden');
        password_visibile.classList.remove('hidden');
    }else{
        password_nascosta.classList.remove('hidden');
        password_visibile.classList.add('hidden');
    }
}
let checkbox = document.querySelector("#checkbox");
checkbox.addEventListener("change", Mostra);

function Copia_Info(event){
    let input = event.currentTarget;
    let password = input.value;
    let mostra = document.querySelector(".MostraPass");
    if(input !== mostra){
        mostra.value = password;
        console.log(mostra.value);
    }else{
        let mostra = document.querySelector(".NascondiPass");
        mostra.value = password;
        console.log(mostra.value);

    }
}

let box_N = document.querySelector(".NascondiPass");
let box_M = document.querySelector(".MostraPass");
box_M.addEventListener('input', Copia_Info);
box_N.addEventListener('input', Copia_Info);


