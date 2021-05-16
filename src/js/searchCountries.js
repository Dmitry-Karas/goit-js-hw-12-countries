import debounce from 'lodash.debounce';
import fetchCountries from './fetchCountries';
import countryCardTpl from '../templates/countryCard.hbs';
import countriesListTpl from '../templates/countriesList.hbs';
import { searchInput, cardContainer } from './refs';
import { manyMatchesErrorMsg, notFoundErrorMsg } from './notifications';

const reset = () => (cardContainer.innerHTML = '');

const render = markup => {
  cardContainer.insertAdjacentHTML('beforeend', markup);
};

const renderMarkup = data => {
  const countries = data.length;
  const countryCardMarkup = countryCardTpl(data);
  const countriesListMarkup = countriesListTpl(data);

  if (countries > 10) {
    return manyMatchesErrorMsg();
  }

  if (countries >= 2 && countries <= 10) {
    render(countriesListMarkup);
  }

  if (countries === 1) {
    render(countryCardMarkup);
  }
};

const onSearch = () => {
  reset();

  const countryName = searchInput.value;

  if (!countryName) {
    return;
  }

  fetchCountries(countryName).then(renderMarkup).catch(notFoundErrorMsg);
};

searchInput.addEventListener('input', debounce(onSearch, 750));
