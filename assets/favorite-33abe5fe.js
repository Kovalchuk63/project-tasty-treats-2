import{L as v,s as a,d as s,c as u}from"./all-recipes-7f0de790.js";const i=document.querySelector(".js-all-favourite-cards");console.log(i);const p=JSON.parse(localStorage.getItem(v))??[];function h(t){return console.log(t),t.map(({preview:o,title:r,description:n,rating:e,_id:d})=>{const c=u(e),l=Array.from({length:c},()=>`<svg class="svg-star rated">
           <use href="${a}#icon-Star"></use>
       </svg>`).join(""),g=Array.from({length:5-c},()=>`<svg class="svg-star">
           <use href="${a}#icon-Star"></use>
         </svg>`).join("");return`<li class="card-item" data-id="${d}">
           <svg class="card-svg-heart js-card-svg-heart" width="22px" height="22px">
         <use href="${a}#icon-heart"></use>
       </svg>
       <div class="image-gradient">
       <img class="card-img" src="${o||s.preview}" alt="${r||s.title}"/>
       </div>
       <div class="card-text">
       <h2 class="card-dish-name">${r||s.title}</h2>
       <p class="card-dish-descr">${n||s.description}</p>
       </div>
       <div class="rating-btn-container">

           <p class="rating-number">${e}</p>
           <div class="rating-container">
           ${l}${g}
         </div>
         <button type="button" class="recipe-btn">See recipe</button>
       </div>
     </li>`}).join("")}i.insertAdjacentHTML("beforeend",h(p));
