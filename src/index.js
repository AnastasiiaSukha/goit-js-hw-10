import debounce from 'lodash.debounce';
import { Notify } from 'notiflix/build/notiflix-notify-aio';
import './css/styles.css';
import { fetchCountries } from './fetchCountries';

const DEBOUNCE_DELAY = 300;

const refs = {
    input: document.querySelector('#search-box'),
    countriesList: document.querySelector('.country-list'),
    countryInfo: document.querySelector('.country-info'),
}



refs.input.addEventListener('input', debounce(onInput, DEBOUNCE_DELAY));

function onInput(elm) {
    elm.preventDefault();

    const input = elm.target.value.trim();

    if (input === '') {
        deleteMarkup(refs.countryInfo);
        deleteMarkup(refs.countriesList);
        return;
    }
    fetchCountries(input).then(data => {
        if (data.length > 10) {
            Notify.info('Too many matches found. Please enter a more specific name.', {
                clickToClose: true,
            });
            return;
        };
        renderMarkups(data);
    }).catch(error => {
        deleteMarkup(refs.countryInfo);
        deleteMarkup(refs.countriesList);
    });
};


function renderMarkups(countries) {
    if (countries.length > 1) {
        refs.countriesList.innerHTML = countriesListMarkup(countries);
        deleteMarkup(refs.countryInfo);
    } else {
        refs.countryInfo.innerHTML = countryInfoMarkup(countries);
        deleteMarkup(refs.countriesList);
    };
}

function countriesListMarkup(countries) {
    return countries.map(({ flags, name }) =>
        `<li><img src="${flags.svg}" alt="${name.official}" width="50" height="30"> ${name.official}</li>`,
    ).join('');

};

function countryInfoMarkup(countries) {
    return countries.map(
      ({ name, capital, population, flags, languages }) =>
        `<h1><img src="${flags.svg}" alt="${name.official}" width="150px" height="100px"/>${
          name.official
        }</h1>
        <ul>
          <li>Capital: ${capital}</li>
          <li>Population: ${population}</li>
          <li>Languages: ${Object.values(languages)}</li>
        </ul>`,
    )
    .join('');
};

function deleteMarkup(element) {
    element.innerHTML = '';
}