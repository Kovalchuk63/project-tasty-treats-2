import{c as u,s as d}from"./common-c11731ba.js";const n={preview:"../img/no-image-icon-23485.png",title:"no title",description:"no description",rating:"xx"},g=document.querySelector(".js-all-favourite-cards");console.log(g);const l=document.querySelector(".hero-favourites");console.log(l);const t=document.querySelector(".failure-block");console.log(t);const s=JSON.parse(localStorage.getItem(u.LS_DISHES_KEY))??[];console.log(s);function f(e){if(console.log(e),e.length===0)g.innerHTML="",l.classList.add("hero-img-inactive"),t.style.paddingTop="283px",t.style.paddingBottom="329px",t.classList.remove("failure-block-hidden");else return t.classList.add("failure-block-hidden"),l.classList.remove("hero-img-inactive"),e.map(({preview:a,title:r,description:i,rating:o,_id:c})=>{const v=h(o),m=Array.from({length:v},()=>`<svg class="svg-star rated">
              <use href="${d}#icon-Star"></use>
            </svg>`).join(""),p=Array.from({length:5-v},()=>`<svg class="svg-star">
              <use href="${d}#icon-Star"></use>
            </svg>`).join("");return`<li class="card-item-fav" data-id=${c}>
          <svg class="card-svg-heart-checked js-card-svg-heart" width="22px" height="22px">
            <use href="${d}#icon-heart"></use>
          </svg>
          <div class="image-gradient">
            <img class="card-img-fav" src="${a||n.preview}" alt="${r||n.title}"/>
          </div>
          <div class="card-text-fav">
            <h2 class="card-dish-name">${r||n.title}</h2>
            <p class="card-dish-descr-fav">${i||n.description}</p>
          </div>
          <div class="rating-btn-container-fav">
            <p class="rating-number">${o}</p>
            <div class="rating-container">
              ${m}${p}
            </div>
            <button type="button" class="recipe-btn" data="${c}">See recipe</button>
          </div>
        </li>`}).join("")}g.insertAdjacentHTML("beforeend",f(s));f(s);function h(e){return Math.floor(e/2)}const S=document.querySelectorAll(".js-card-svg-heart");S.forEach(e=>{e.addEventListener("click",y)});function y(e){const a=e.target.closest(".js-card-svg-heart");if(!a)return;const r=a.closest(".card-item-fav"),i=r.dataset.id;console.log(i);const o=s.findIndex(({_id:c})=>c===i);o!==-1&&s.splice(o,1),s.length===0&&(l.classList.add("hero-img-inactive"),t.classList.remove("failure-block-hidden"),t.style.paddingTop="283px",t.style.paddingBottom="329px"),localStorage.setItem(u.LS_DISHES_KEY,JSON.stringify(s)),r.remove()}
