const btnsave = document.querySelector('.save-btn');
const input = document.getElementById('titt');
const textarea = document.getElementById('desct');
const ul = document.getElementById('list-t');
const btnImp = document.getElementById('import');
const buscador = document.getElementById('filtratarea');

let liEdit;
let id = 0;
let selecImport = 1;

//esta funcion elimina de la lista una tarea
function EliminarTarea(element) {
    element.classList.add('elim-t');
    //el settimeout es para q espere unos segundos antes de eliminar la tarea para q haga la animacion
    setTimeout(() => {
        element.remove();

        if (ul.children.length === 0) {
            document.getElementById('notarea').style.display = "block";
        }
    }, 800);
}


//esta funcion toma x== 1 a 2 o 3 segun el boton de import y guarda el valor en selecImport y cambia el estilo
//del boton seleccionado
function impTarea(x) {
    selecImport = x;
    document.querySelector('.import-1').classList.remove('activo')
    document.querySelector('.import-2').classList.remove('activo')
    document.querySelector('.import-3').classList.remove('activo')
    if (selecImport == 1) {
        document.querySelector('.import-1').classList.add('activo')
    }
    if (selecImport == 2) {
        document.querySelector('.import-2').classList.add('activo')
    }
    if (selecImport == 3) {
        document.querySelector('.import-3').classList.add('activo')
    }

}

//para todos los eventos de las tareas
ul.addEventListener('click', function(event) {

    // Verificar si el click fue en un checkbox
    if (event.target.type === 'checkbox') {
        const checkbox = event.target;
        //el closest('li') busca el primer li mas cerca al checkbox
        const li = checkbox.closest('li');

        if (checkbox.checked) {
            // Si el checkbox está marcado, tachar la tarea
            li.style.opacity = "0.6";
            li.style.textDecoration = "line-through";
        } else {
            // Si el checkbox está desmarcado, quitar el tachado
            li.style.opacity = "1";
            li.style.textDecoration = "none";
        }
    }

    //para eliminar
    if (event.target.className === 'elim') {
        const li = event.target.closest('li');
        EliminarTarea(li);
    }

    //para editar
    if (event.target.className === 'edit') {
        liEdit = event.target.closest('li');
        const tit = liEdit.querySelector('h2');
        const desc = liEdit.querySelector('p');
        input.value = tit.textContent;
        textarea.value = desc.textContent;
        document.querySelector('.save-btn').style.display = "none";
        document.querySelector('.save-edit').style.display = "flex";
        OpenCreadT();

    }
});


//agrega las tareas
function ListaDeTareas(titulo, desc) {
    //creo un li, h2, p
    const li = document.createElement('li');
    const h2 = document.createElement('h2');
    const p = document.createElement('p');
    //este es el check, elim y editar de cada tarea
    const check = document.createElement('input');
    const eliminar = document.createElement('img');
    const edit = document.createElement('img')
        //va aumentanndo el id de cada li
    li.setAttribute('id', id);
    //todo sobre el boton eliminar
    eliminar.className = "elim";
    eliminar.src = "https://img.icons8.com/?size=100&id=68138&format=png&color=000000";

    //sobre el boton editar
    edit.className = "edit";
    edit.src = "https://img.icons8.com/?size=100&id=86376&format=png&color=000000";

    check.setAttribute("type", "checkbox");

    //le agrega clases a la li para darle color segun importancia
    li.className = "cont-t";
    if (selecImport === 2) {
        li.className = "cont-t-2";
    } else if (selecImport === 3) {
        li.className = "cont-t-3";
    }

    //en el h2 escribo lo q tengo en la variable titulo y ....
    h2.textContent = titulo;
    p.textContent = desc;

    //meto en li el h2 y p // en la otra de abajo meto todo en ul
    li.appendChild(h2);
    li.appendChild(check);
    li.appendChild(p);
    li.appendChild(edit);
    li.appendChild(eliminar);
    ul.appendChild(li)
}

//para editar
document.querySelector('.save-edit').addEventListener('click', function(event) {
    event.preventDefault();
    if (input.value.trim() === "" || textarea.value.trim() === "") {
        document.getElementById('alert-error').style.display = "flex";
        return;
    }

    liEdit.querySelector('h2').textContent = input.value;
    liEdit.querySelector('p').textContent = textarea.value;
    //le agrega clases a la li para darle color segun importancia
    liEdit.className = "cont-t";
    if (selecImport === 2) {
        liEdit.className = "cont-t-2";
    } else if (selecImport === 3) {
        liEdit.className = "cont-t-3";
    }

    CloseCreadT();

})

//esto lee si hay un evento en el btn guardar tipo click y ejecuta una funcion 
btnsave.addEventListener('click', function(event) {
    event.preventDefault(); //para q al enviar no se actualice la pag y pierda todo

    //verificar si el input o el textarea estan vacios, tim() es una funcion q elimina los espacios del princ y final
    if (input.value.trim() === "" || textarea.value.trim() === "") {
        document.getElementById('alert-error').style.display = "flex";
        return;
    }

    //guarda lo de el input y el textarea en dos variables
    let titulo = input.value;
    let desc = textarea.value;


    ListaDeTareas(titulo, desc);
    id++;


    //para limpiar lo q dice q no hay tareas
    document.getElementById('notarea').style.display = "none"

    CloseCreadT();
})

//para buscar alguna tarea
buscador.addEventListener('keyup', function() {
    const text = buscador.value.toLowerCase();
    let tit;
    let desc;
    const lis = ul.getElementsByTagName('li')
    for (let i = 0; i < lis.length; i++) {
        tit = lis[i].querySelector('h2').textContent.toLowerCase();
        desc = lis[i].querySelector('p').textContent.toLowerCase();
        if (tit.includes(text) || desc.includes(text)) {
            lis[i].style.display = "block";
        } else lis[i].style.display = "none";
    }
})



//funcion para abrir form
function OpenCreadT() {
    selecImport = 1;
    const vent = document.getElementById('vent-ct');
    vent.showModal();

    //esto es para ocultar la alerta de q hay espacios vacios cada vez q abro la ventana
    document.getElementById('alert-error').style = "display:none;";

}
//funcion para cerrar form
function CloseCreadT() {
    //para limpiar cada q cierre la ventana
    input.value = "";
    textarea.value = "";

    //para los botones
    document.querySelector('.save-btn').style.display = "flex";
    document.querySelector('.save-edit').style.display = "none";

    //esto elimina la ultima selec de btn importancia
    document.querySelector('.import-1').classList.remove('activo')
    document.querySelector('.import-2').classList.remove('activo')
    document.querySelector('.import-3').classList.remove('activo')

    const vent = document.getElementById('vent-ct');
    vent.close();
}
//funcion para cerrar si click en el fondo 
document.getElementById('vent-ct').addEventListener('click', function(event) {
    if (event.target === this) CloseCreadT();
    //event es objeto del evento que contiene información sobre el clic que ocurrio
    //event.target da el valor donde se hizo click (un boton un input ...)
    //this se refiere a document.getElementById('vent-ct') osea el elemento con id 'vent-ct'
})

//esto lee si hay un evento en la ventana de creacion tipo presionar una tecla
//si es enter o esc ejecuta una funcion q impide recargar la pag q es lo q haria por defecto
document.getElementById('vent-ct').addEventListener('keydown', function(event) {
    if (event.key === 'Escape' || event.key === 'Enter') event.preventDefault();
})