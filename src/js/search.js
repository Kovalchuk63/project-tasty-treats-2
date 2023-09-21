import debounce from 'lodash/debounce';

document.addEventListener('DOMContentLoaded', () => {
  const timeSelect = document.querySelector('.js-time');
  const timeList = document.querySelector('.js-time-list');
  const keyWord = document.querySelector('.inp-search');
  const cardContainer = document.querySelector('.js-card-list');
  const resetButton = document.querySelector('.reset-button');
  const BASE_URL = 'https://tasty-treats-backend.p.goit.global/api';
  const sprite = '../sprite.svg';

  let jsonData;
  let titles = [];

  function generateTimeList() {
    const timeInterval = 5;
    const maxTime = 160;
    const timeOptions = [];

    for (let i = timeInterval; i <= maxTime; i += timeInterval) {
      timeOptions.push(i);
    }

    return timeOptions;
  }

  function createDropdown() {
    const timeOptions = generateTimeList();

    timeOptions.forEach((time) => {
      const option = document.createElement('li');
      option.classList.add('option');

      const button = document.createElement('button');
      button.classList.add('option-item');
      button.textContent = `${time} min`;

      button.addEventListener('click', () => {
        timeSelect.textContent = `${time} min`;
        closeDropdown();
        filterRecipesByTime(time);
      });

      option.appendChild(button);
      timeList.appendChild(option);
    });
  }

  function openDropdown() {
    timeList.classList.add('open');
  }

  function closeDropdown() {
    timeList.classList.remove('open');
  }

  timeSelect.addEventListener('click', () => {
    if (timeList.classList.contains('open')) {
      closeDropdown();
    } else {
      openDropdown();
    }
  });

  createDropdown();

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

  function filterRecipesByTime(selectedTime) {
    const searchInput = keyWord.value.trim().toLowerCase();

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
    const selectedTime = timeSelect.textContent;
    filterRecipesByTime(selectedTime);
  }

  fetchData('recipes');

  keyWord.addEventListener('input', debounce(handleSearchInput, 300));

  resetButton.addEventListener('click', () => {
    keyWord.value = '';
    timeSelect.textContent = 'Select';
    filterRecipesByTime('Select');
  });
});
  
