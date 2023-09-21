import{c as g,s as r}from"./common-56c17b8a.js";const t={preview:"../img/no-image-icon-23485.png",title:"no title",description:"no description",rating:"xx"},v=document.querySelector(".all-favorite-cards-use");console.log(v);const u=document.querySelector(".hero-favourites");console.log(u);const h=JSON.parse(localStorage.getItem(g.LS_DISHES_KEY))??[];function m(e){if(console.log(e),h.length===0)u.classList.add("hero-img-inactive");else return e.map(({preview:c,title:s,description:n,rating:i,_id:a})=>{const o=S(i),d=Array.from({length:o},()=>`<svg class="svg-star rated">
          <use href="${r}#icon-Star"></use>
        </svg>`).join(""),l=Array.from({length:5-o},()=>`<svg class="svg-star">
          <use href="${r}#icon-Star"></use>
        </svg>`).join("");return(JSON.parse(localStorage.getItem(g.LS_DISHES_KEY))??[]).find(({_id:p})=>p===a)?`<li class="card-item" data-id=${a}>
          <svg class="card-svg-heart-checked js-card-svg-heart" width="22px" height="22px">
        <use href="${r}#icon-heart"></use>
      </svg>
      <div class="image-gradient">
      <img class="card-img" src="${c||t.preview}" alt="${s||t.title}"/>
      </div>
      <div class="card-text">
      <h2 class="card-dish-name">${s||t.title}</h2>
      <p class="card-dish-descr">${n||t.description}</p>
      </div>
      <div class="rating-btn-container">
        
          <p class="rating-number">${i}</p>
          <div class="rating-container">
          ${d}${l}
        </div>
        <button type="button" class="recipe-btn">See recipe</button>
      </div>
    </li>`:`<li class="card-item" data-id=${a}>
          <svg class="card-svg-heart js-card-svg-heart" width="22px" height="22px">
        <use href="${r}#icon-heart"></use>
      </svg>
      <div class="image-gradient">
      <img class="card-img" src="${c||t.preview}" alt="${s||t.title}"/>
      </div>
      <div class="card-text">
      <h2 class="card-dish-name">${s||t.title}</h2>
      <p class="card-dish-descr">${n||t.description}</p>
      </div>
      <div class="rating-btn-container">
        
          <p class="rating-number">${i}</p>
          <div class="rating-container">
          ${d}${l}
        </div>
        <button type="button" class="recipe-btn" data="${a}">See recipe</button>
      </div>
    </li>`}).join("")}v.insertAdjacentHTML("beforeend",m(h));function S(e){return Math.floor(e/2)}
