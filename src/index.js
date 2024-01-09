import axios from "axios";
import CatAPI from './api-service/cat-api';

axios.defaults.headers.common["x-api-key"] = "live_Pj9l3Xbtxun57d3fXtdNKZcmWBp9PSixH6kVWEFLjvzCGdM31yODBEVEVo3rynN7";

const ref = {
    selectCat: document.querySelector('.breed-select'),
    catInfo: document.querySelector('.cat-info'),
    loader: document.querySelector('.loader'),
    error: document.querySelector('.error')
};

ref.selectCat.classList.add('hide-select');
ref.error.classList.add('hide-error');
ref.selectCat.innerHTML = '<option selected="true" disabled="disabled">Choose a cat breed</option>';

const makeMarkupSelectCat = cat => {
    const { id, name } = cat;
    return `<option value="${id}">${name}</option>`
}

CatAPI.fetchBreeds().then(respons =>

{
    const catArr = respons.data;
    const makeMarkupSelect = catArr.map(makeMarkupSelectCat).join('');
    
    ref.selectCat.insertAdjacentHTML("beforeend", makeMarkupSelect);

    ref.selectCat.addEventListener('change', onSelectCat);
    
    ref.selectCat.classList.remove('hide-select');
    ref.loader.classList.add('hide-loader'); 
             
}
).catch(data => {
    ref.selectCat.classList.add('hide-select');
    ref.loader.classList.add('hide-loader');
    ref.catInfo.innerHTML = "";
    ref.error.classList.remove('hide-error');
});

function onSelectCat(evt) {
    const breedId = evt.currentTarget.value;
    CatAPI.fetchCatByBreed(breedId).then(respons => {
          
        ref.loader.classList.remove('hide-loader');
        ref.selectCat.classList.add('hide-select');

        const cat = respons.data[0];

        makeMarkupDescription(cat);
        
        ref.selectCat.classList.remove('hide-select');
            
    }).catch(data => {
    ref.selectCat.classList.add('hide-select');
    ref.catInfo.innerHTML = "";
    ref.error.classList.remove('hide-error');
    }).finally(() => {
    
        ref.loader.classList.add('hide-loader');
        
    });
    
        ref.loader.classList.remove('hide-loader');
        ref.selectCat.classList.add('hide-select');
};

function makeMarkupDescription(cat) {

    const { breeds: [{ name, description, temperament }], url } = cat;
    const markupDescription = `<div class="content-container">
    <div class="title"><h2>${name}</h2></div>
    <div><img src="${url}" alt="${name}" width="300" height="200"></div>
    <div class="description">
      <p>${description}</p>
      <p>Temperament:${temperament}</p>
    </div>
    </div>`

    ref.catInfo.innerHTML = markupDescription;
}


