import { days } from "./components/components.js";

let API = 'https://api-pbolivar-default-rtdb.firebaseio.com/salon.json';

const getPersons = async () => {
    const response = await fetch(API);
    const data = await response.json();
    return data;
}

const getData = () => {
    getPersons().then(data => {
        for (let i = 0; i < data.length; i++) {
            const { person1, person2, day, from, to } = data[i];
            let index = verifyDay(day);
            const id = 'De' + ' ' + from + ' ' + 'a' + ' ' + to + ' ' + index;
            document.getElementById(id).innerHTML = `${person1} <br> ${person2}`;
        }
    }).catch(err => {
        console.log(err);
    })
}
getData();

const verifyDay = (dataDay) => {
    for (let i = 0; i < days.length; i++) {
        const { day, index } = days[i];
        if (day === dataDay) {
            return index;
        }
    }
}

const getTrs = () => {
    let data = []
    for (const ele of document.getElementsByClassName("tr")) {
        data.push(ele);
    }
    return data
}

const arrayElementsByBtn = (data) => {
    for (const el of data.elementsByClassNames) {
        el.addEventListener('click', () => {
            showPopup();
            data.popup.style.visibility = "visible";
            data.popup.style.display = "block";
        })
    }
}

const configPopup = () => {
    let elementsByClassNames = document.getElementsByClassName("btn")
    const popup = document.getElementById("popup");
    const openPopup = document.getElementById("info-iva");

    let data = {
        elementsByClassNames,
        popup,
        openPopup
    }
    arrayElementsByBtn(data);
}

const getClose = () => {
    document.getElementById("btn-cerrar-popup").addEventListener('click', () => {
        const popup = document.getElementById("popup");
        popup.style.visibility = "hidden";
        popup.style.display = "none";
    })
}

const setSpaces = () => {
    const tds = 7;
    let data = getTrs();
    for (let i = 0; i < data.length; i++) {
        for (let j = 0; j < tds; j++) {
            data[i].innerHTML += `<td id="${data[i].id} ${j}">
            <button class="btn btn-success btns" id="${data[i].id}">${data[i].id}</button>
            </td>`;
        }
    }
    configPopup();
}

setSpaces();

const readSend = () => {
    document.getElementById('btnSubmit').addEventListener('click', () => {
        const name1 = document.getElementById('name1').value;
        const name2 = document.getElementById('name2').value;
        const turn = document.getElementById('turn').value;

        const URL = 'https://api.whatsapp.com/send?phone=573003261784&text=Deseo%20apartar%20un%20cupo%20con%20' + name1 + '%20y%20' + name2 + '%20para%20' + turn;
        window.location.href = URL;
        closePop();
    })
}

const closePop = () => {
    const popup = document.getElementById("popup");
    popup.style.visibility = "hidden";
    popup.style.display = "none";
}

const showPopup = () => {
    document.getElementById('popup').innerHTML = `
    <a class="btn-cerrar-popup"><i id="btn-cerrar-popup" class="fas fa-times closed"></i></a>
    <h1>Ingresa tu info</h1>
      <label for="">Ingrese su nombre</label>
      <input id="name1" type="text" name="normales" placeholder="Su nombre" required>
      <label for="">Ingrese el nombre de su acompañante</label>
      <input id="name2" type="text" name="festivos" placeholder="Nombre Acompañante">
      <label>Desde
      <input class="form-control" id="turn" placeholder="Elige tu turno..." list="turns" name="listTitles" required>
    </label>
    <datalist id="turns">
      <option value="6 A 8 AM">
      <option value="8 A 10 AM">
      <option value="10 A 12 PM">
      <option value="2 A 4 PM">
      <option value="4 A 6 PM">
    </datalist>
      <button id="btnSubmit" class="btn btn-success">Enviar Cupo por WhatsApp</button>`;
    readSend();
    getClose();
}