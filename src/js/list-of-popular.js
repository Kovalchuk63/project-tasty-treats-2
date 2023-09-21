
const BASE_URL = 'https://tasty-treats-backend.p.goit.global/api/recipes';

const popularRecipe = document.querySelector('.js-popular-recipes');
const popular = document.querySelector('.img-dish');

/*=================BACK-END===========================*/
serviceRecype()
    .then((data) => {
        popularRecipe.insertAdjacentHTML('beforeend', createMarkupCard(data));

    })
    .catch(err => console.log(err))

    async function serviceRecype() {
        const URL =  'https://tasty-treats-backend.p.goit.global/api/recipes/popular';
        const resp = await fetch(`${URL}`);
        // if (!resp.ok) {
        //     throw new Error(resp.statusText);
        //   }
        return await resp.json();
    }

/*=================SHOW-CARD===========================*/


function createMarkupCard(arr) {
    return arr.map(({ _id, preview, title, description }) => {
        return `<li key="${_id}" class="popular-recipe-item ">            
        <img class="img-dish" src="${preview}" alt="${title}"> 
        <div class ="div-popular-list">
        <h3 class="name-dish">${title.toUpperCase()}</h3>
        <p class="description-dish">${description}</p>
        </div>
         </li>`;
              }).join('')}
 createMarkupCard();
