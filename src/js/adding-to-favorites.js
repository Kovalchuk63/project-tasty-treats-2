import sprite from '../sprite.svg';
import common from '../common.json';

const defaults = {
  preview: '../img/no-image-icon-23485.png',
  title: 'no title',
  description: 'no description',
  rating: 'xx',
};

const favouritesCardsList = document.querySelector('.js-all-favourite-cards');
console.log(favouritesCardsList);
const heroPicBlock = document.querySelector('.hero-favourites');
console.log(heroPicBlock);
const failureBlock = document.querySelector('.failure-block');
console.log(failureBlock);

const productsForFavoriteMarkup =
  JSON.parse(localStorage.getItem(common.LS_DISHES_KEY)) ?? [];
console.log(productsForFavoriteMarkup);

function createFavoriteMarkup(arr) {
  console.log(arr);

  if (arr.length === 0) {
    favouritesCardsList.innerHTML = '';
    heroPicBlock.classList.add('hero-img-inactive');
    failureBlock.style.paddingTop = '283px';
    failureBlock.style.paddingBottom = '329px';
    failureBlock.classList.remove('failure-block-hidden');
  } else {
    failureBlock.classList.add('failure-block-hidden');
    heroPicBlock.classList.remove('hero-img-inactive');

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

        return `<li class="card-item-fav" data-id=${_id}>
          <svg class="card-svg-heart-checked js-card-svg-heart" width="22px" height="22px">
            <use href="${sprite}#icon-heart"></use>
          </svg>
          <div class="image-gradient">
            <img class="card-img-fav" src="${
              preview || defaults.preview
            }" alt="${title || defaults.title}"/>
          </div>
          <div class="card-text-fav">
            <h2 class="card-dish-name">${title || defaults.title}</h2>
            <p class="card-dish-descr-fav">${
              description || defaults.description
            }</p>
          </div>
          <div class="rating-btn-container-fav">
            <p class="rating-number">${rating}</p>
            <div class="rating-container">
              ${ratedStarsArray}${notRatedStarsArray}
            </div>
            <button type="button" class="recipe-btn" data="${_id}">See recipe</button>
          </div>
        </li>`;
      })
      .join('');
  }
}
favouritesCardsList.insertAdjacentHTML(
  'beforeend',
  createFavoriteMarkup(productsForFavoriteMarkup)
);

createFavoriteMarkup(productsForFavoriteMarkup);

export function calculationOfRatedStars(rating) {
  const ratedStars = Math.floor(rating / 2);
  return ratedStars;
}

// =================on removeing from fav =============

const jsHeartFavorites = document.querySelectorAll('.js-card-svg-heart');
jsHeartFavorites.forEach(jsHeartFavorite => {
  jsHeartFavorite.addEventListener('click', onRemovingFromFavorites);
});

function onRemovingFromFavorites(event) {
  const svgHeart = event.target.closest('.js-card-svg-heart');
  if (!svgHeart) {
    return;
  }

  const favouriteDish = svgHeart.closest('.card-item-fav');
  const favouriteDishId = favouriteDish.dataset.id;
  console.log(favouriteDishId);

  const idx = productsForFavoriteMarkup.findIndex(
    ({ _id }) => _id === favouriteDishId
  );
  if (idx !== -1) {
    productsForFavoriteMarkup.splice(idx, 1);
  }
  if (productsForFavoriteMarkup.length === 0) {
    heroPicBlock.classList.add('hero-img-inactive');
    failureBlock.classList.remove('failure-block-hidden');
    failureBlock.style.paddingTop = '283px';
    failureBlock.style.paddingBottom = '329px';
  }
  localStorage.setItem(
    common.LS_DISHES_KEY,
    JSON.stringify(productsForFavoriteMarkup)
  );
  favouriteDish.remove();
}
