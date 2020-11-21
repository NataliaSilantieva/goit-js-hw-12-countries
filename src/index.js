import './styles.css';
const searchForm = document.querySelector('.js-search-form');
const articlesContainer = document.querySelector('.js-articles');
const baseUrl = 'https://restcountries.eu/rest/v2/name/';

export default {
  fetchArticles(query) {
    const requestParams = `${query}`;
    return fetch(baseUrl + requestParams).then(res => res.json());
  },
};

searchForm.addEventListener('input', debounce(countrySearchInputHandler, 500));

function countrySearchInputHandler(e) {
  e.preventDefault();
  clearArticlesContainer();
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
          buildListMarkup(data, articlesOneCountry);
      } else if (data.length <= 10) {
          buildListMarkup(data, countryList);
      }
  })
  .catch(Error => {
      Error({
          text: "You must enter query parameters!"
      });
      console.log(Error)
  })
}

function buildListMarkup(countryes, template) {
  const markup = countryes.map(count => template(count)).join();
  refs.articlesContainer.insertAdjacentHTML('afterbegin', markup)
}

function clearArticlesContainer() {
  refs.articlesContainer.innerHTML = '';
}