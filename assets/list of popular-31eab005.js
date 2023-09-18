(function(){const s=document.createElement("link").relList;if(s&&s.supports&&s.supports("modulepreload"))return;for(const t of document.querySelectorAll('link[rel="modulepreload"]'))a(t);new MutationObserver(t=>{for(const r of t)if(r.type==="childList")for(const o of r.addedNodes)o.tagName==="LINK"&&o.rel==="modulepreload"&&a(o)}).observe(document,{childList:!0,subtree:!0});function n(t){const r={};return t.integrity&&(r.integrity=t.integrity),t.referrerpolicy&&(r.referrerPolicy=t.referrerpolicy),t.crossorigin==="use-credentials"?r.credentials="include":t.crossorigin==="anonymous"?r.credentials="omit":r.credentials="same-origin",r}function a(t){if(t.ep)return;t.ep=!0;const r=n(t);fetch(t.href,r)}})();const c={allCategoriesBtn:document.querySelector(".js-all-categories-btn"),categoriesBtnList:document.querySelector(".js-categories-btn-card"),listCardRecipes:document.querySelector(".js-card-list")},i={preview:"../img/no-image-icon-23485.png",title:"no title",description:"no description",rating:"xx"};c.categoriesBtnList.addEventListener("click",g);u().then(e=>c.categoriesBtnList.insertAdjacentHTML("beforeend",p(e))).catch(e=>console.log(e));async function u(){const n=await fetch("https://tasty-treats-backend.p.goit.global/api/categories");if(!n.ok)throw new Error(n.statusText);return n.json()}function p(e){return e.map(({_id:s,name:n})=>`<button class="categories-btn" data-id="${s}">${n}</button>`).join("")}function g(e){c.allCategoriesBtn.classList.remove("all-categories-btn-active"),f(e.target.textContent).then(s=>c.listCardRecipes.innerHTML=h(s.results)).catch(s=>console.log(s))}async function f(e){const s="https://tasty-treats-backend.p.goit.global/api",n="/recipes",a=new URLSearchParams({limit:9,category:e}),t=await fetch(`${s}${n}?${a}`);if(!t.ok)throw new Error(t.statusText);return t.json()}function h(e){return e.map(({preview:n,title:a,description:t,rating:r})=>{const o=m(r),l=Array.from({length:o},()=>`<svg class="svg-star rated">
     <use href="../sprite.svg#icon-Star"></use>
    </svg>`).join(""),d=Array.from({length:5-o},()=>`<svg class="svg-star">
     <use href="../sprite.svg#icon-Star"></use>
    </svg>`).join("");return`<li class="card-item">
     <svg class="card-svg-heart" width="22px" height="22px">
    <use href="../sprite.svg#icon-heart"></use>
   </svg>
   <div class="image-gradient">
   <img class="card-img" src="${n||i.preview}" alt="${a||i.title}"/>
   </div>
   <div class="card-text">
   <h2 class="card-dish-name">${a||i.title}</h2>
   <p class="card-dish-descr">${t||i.description}</p>
   </div>
   <div class="rating-btn-container">
    
     <p class="rating-number">${r}</p>
     <div class="rating-container">
     ${l}${d}
    </div>
    <button type="button" class="recipe-btn">See recipe</button>
   </div>
  </li>`}).join("")}function m(e){return Math.floor(e/2)}const v=document.querySelector(".js-popular-recipes");y().then(e=>{console.log(e),v.insertAdjacentHTML("beforeend",b(e))}).catch(e=>console.log(e));async function y(){return await(await fetch("https://tasty-treats-backend.p.goit.global/api/recipes/popular")).json()}function b(e){return`${e.map(({id:s,preview:n,title:a,description:t})=>`<li key="${s}" class="popular-recipe-item">            
        <img class="img-dish" src="${n}" alt="${a}"> 
        <div class ="div-popular-list">
        <h3 class="name-dish">${a.toUpperCase()}</h2>
        <p class="description-dish">${t}</p>
        </div>
         </li>`).join("")}
            `}
