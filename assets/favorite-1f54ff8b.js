import{c as d,s as p}from"./common-f73bb993.js";const u={preview:"../img/no-image-icon-23485.png",title:"no title",description:"no description",rating:"xx"},S=document.querySelector(".js-all-favourite-cards"),g=document.querySelector(".hero-favourites"),r=document.querySelector(".failure-block"),n=JSON.parse(localStorage.getItem(d.LS_DISHES_KEY))??[];A();let h=[];const b=document.querySelector(".js-all-favourites-btn"),f=document.querySelector(".card-favor-btn");n.length>0&&b.insertAdjacentHTML("afterbegin",y());function y(){return' <button class="btn-favor js-btn-favor">All categories</button>'}const L=document.querySelector(".js-btn-favor");f.insertAdjacentHTML("beforeend",j(n));function j(e){return e.map(({category:t})=>t).filter((t,s,i)=>i.indexOf(t)===s).map(t=>(h.push(t),`<button class="btn-favor js-btns-favor" name="${t.toLowerCase()}">${t}</button>`)).join("")}f.addEventListener("click",$);function $(e){const a=e.target.textContent,t=n.filter(({category:s})=>s===a);S.innerHTML=m(t),f.innerHTML=`<button class="btn-favor js-btns-favor" name="${a.toLowerCase()}">${a}</button>`}L.addEventListener("click",k);function k(){S.innerHTML=m(n),f.innerHTML=F(h)}function F(e){return e.map(a=>`<button class="btn-favor js-btns-favor" name="${a.toLowerCase()}">${a}</button>`).join("")}function m(e){if(e.length===0)g.classList.add("hero-img-inactive"),r.style.paddingTop="283px",r.style.paddingBottom="329px",r.classList.remove("failure-block-hidden");else return r.classList.add("failure-block-hidden"),g.classList.remove("hero-img-inactive"),e.map(({preview:a,title:t,description:s,rating:i,_id:c})=>{const l=B(i),v=Array.from({length:l},()=>`<svg class="svg-star rated">
              <use href="${p}#icon-Star"></use>
            </svg>`).join(""),o=Array.from({length:5-l},()=>`<svg class="svg-star">
              <use href="${p}#icon-Star"></use>
            </svg>`).join("");return`<li class="card-item-fav" data-id=${c}>
          <svg class="card-svg-heart-checked js-card-svg-heart" width="22px" height="22px">
            <use href="${p}#icon-heart"></use>
          </svg>
          <div class="image-gradient">
            <img class="card-img-fav" src="${a||u.preview}" alt="${t||u.title}"/>
          </div>
          <div class="card-text-fav">
            <h2 class="card-dish-name">${t||u.title}</h2>
            <p class="card-dish-descr-fav">${s||u.description}</p>
          </div>
          <div class="rating-btn-container-fav">
            <p class="rating-number">${i}</p>
            <div class="rating-container">
              ${v}${o}
            </div>
            <button type="button" class="recipe-btn" data="${c}">See recipe</button>
          </div>
        </li>`}).join("")}S.insertAdjacentHTML("beforeend",m(n));m(n);function B(e){return Math.floor(e/2)}const E=document.querySelectorAll(".js-card-svg-heart");E.forEach(e=>{e.addEventListener("click",x)});function x(e){const a=e.target.closest(".js-card-svg-heart");if(!a)return;const t=a.closest(".card-item-fav"),s=t.dataset.id,c=(JSON.parse(localStorage.getItem(d.LS_DISHES_KEY))??[]).find(({_id:o})=>o===s),l=document.getElementsByName(`${c.category.toLowerCase()}`),v=n.findIndex(({_id:o})=>o===s);v!==-1&&n.splice(v,1),n.length===0&&(b.style.display="none",g.classList.add("hero-img-inactive"),r.classList.remove("failure-block-hidden"),r.style.paddingTop="283px",r.style.paddingBottom="329px"),localStorage.setItem(d.LS_DISHES_KEY,JSON.stringify(n)),(JSON.parse(localStorage.getItem(d.LS_DISHES_KEY))??[]).length===0&&L.classList.add("btn-favor-hidden"),(JSON.parse(localStorage.getItem(d.LS_DISHES_KEY))??[]).find(({category:o})=>o===c.category)||l[0].classList.add("btn-favor-hidden"),t.remove()}function A(){g.classList.add("hero-img-inactive"),r.style.paddingTop="283px",r.style.paddingBottom="329px",r.classList.remove("failure-block-hidden")}
