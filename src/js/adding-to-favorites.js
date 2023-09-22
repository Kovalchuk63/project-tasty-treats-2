import sprite from '../sprite.svg';
import common from '../common.json';
const defaults = {
  preview: '../img/no-image-icon-23485.png',
  title: 'no title',
  description: 'no description',
  rating: 'xx',
};
const favouritesCardsList = document.querySelector('.js-all-favourite-cards');
const heroPicBlock = document.querySelector('.hero-favourites');
const failureBlock = document.querySelector('.failure-block');
const productsForFavoriteMarkup =
  JSON.parse(localStorage.getItem(common.LS_DISHES_KEY)) ?? [];

onFavoritePageLoad();
// /=============================================== 1
let arrBtnFavor = [];
const containerFavorBtn = document.querySelector('.js-all-favourites-btn');
const cardBtnsFavor = document.querySelector('.card-favor-btn');
if (productsForFavoriteMarkup.length > 0) {
  containerFavorBtn.insertAdjacentHTML('afterbegin', createMarkupFavorBtn());
}
function createMarkupFavorBtn() {
  return ` <button class="btn-favor js-btn-favor">All categories</button>`;
}
const allBtnFavor = document.querySelector('.js-btn-favor');
//===============================================/1
//=============================================== 2
cardBtnsFavor.insertAdjacentHTML(
  'beforeend',
  createMarkupAllFavorBtn(productsForFavoriteMarkup)
);
function createMarkupAllFavorBtn(arr) {
  const arrUniqueelements = arr
    .map(({ category }) => category)
    .filter((elem, idx, array) => array.indexOf(elem) === idx);
  return arrUniqueelements
    .map(elem => {
      arrBtnFavor.push(elem);
      return `<button class="btn-favor js-btns-favor" name="${elem.toLowerCase()}">${elem}</button>`;
    })
    .join('');
}
//===============================================/2
//===============================================3

cardBtnsFavor.addEventListener('click', handlerClickSort);
function handlerClickSort(evt) {
  const categoryBtn = evt.target.textContent;
  const newArrCategoryBtn = productsForFavoriteMarkup.filter(
    ({ category }) => category === categoryBtn
  );
  favouritesCardsList.innerHTML = createFavoriteMarkup(newArrCategoryBtn);
  cardBtnsFavor.innerHTML = `<button class="btn-favor js-btns-favor" name="${categoryBtn.toLowerCase()}">${categoryBtn}</button>`;
}
//===============================================/3
//=================================================4
allBtnFavor.addEventListener('click', handlerClickAllCategoriesBtnFavor);
function handlerClickAllCategoriesBtnFavor() {
  favouritesCardsList.innerHTML = createFavoriteMarkup(
    productsForFavoriteMarkup
  );
  cardBtnsFavor.innerHTML = createMarkupAllFavorBtnEnd(arrBtnFavor);
}
function createMarkupAllFavorBtnEnd(arr) {
  return arr
    .map(
      elem =>
        `<button class="btn-favor js-btns-favor" name="${elem.toLowerCase()}">${elem}</button>`
    )
    .join('');
}
//=================================================/4
function createFavoriteMarkup(arr) {
  if (arr.length === 0) {
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

  //=================================================5
  const arrTargetFavor =
    JSON.parse(localStorage.getItem(common.LS_DISHES_KEY)) ?? [];
  const targetProductFavor = arrTargetFavor.find(
    ({ _id }) => _id === favouriteDishId
  );
  const targetBtnArr = document.getElementsByName(
    `${targetProductFavor.category.toLowerCase()}`
  );
  //=================================================/5
  const idx = productsForFavoriteMarkup.findIndex(
    ({ _id }) => _id === favouriteDishId
  );
  if (idx !== -1) {
    productsForFavoriteMarkup.splice(idx, 1);
  }
  if (productsForFavoriteMarkup.length === 0) {
    containerFavorBtn.style.display = 'none';
    heroPicBlock.classList.add('hero-img-inactive');
    failureBlock.classList.remove('failure-block-hidden');
    failureBlock.style.paddingTop = '283px';
    failureBlock.style.paddingBottom = '329px';
  }
  localStorage.setItem(
    common.LS_DISHES_KEY,
    JSON.stringify(productsForFavoriteMarkup)
  );
  //===================================================================6
  if (
    (JSON.parse(localStorage.getItem(common.LS_DISHES_KEY)) ?? []).length === 0
  ) {
    allBtnFavor.classList.add('btn-favor-hidden');
  }
  if (
    !(JSON.parse(localStorage.getItem(common.LS_DISHES_KEY)) ?? []).find(
      ({ category: categoryProduct }) =>
        categoryProduct === targetProductFavor.category
    )
  ) {
    targetBtnArr[0].classList.add('btn-favor-hidden');
  }
  //=====================================================================/6
  favouriteDish.remove();
}

function onFavoritePageLoad() {
  heroPicBlock.classList.add('hero-img-inactive');
  failureBlock.style.paddingTop = '283px';
  failureBlock.style.paddingBottom = '329px';
  failureBlock.classList.remove('failure-block-hidden');
}
