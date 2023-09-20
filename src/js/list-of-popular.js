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
    return `${arr.map(({ id, preview, title, description }) => {
        return `<li key="${id}" class="popular-recipe-item">            
        <img class="img-dish" src="${preview}" alt="${title}"> 
        <div class ="div-popular-list">
        <h3 class="name-dish">${title.toUpperCase()}</h2>
        <p class="description-dish">${description}</p>
        </div>
         </li>`;
              }).join('')}
            `;
            popular.addEventListener('click', handleRecipeClick);

async function handleRecipeClick(event) {
  if (!event.target.closest('#popular-recipes')) {
    return;
  }

  const clickedRecipe = event.target.closest('#popular-recipes');
  if (!clickedRecipe) return;

  const recipeId = clickedRecipe.dataset.id;
  const dataRecipe = await fetchCook(`${BASE_URL}/${recipeId}`);
  refs.modalCardCont.innerHTML = createMarkupModal(dataRecipe);
  refs.addToFavorite.id = recipeId;

  openModal();
}
 }  


//  popular.addEventListener('click', handleRecipeClick);

//  async function handleRecipeClick(cardId) {
//     try {
//       popularRecipe.classList.toggle('img-dish');
  
//       const data = await getResipesById(cardId);
//       popularRecipe.innerHTML = modalRecipeCard(data);
//       modalRecipeAddStars(data._id, data.rating);
  
//       dataId = data._id;
  
//       modalRecipeListeners();
//     } catch (error) {
//    console.log(error);
//     }
//   }
