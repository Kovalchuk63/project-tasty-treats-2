import sprite from '../sprite.svg';
import common from '../common.json';

const defaults = {
  preview: '../img/no-image-icon-23485.png',
  title: 'no title',
  description: 'no description',
  rating: 'xx',
};

const favouritesCardsList = document.querySelector('.all-favorite-cards-use');
console.log(favouritesCardsList);
const heroPic = document.querySelector('.hero-favourites');
console.log(heroPic);

const productsForFavoriteMarkup =
  JSON.parse(localStorage.getItem(common.LS_DISHES_KEY)) ?? [];

function createFavoriteMarkup(arr) {
  console.log(arr);
  if (productsForFavoriteMarkup.length === 0) {
    heroPic.classList.add('hero-img-inactive');
  } else {
    return arr
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
          JSON.parse(localStorage.getItem(common.LS_DISHES_KEY)) ?? [];
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
        <button type="button" class="recipe-btn" data="${_id}">See recipe</button>
      </div>
    </li>`;
        }
      })
      .join('');
  }
}

favouritesCardsList.insertAdjacentHTML(
  'beforeend',
  createFavoriteMarkup(productsForFavoriteMarkup)
);

export function calculationOfRatedStars(rating) {
  const ratedStars = Math.floor(rating / 2);
  return ratedStars;
}
