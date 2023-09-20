const BASE_URL = 'https://tasty-treats-backend.p.goit.global/api/recipes';

async function fetchCook(recipeId) {
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
  modal: document.querySelector('.backdrop'),
  popular: document.querySelector('.popular-recipe-item'),
  modalCardCont: document.querySelector('.card-markup-modal'),
  modalBackdrop: document.querySelector('.modal-backdrop'),
  modalCloseButton: document.querySelector('.modal-button-close'),
  giveRatingModalBtn: document.querySelector('.modal-give-rating'),
  addToFavorite: document.querySelector('.modal-add-favorite'),
  recipeBtn: document.querySelector('.recipe-btn'),
};

refs.popular.addEventListener('click', handleRecipeClick);

async function handleRecipeClick(event) {
  if (!event.target.closest('.popular-recipe-item')) {
    return;
  }

  const clickedRecipe = event.target.closest('.popular-recipe-item');
  const recipeId = clickedRecipe.getAttribute('key');

  await openRecipeModal(recipeId);
}

refs.recipeBtn.addEventListener('click', handleRecipeButtonClick);

async function handleRecipeButtonClick(event) {
  if (!event.target.closest('.card-item')) {
    return;
  }

  const clickedRecipe = event.target.closest('.card-item');
  const recipeId = clickedRecipe.getAttribute('data-id');

  await openRecipeModal(recipeId);
}

async function openRecipeModal(recipeId) {
  try {
    const data = await fetchCook(recipeId);

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

    const youtubeLink = data.youtube;

    function getYoutubeVideoId(url) {
      const videoIdMatch = url.match(/v=([^&]+)/);
      return videoIdMatch ? videoIdMatch[1] : '';
    }

    const videoId = getYoutubeVideoId(youtubeLink);

    const embedUrl = `https://www.youtube.com/embed/${videoId}`;
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
            <div class="starts-modal "></div>
            <p class="modal-card-time">${data.time} min</p>
          </div>
          <ul class="modal-ingr-list">${ingredientsMarkup}</ul>
          <ul class="hashtag-btn-list-tablet list">${tagsMarkup}</ul>
          <p class="modal-recipe-instructions">${data.instructions}</p>
        </div>
    `;

    refs.modalCardCont.innerHTML = modalCardMarkup;

    refs.modal.style.display = 'block';

    refs.modalCloseButton.addEventListener('click', closeModal);

    refs.modalBackdrop.addEventListener('click', closeModalOnBackdrop);
    refs.giveRatingModalBtn.addEventListener('click', openRatingModal);
    window.addEventListener('keydown', handleKeyDown);
    refs.modalBackdrop.classList.add('is-open');
    document.body.style.overflow = 'hidden';
  } catch (error) {
    console.error(error);
  }
}

function closeModal() {
  refs.modalCloseButton.removeEventListener('click', closeModal);
  refs.modalBackdrop.removeEventListener('click', closeModalOnBackdrop);
  window.removeEventListener('keydown', handleKeyDown);
  refs.modalBackdrop.classList.remove('is-open');
  document.body.style.overflow = 'auto';
  const youtubeIframe = document.querySelector('.iframe-video');
  youtubeIframe.src = '';
}

function handleKeyDown(event) {
  if (event.key === 'Escape') {
    closeModal();
  }
}

function closeModalOnBackdrop(event) {
  if (event && event.target === refs.modalBackdrop) {
    refs.modalCloseButton.removeEventListener('click', closeModal);
    refs.modalBackdrop.removeEventListener('click', closeModalOnBackdrop);
    window.removeEventListener('keydown', handleKeyDown);
    refs.modalBackdrop.classList.remove('is-open');
    document.body.style.overflow = 'auto';
    const youtubeIframe = document.querySelector('.iframe-video');
    youtubeIframe.src = '';
  }
}
