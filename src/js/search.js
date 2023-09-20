import { fetchAllRecipes } from './API/API';
import { Notify } from 'notiflix';
import debounce from 'lodash/debounce';

const refs = {
     keyWord: document.querySelector('.search-input'),
     searchBtn: document.querySelector('.btn-search'),
     time: document.querySelector('.time'),
     area: document.querySelector('.area'),
     ingredient: document.querySelector('.ingredient'),
     cancelBtn: document.querySelector('.button-box'),
}
/* let currentPage = 1; // Initialize with the first page

// When you need to get the current page:
const page = currentPage;

// Example: Incrementing the page
function nextPage() {
  if (currentPage < totalPages) {
    currentPage++;
    // Update the UI or perform any necessary actions
  }
}

// Example: Decrementing the page
function previousPage() {
  if (currentPage > 1) {
    currentPage--;
    // Update the UI or perform any necessary actions
  }
}

renderCards(page); */
refs.cancelBtn.addEventListener('click', resetSearch);

function resetSearch() {
  refs.keyWord.value = '';
    refs.time.value = '';
}

const FetchByFilter = new fetchAllRecipes();
FetchByFilter.setLimitValue();
const limit = FetchByFilter.setLimitValue();


refs.keyWord.addEventListener(
  'input',
  debounce(() => {
    const query = String(refs.keyWord.value.trim());
    if (query !== '') {
      searchFetch(query);
      console.log(query)
    } else {
    }
  }, 300)
);
function searchFetch(query) {
  FetchByFilter.setSearchValue(query);
  // resetPagination();
}

refs.time.addEventListener('change', (event) => {
    const time = parseInt(event.target.textContent);
    FetchByFilter.setTimeValue(time);
    console.log("fetched by time")
    // resetPagination();
})


/* async function renderCards(page) {
  try {
    hide();
    resetCards();

    refs.loader.classList.remove('visually-hidden');
    refs.loaderTxt.classList.remove('visually-hidden');
    refs.imgOops.classList.add('visually-hidden');

    FetchByFilter.setPage(page);

    const response = await FetchByFilter.fetchRecipes();
    const results = response.results;

    if (results.length === 0) {
      throw new Error();
    } else {
      refs.conCards.classList.add('visually-hidden');
      refs.imgOops.classList.add('visually-hidden');
    }

    const roundedData = results.map(result => {

    let ratingValue = Math.floor(result.rating * 10) / 10;

      return {
        ...result,
        rating: ratingValue,
        notFound:
          'https://img.freepik.com/free-vector/oops-404-error-with-broken-robot-concept-illustration_114360-5529.jpg',
      };
    });
    results.splice(0, results.length, ...roundedData);
    refs.cardsList.innerHTML = TemplateArticles(results);
    refs.loader.classList.add('visually-hidden');
    refs.loaderTxt.classList.add('visually-hidden');

    show();
    eventListener();
    setLocalStorage();
    fillStars();
    cardHearts();
    return response;
  } catch (err) {
    // refs.conCards.classList.remove('visually-hidden');
    // refs.imgOops.classList.remove('visually-hidden');

    // refs.loader.classList.add('visually-hidden');
    // refs.loaderTxt.classList.add('visually-hidden');
    Notify.failure('Something went wrong. Please try again');
    console.log(err);
  }
}
 */