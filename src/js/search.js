// Отримуємо елементи DOM
document.addEventListener('DOMContentLoaded', () => {
const timeDropdown = document.querySelector('.custom-select');
const timeSelect = document.querySelector('.js-time');
const timeList = document.querySelector('.js-time-list'); // Вибираємо список за його id

// Генеруємо перелік часу
function generateTimeList() {
  const timeInterval = 5;
  const maxTime = 160;

  const timeOptions = [];

  for (let i = timeInterval; i <= maxTime; i += timeInterval) {
    timeOptions.push(i);
  }

  return timeOptions;
}

// Створюємо випадаючий список
function createDropdown() {
  const timeOptions = generateTimeList();

  timeOptions.forEach((time) => {
    const option = document.createElement('li'); // Замість <div> створюємо <li> для списку
    option.classList.add('option');

    const button = document.createElement('button');
    button.classList.add('option-item');

    button.textContent = `${time} min`;

    button.addEventListener('click', () => {
      // Обробник події для вибору часу
      timeSelect.textContent = `${time} min`;
      closeDropdown();
    });

    option.appendChild(button);
    timeList.appendChild(option);
  });
}

// Відкриваємо випадаючий список
function openDropdown() {
  timeList.classList.add('open');
}

// Закриваємо випадаючий список
function closeDropdown() {
  timeList.classList.remove('open');
}

// Додаємо обробник подій для відкриття/закриття списку
timeSelect.addEventListener('click', () => {
  console.log('Click event triggered');
  if (timeList.classList.contains('open')) {
    closeDropdown();
  } else {
    openDropdown();
  }
});

// Викликаємо функцію для створення випадаючого списку
createDropdown();
});
