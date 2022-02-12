import debounce from 'lodash.debounce';
import { Notify } from 'notiflix/build/notiflix-notify-aio';
import { fetchCountries } from './fetchCountries';
import countriesInfo from '../templates/countries-info.hbs';
import countriesList from '../templates/countries-list.hbs';


const DEBOUNCE_DELAY = 300;

const refs = {
    input: document.querySelector('#search-box'),
    list: document.querySelector('.country-list'),
    info: document.querySelector('.country-info')
}

let countryName = '';

refs.input.addEventListener('input', debounce(findCountryName, DEBOUNCE_DELAY));

function findCountryName(evt) {
    countryName = evt.target.value.trim();
    clearInput();

    fetchCountries(countryName)
        .then(data => {
            let amount = data.length;
            console.log(amount);
            
        /* если в массиве больше чем 10 стран, появляется уведомление */
            if (amount > 10) {
                return Notify.info(`😔 Too many matches found. Please enter a more specific name`);
            }
        /* если в массиве от 2-х до 10-х стран, отображаем список найденных стран */
            else if (amount >= 2 && amount <= 10) {
                renderCountriesList(data);
            }
        /* если массив с 1 страной, то отображаются данные этой страны */
            else if (amount === 1) {
                 renderCountriesInfo(data);
            }
        })
        .catch(onFetchError);
}

function onFetchError(error) {
    console.log(error);

    if (countryName !== '') {
        Notify.failure(`😱 Oops, there is no country with that name`);
    }
}

function clearInput() {
    refs.list.innerHTML = '';
    refs.info.innerHTML = '';
}

function renderCountriesInfo(data) {
    refs.info.insertAdjacentHTML('beforeend', countriesInfo(data));
}

function renderCountriesList(data) {
    refs.list.insertAdjacentHTML('beforeend', countriesList(data));
}