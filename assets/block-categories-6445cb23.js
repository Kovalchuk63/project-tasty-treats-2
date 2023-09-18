(function(){const r=document.createElement("link").relList;if(r&&r.supports&&r.supports("modulepreload"))return;for(const e of document.querySelectorAll('link[rel="modulepreload"]'))o(e);new MutationObserver(e=>{for(const s of e)if(s.type==="childList")for(const a of s.addedNodes)a.tagName==="LINK"&&a.rel==="modulepreload"&&o(a)}).observe(document,{childList:!0,subtree:!0});function n(e){const s={};return e.integrity&&(s.integrity=e.integrity),e.referrerpolicy&&(s.referrerPolicy=e.referrerpolicy),e.crossorigin==="use-credentials"?s.credentials="include":e.crossorigin==="anonymous"?s.credentials="omit":s.credentials="same-origin",s}function o(e){if(e.ep)return;e.ep=!0;const s=n(e);fetch(e.href,s)}})();const c={allCategoriesBtn:document.querySelector(".js-all-categories-btn"),categoriesBtnList:document.querySelector(".js-categories-btn-card"),listCardRecipes:document.querySelector(".js-card-list")},i={preview:"../img/no-image-icon-23485.png",title:"no title",description:"no description",rating:"xx"};c.categoriesBtnList.addEventListener("click",p);u().then(t=>c.categoriesBtnList.insertAdjacentHTML("beforeend",g(t))).catch(t=>console.log(t));async function u(){const n=await fetch("https://tasty-treats-backend.p.goit.global/api/categories");if(!n.ok)throw new Error(n.statusText);return n.json()}function g(t){return t.map(({_id:r,name:n})=>`<button class="categories-btn" data-id="${r}">${n}</button>`).join("")}function p(t){c.allCategoriesBtn.classList.remove("all-categories-btn-active"),f(t.target.textContent).then(r=>c.listCardRecipes.innerHTML=h(r.results)).catch(r=>console.log(r))}async function f(t){const r="https://tasty-treats-backend.p.goit.global/api",n="/recipes",o=new URLSearchParams({limit:9,category:t}),e=await fetch(`${r}${n}?${o}`);if(!e.ok)throw new Error(e.statusText);return e.json()}function h(t){return t.map(({preview:n,title:o,description:e,rating:s})=>{const a=m(s),l=Array.from({length:a},()=>`<svg class="svg-star rated">
     <use href="../sprite.svg#icon-Star"></use>
    </svg>`).join(""),d=Array.from({length:5-a},()=>`<svg class="svg-star">
     <use href="../sprite.svg#icon-Star"></use>
    </svg>`).join("");return`<li class="card-item">
     <svg class="card-svg-heart" width="22px" height="22px">
    <use href="../sprite.svg#icon-heart"></use>
   </svg>
   <div class="image-gradient">
   <img class="card-img" src="${n||i.preview}" alt="${o||i.title}"/>
   </div>
   <div class="card-text">
   <h2 class="card-dish-name">${o||i.title}</h2>
   <p class="card-dish-descr">${e||i.description}</p>
   </div>
   <div class="rating-btn-container">
    
     <p class="rating-number">${s}</p>
     <div class="rating-container">
     ${l}${d}
    </div>
    <button type="button" class="recipe-btn">See recipe</button>
   </div>
  </li>`}).join("")}function m(t){return Math.floor(t/2)}
