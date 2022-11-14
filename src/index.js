import './css/styles.css';
import Notiflix from 'notiflix';
import SimpleLightbox from "simplelightbox";
import 'simplelightbox/dist/simple-lightbox.min.css';

const axios = require('axios').default;
const btnLoadMore = document.querySelector('.load-more');
const btnSubmit = document.querySelector('.search-form');
const input = document.querySelector('[name = "searchQuery"]');
const gallery = document.querySelector('.gallery');
let page=1;
btnLoadMore.classList.add('clear');

btnSubmit.addEventListener('submit', onClickBtnSearch);
btnLoadMore.addEventListener('click', onLoadMore);
gallery.addEventListener('click', onGalleryClick);

function onClickBtnSearch(evt) {
  evt.preventDefault();
  if(input.value===''){
    Notiflix.Notify.failure('Sorry, there are no images matching your search query. Please try again.');
    return;
  }  
  fetchImages(input.value.trim()); 
  page=1;   
} 

function onLoadMore() {
  fetchImages(input.value.trim());
};

async function fetchImages(name){    
  try {
    const response = await axios.get(`https://pixabay.com/api/?key=31294159-be9d27b57dbd5b4db758a00af&q=${name}&image_type=photo&orientation=horizontal&safesearch=true&per_page=40&page=${page}`);
    const image = response.data.hits;    
    Notiflix.Notify.info(`Hooray! We found ${response.data.total} images.`);
    if (image.length === 0){ 
      gallery.innerHTML = image.map(item=>``).join('');
      btnLoadMore.classList.add('clear');
    } 
    else { 
      Notiflix.Notify.info(`This is the ${page} page.`);
      btnLoadMore.classList.remove('clear');          
      gallery.innerHTML = image.map(item=>
        `<div class="photo-card">
          <a class="photo-card__link"  href="${item.largeImageURL}">
            <img  src="${item.webformatURL}" data-source="${item.largeImageURL}" alt="${item.tags}" loading = "lazy" width=120/>
          </a>  
          <div class="info">
            <p class="info-item"><b>Likes</b>${item.likes}</p>
            <p class="info-item"><b>Views</b>${item.views}</p>
            <p class="info-item"><b>Comments</b>${item.comments}</p>
            <p class="info-item"><b>Downloads</b>${item.downloads}</p>
          </div>          
        </div> `) 
      .join('');                   
    }  
    page+=1;      
  }
  catch (error) {
    gallery.innerHTML = image.map(item=>``).join(''); 
    gallery.remove();
    btnLoadMore.classList.add('clear');
    Notiflix.Notify.failure('Sorry, there are no images matching your search query. Please try again.');
  }
}

function onGalleryClick(evt) {
  evt.preventDefault();
  const lightbox = new SimpleLightbox ('.gallery a', {captionDelay: 250});
}
   

   










