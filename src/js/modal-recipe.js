const BASE_URL = 'https://tasty-treats-backend.p.goit.global/api/recipes';

async function fetchCook() {
  try {
    const response = await fetch(BASE_URL);
    if (!response.ok) {
      throw new Error(`Код: ${response.status}`);
    }
    const data = await response.json();
    return data;
  } catch (error) {
    console.error(error);
    return null;
  }
}

const refs = {
  allCards: document.querySelector('.card-list'),
  popular : document.querySelector('.name-popular'),
  modalCardCont: document.querySelector('.card-markup-modal'),
  modalBackdrop: document.querySelector('.modal-backdrop'),
  modalButtonClose: document.querySelector('.modal-btn-close'),
  giveRatingModalBtn: document.querySelector('.modal-give-rating'),
  //ratingModal: document.querySelector('.rating-backdrop'),
  // ratingButton: document.querySelector('.rating-send-btn'),
  // ratingClose: document.querySelector('.modal-rating-close'),
  addToFavorite: document.querySelector('.modal-add-favorite'),
  recipeBtn: document.querySelector('.recipe-btn'),
};

refs.allCards.addEventListener('click', handlerGetIdCard);

async function handlerGetIdCard(event) {
  
  const buttonId = event.target.getAttribute('id');
  refs.recipeBtn.id = buttonId;
  const dataById = await fetchCook(`/${buttonId}`);
  const modalMarkup = createMarkupModal(dataById);
  refs.modalCardCont.innerHTML = modalMarkup;

  openModal();
}

refs.popular.addEventListener('click', handleRecipeClick)

async function handleRecipeClick(event) {
  if (!event.target.closest('.name-popular')) {
    return;
  }

  const clickedRecipe = event.target.closest('.name-popular');
  if (!clickedRecipe) return;

  const recipeId = clickedRecipe.dataset.id;
  const dataRecipe = await fetchCook(`/${recipeId}`);
  modalCardCont.innerHTML = createMarkupModal(dataRecipe);
  addToFavorite.id = recipeId;

  openModal();
}


 function createMarkupModal(data) {
  const youtubeLink = data.youtube;

  function getYoutubeVideoId(url) {
    const videoIdMatch = url.match(/v=([^&]+)/);
    return videoIdMatch ? videoIdMatch[1] : '';
  }

  const videoId = getYoutubeVideoId(youtubeLink);

  const embedUrl = `https://www.youtube.com/embed/${videoId}`;

  const roundedRating = parseFloat(data.rating).toFixed(1);

  const tagsToRender = data.tags.slice(0, 2);

  const tagsMarkup = tagsToRender
    .map(
      tag => `
      <li class="hashtag-btn-item">#${tag}</li>
    `
    )
    .join('');

  const ingredientsMarkup = data.ingredients
    .map(
      ingredient => `
  <li class="modal-card-ingr">
    ${ingredient.name}
    <span class="modal-card-measure">${ingredient.measure}</span>
  </li>
`
    )
    .join('');

  const modalCardMarkup = `
      <iframe
        src="${embedUrl}"
        title="YouTube video player"
        frameborder="0"
        allow="accelerometer; autoplay; clipboard-write; encrypted-media; gyroscope; picture-in-picture; web-share"
        allowfullscreen
        class="iframe-video"
      ></iframe>
      <h3 class="modal-recipe-name">${data.title}</h3>
      <div class="modal-general-inf">
      <div class="card-star-modal card_star-rating">
      <p class="modal-raiting cards-raiting">${roundedRating}</p>
      <div class="starts-modal ">
  

      </div>
      <p class="modal-card-time">${data.time} min</p>
    </div>

     
        <ul class="modal-ingr-list">${ingredientsMarkup}</ul>
        <ul class="hashtag-btn-list-tablet list">${tagsMarkup}</ul>
        <p class="modal-recipe-instructions">${data.instructions}</p>
      </div>
`;

  return modalCardMarkup;
}


function openModal() {
  refs.modalButtonClose.addEventListener('click', closeModal);
  refs.modalBackdrop.addEventListener('click', closeModalOnBackdrop);

  window.addEventListener('keydown', handleKeyDown);
  refs.modalBackdrop.classList.add('is-open');
  document.body.style.overflow = 'hidden';
}

function handleKeyDown(event) {
  if (event.key === 'Escape') {
    closeModal();
    // closeRatingModal();
  }
}
 function closeModal() {
  refs.modalButtonClose.removeEventListener('click', closeModal);
  refs.modalBackdrop.removeEventListener('click', closeModalOnBackdrop);
  window.removeEventListener('keydown', handleKeyDown);
  refs.modalBackdrop.classList.remove('is-open');
  document.body.style.overflow = 'auto';
  const youtubeIframe = document.querySelector('.iframe-video');
  youtubeIframe.src = '';
}

 function closeModalOnBackdrop(event) {
  if (event && event.target === refs.modalBackdrop) {
    refs.modalButtonClose.removeEventListener('click', closeModal);
    refs.modalBackdrop.removeEventListener('click', closeModalOnBackdrop);
    window.removeEventListener('keydown', handleKeyDown);
    refs.modalBackdrop.classList.remove('is-open');
    document.body.style.overflow = 'auto';
    const youtubeIframe = document.querySelector('.iframe-video');
    youtubeIframe.src = '';
  }

} 

