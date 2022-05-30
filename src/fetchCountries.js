import { Notify } from 'notiflix/build/notiflix-notify-aio';
const BASE_URL = 'https://restcountries.com/v3.1';

export function fetchCountries(name){
    return fetch(`${BASE_URL}/name/${name}?fields=name,capital,population,flags,languages`).then(response => {
        if (response.ok) {
            return response.json();
        }
        Notify.failure('Oops, there is no country with that name', { clickToClose: true });
        throw new Error(response.statusText);
        
    },);
};
