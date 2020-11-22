import './styles.css';
const searchForm = document.querySelector('.js-search-form');
const countryList = document.querySelector('.js-countries');
const baseUrl = 'https://restcountries.eu/rest/v2/name/';

export default {
  fetchArticles(query) {
    const request = `${query}`;
    return fetch(baseUrl + request).then(res => res.json());
  },
};

searchForm.addEventListener('input', debounce(searchInputNotifier, 500));

function searchInputNotifier(e) {
  e.preventDefault();
  clearCountryList();
 const searchQuery = e.target.value;
  
  
  countrySearch.fetchArticles(searchQuery).then(data => {
    
      if (data.length > 10) {
          error({
              text: "Too many matches found. Please enter a more specific query!"
          });
      } else if (data.status === 404) {
        error({
          text: "No country has been found. Please enter a more specific query!"
      });
      } else if (data.length === 1) {
          buildListMarkup(data, country);
      } else if (data.length <= 10) {
          buildListMarkup(data, countries);
      }
  })
  .catch(error => {
      error({
          notification: "You must enter query parameters!"
      });
      console.log(error)
  })
}

function buildListMarkup(countries, template) {
  const markup = countries.map(number => template(number)).join();
  countryList.insertAdjacentHTML('beforeend', markup)
}

function clearCountryList() {
    countryList.innerHTML = '';
}