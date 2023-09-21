import { fetchCook } from './API/swiper-events.js';
import Swiper from 'swiper/bundle';
import 'swiper/css';
import 'swiper/css/navigation';
import 'swiper/css/pagination';

const sliderWrapper = document.querySelector('.swiper-wrapper');

fetchCook()
  .then(data => {
    if (data.length === 0) {
      return;
    }
    sliderWrapper.insertAdjacentHTML('beforeend', render(data));

    /*const CookSlider = new Swiper('.swiper-hero', {*/
    const CookSlider = new Swiper('.swiper', {
      direction: 'horizontal',
      loop: true,
      slidesPerView: 0.7,
      spaceBetween: 40,
      pagination: {
        el: '.swiper-pagination',
        clickable: true,
      },
      autoplay: {
        delay: 4000,
      },
    });
  })
  .catch(error => {
    console.log(error);
  });

function render(arr) {
  return arr
    .map(
      ({ cook, topic }) => `
                      <div class="swiper-slide">
                              <div class="cook-item">
                                  <picture>
                                      <source srcset="${cook.imgWebpUrl}" type="image/webp" />
                                      <img class="cook-item-pic" src="${cook.imgUrl}" alt="${cook.name}" loading="lazy" />
                                  </picture>
                              </div>
                              <div class="dish-item">
                                      <picture>
                                          <source srcset="${topic.previewWebpUrl}" type="image/webp" />
                                          <img class="dish-item-pic" src="${topic.previewUrl}" alt="${topic.name}" loading="lazy" />
                                      </picture>
                                      <p class="dish-item-title">${topic.name}</p>
                                      <p class="dish-item-sub">${topic.area}</p>
                              </div>
                              <div class="food-item">
                                  <picture>
                                      <source srcset="${topic.imgWebpUrl}" type="image/webp" />
                                      <img class="food-item-pic" src="${topic.imgUrl}" alt="${topic.name}" loading="lazy" />
                                  </picture>
                              </div>
                          </div>`
    )
    .join('');
}
