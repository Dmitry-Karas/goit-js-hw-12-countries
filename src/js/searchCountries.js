import debounce from 'lodash.debounce';
import fetchCountries from './fetchCountries';
import countryCardTpl from '../templates/countryCard.hbs';
import countriesListTpl from '../templates/countriesList.hbs';
import { searchInput, cardContainer } from './refs';
import { manyMatchesErrorMsg, notFoundErrorMsg } from './notifications';

const renderCountriesList = countries => {
  const countriesListMarkup = countriesListTpl(countries);
  cardContainer.insertAdjacentHTML('beforeend', countriesListMarkup);
};

const renderCountryCard = country => {
  const countryCardMarkup = countryCardTpl(country);
  cardContainer.insertAdjacentHTML('beforeend', countryCardMarkup);
};

const renderMarkup = data => {
  const countries = data.length;

  if (countries > 10) {
    return manyMatchesErrorMsg();
  }

  if (countries >= 2 && countries <= 10) {
    renderCountriesList(data);
  }

  if (countries === 1) {
    renderCountryCard(data);
  }
};

const reset = () => (cardContainer.innerHTML = '');

const onSearch = () => {
  reset();

  const countryName = searchInput.value;

  if (!countryName) {
    return;
  }

  fetchCountries(countryName).then(renderMarkup).catch(notFoundErrorMsg);
};

searchInput.addEventListener('input', debounce(onSearch, 750));
