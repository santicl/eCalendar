import { getData, setSpaces, LOCATION } from "./components/components.js";

// Paths to URL
const nelfaPATH = 'https://exhibidores.netlify.app/nelfa.html';
const nelfaPATHAlternate = 'http://localhost/ecalendar/nelfa.html';

const paseoPATH = 'https://exhibidores.netlify.app/paseo-bolivar.html';
const paseoPATHAlternate = 'http://localhost/ecalendar/paseo-bolivar.html';

const salonPATH = 'https://exhibidores.netlify.app/salon-reino.html';
const salonPATHAlternate = 'http://localhost/ecalendar/salon-reino.html';

const amadorPATH = 'https://exhibidores.netlify.app/amador.html';
const amadorPATHAlternate = 'http://localhost/ecalendar/amador.html';

// API'S
const API_NELFA = 'https://api-nelfa-default-rtdb.firebaseio.com/persons.json';
const API_PASEO = 'https://api-ortiz-default-rtdb.firebaseio.com/ortiz.json';
const API_AMADOR = 'https://api-amador-3c8ee-default-rtdb.firebaseio.com/amador.json';
const API_SALON = 'https://api-pbolivar-default-rtdb.firebaseio.com/salon.json';

setSpaces();

const main = (API) => {
    window.onload = getData(API);
}

if (LOCATION === nelfaPATH || LOCATION === nelfaPATHAlternate) {
    main(API_NELFA);
}

if (LOCATION === paseoPATH || LOCATION === paseoPATHAlternate) {
    main(API_PASEO);    
}

if (LOCATION === salonPATH || LOCATION === salonPATHAlternate) {
    main(API_SALON);
}

if (LOCATION === amadorPATH || LOCATION === amadorPATHAlternate) {
    main(API_AMADOR);
}