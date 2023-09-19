import sprite from '../sprite.svg';
import { LS_DISHES_KEY } from './all-recipes';
import { cardsInfo } from './all-recipes';
import { defaults } from './all-recipes';
import { calculationOfRatedStars } from './all-recipes';
import { favouriteDishes } from './all-recipes';
import { onAddingToFavourites } from './all-recipes';

const selectorsCategories = {
  allCategoriesBtn: document.querySelector('.js-all-categories-btn'),
  categoriesBtnList: document.querySelector('.js-categories-btn-card'),
  listCardRecipes: document.querySelector('.js-card-list'),
};

selectorsCategories.categoriesBtnList.addEventListener(
  'click',
  handlerSearchBtn
);
selectorsCategories.listCardRecipes.addEventListener(
  'click',
  onAddingToFavourites
);

serviseCategoriesBtn()
  .then(data =>
    selectorsCategories.categoriesBtnList.insertAdjacentHTML(
      'beforeend',
      createMarkupCategoriesBtn(data)
    )
  )
  .catch(error => console.log(error));

// API categories btn
async function serviseCategoriesBtn() {
  const BASE_URL = 'https://tasty-treats-backend.p.goit.global/api';
  const END_POINT = '/categories';
  const response = await fetch(`${BASE_URL}${END_POINT}`);
  if (!response.ok) {
    throw new Error(response.statusText);
  }
  return response.json();
}

//Markup categories btn
function createMarkupCategoriesBtn(arr) {
  return arr
    .map(
      ({ _id, name }) =>
        `<button class="categories-btn" data-id="${_id}">${name}</button>`
    )
    .join('');
}

//==============================================================

// Callback function - "click"
function handlerSearchBtn(evt) {
  selectorsCategories.allCategoriesBtn.classList.remove(
    'all-categories-btn-active'
  );
  serviseCategoriesRecipes(evt.target.textContent)
    .then(
      data =>
        (selectorsCategories.listCardRecipes.innerHTML =
          createMarkupCategoriesRecipes(data.results))
    )
    .catch(error => console.log(error));
}

// API all categories recipes
async function serviseCategoriesRecipes(category) {
  const BASE_URL = 'https://tasty-treats-backend.p.goit.global/api';
  const END_POINT = '/recipes';
  const params = new URLSearchParams({
    limit: 9,
    category: category,
  });
  const response = await fetch(`${BASE_URL}${END_POINT}?${params}`);
  if (!response.ok) {
    throw new Error(response.statusText);
  }
  return response.json();
}

// Markup categories recipes
function createMarkupCategoriesRecipes(arr) {
  cardsInfo.push(...arr);
  const markup = arr
    .map(({ preview, title, description, rating, _id }) => {
      const ratedStars = calculationOfRatedStars(rating);
      const ratedStarsArray = Array.from(
        { length: ratedStars },
        () =>
          `<svg class="svg-star rated">
          <use href="${sprite}#icon-Star"></use>
        </svg>`
      ).join('');

      const notRatedStarsArray = Array.from(
        { length: 5 - ratedStars },
        () =>
          `<svg class="svg-star">
          <use href="${sprite}#icon-Star"></use>
        </svg>`
      ).join('');

      const arrlocalStorage =
        JSON.parse(localStorage.getItem(LS_DISHES_KEY)) ?? [];
      if (
        arrlocalStorage.find(
          ({ _id: IdlocalStorage }) => IdlocalStorage === _id
        )
      ) {
        return `<li class="card-item" data-id=${_id}>
          <svg class="card-svg-heart-checked js-card-svg-heart" width="22px" height="22px">
        <use href="${sprite}#icon-heart"></use>
      </svg>
      <div class="image-gradient">
      <img class="card-img" src="${preview || defaults.preview}" alt="${
          title || defaults.title
        }"/>
      </div>
      <div class="card-text">
      <h2 class="card-dish-name">${title || defaults.title}</h2>
      <p class="card-dish-descr">${description || defaults.description}</p>
      </div>
      <div class="rating-btn-container">
        
          <p class="rating-number">${rating}</p>
          <div class="rating-container">
          ${ratedStarsArray}${notRatedStarsArray}
        </div>
        <button type="button" class="recipe-btn">See recipe</button>
      </div>
    </li>`;
      } else {
        return `<li class="card-item" data-id=${_id}>
          <svg class="card-svg-heart js-card-svg-heart" width="22px" height="22px">
        <use href="${sprite}#icon-heart"></use>
      </svg>
      <div class="image-gradient">
      <img class="card-img" src="${preview || defaults.preview}" alt="${
          title || defaults.title
        }"/>
      </div>
      <div class="card-text">
      <h2 class="card-dish-name">${title || defaults.title}</h2>
      <p class="card-dish-descr">${description || defaults.description}</p>
      </div>
      <div class="rating-btn-container">
        
          <p class="rating-number">${rating}</p>
          <div class="rating-container">
          ${ratedStarsArray}${notRatedStarsArray}
        </div>
        <button type="button" class="recipe-btn">See recipe</button>
      </div>
    </li>`;
      }
    })
    .join('');

  return markup;
}
