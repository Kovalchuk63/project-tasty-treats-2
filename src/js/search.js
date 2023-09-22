import debounce from 'lodash/debounce';

document.addEventListener('DOMContentLoaded', () => {
  const timeSelect = document.querySelector('.js-time');
  const keyWord = document.querySelector('.inp-search');
  const cardContainer = document.querySelector('.js-card-list');
  const resetButton = document.querySelector('.reset-button');
  const BASE_URL = 'https://tasty-treats-backend.p.goit.global/api';
  const sprite = '../sprite.svg';

  let jsonData;
  let titles = [];

  async function fetchData(endpoint) {
    const url = `${BASE_URL}/${endpoint}`;

    try {
      const response = await fetch(url);

      if (!response.ok) {
        throw new Error('Network response was not ok');
      }

      jsonData = await response.json();

      jsonData.results.forEach((recipe) => {
        titles.push({ title: recipe.title, id: recipe._id, time: recipe.time });
      });
    } catch (error) {
      console.error('Error:', error);
    }
  }

  function generateCardMarkup({ _id, title, preview, description, rating }) {
    const ratedStars = Math.floor(rating);
    const ratedStarsArray = Array.from({ length: ratedStars }, () =>
      `<svg class="svg-star rated"><use href="${sprite}#icon-Star"></use></svg>`
    ).join('');
    const notRatedStarsArray = Array.from({ length: 5 - ratedStars }, () =>
      `<svg class="svg-star"><use href="${sprite}#icon-Star"></use></svg>`
    ).join('');

    const isFavorite = false;

    return `
      <li class="card-item" data-id="${_id}">
        <svg class="card-svg-heart ${
          isFavorite ? 'card-svg-heart-checked' : 'js-card-svg-heart'
        }" width="22px" height="22px">
          <use href="${sprite}#icon-heart"></use>
        </svg>
        <div class="image-gradient">
          <img class="card-img" src="${preview}" alt="${title}" />
        </div>
        <div class="card-text">
          <h2 class="card-dish-name">${title}</h2>
          <p class="card-dish-descr">${description}</p>
        </div>
        <div class="rating-btn-container">
          <p class="rating-number">${rating}</p>
          <div class="rating-container">
            ${ratedStarsArray}${notRatedStarsArray}
          </div>
          <button type="button" class="recipe-btn" data-id="${_id}">See recipe</button>
        </div>
      </li>`;
  }

  function filterRecipes(searchInput) {
    const selectedTime = timeSelect.value;
    searchInput = searchInput.trim().toLowerCase();

    let matchingRecipes = titles;

    if (selectedTime !== 'Select') {
      matchingRecipes = matchingRecipes.filter(({ title, time }) => {
        return (
          title.toLowerCase().includes(searchInput) &&
          parseInt(time, 10) <= parseInt(selectedTime, 10)
        );
      });
    } else {
      matchingRecipes = matchingRecipes.filter(({ title }) =>
        title.toLowerCase().includes(searchInput)
      );
    }

    const cardMarkup = matchingRecipes
      .map(({ id }) =>
        generateCardMarkup(jsonData.results.find((recipe) => recipe._id === id))
      );

    cardContainer.innerHTML = cardMarkup.join('');
  }

  function handleSearchInput() {
    filterRecipes(keyWord.value);
  }

  fetchData('recipes');

  keyWord.addEventListener('input', debounce(handleSearchInput, 300));

  resetButton.addEventListener('click', () => {
    keyWord.value = '';
    timeSelect.value = 'Select';
    filterRecipes('');
  });

  // Dynamically generate time options for the select element
  const timeSelectElement = document.querySelector('.js-time');

  function generateTimeOptions() {
    const timeInterval = 5;
    const maxTime = 160;

    for (let i = timeInterval; i <= maxTime; i += timeInterval) {
      const option = document.createElement('option');
      option.value = i;
      option.textContent = `${i} min`;
      timeSelectElement.appendChild(option);
    }
  }

  generateTimeOptions();
});
