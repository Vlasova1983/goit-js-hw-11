import './css/styles.css';
import 'simplelightbox/dist/simple-lightbox.min.css';
import Notiflix from 'notiflix';
import SimpleLightbox from "simplelightbox";
import axios from 'axios'; 

const lightbox = new SimpleLightbox ('.gallery a', {captionDelay: 250});
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
  gallery.innerHTML =''; 
  fetchImages(input.value.trim()); 
  page=1;   
} 

function onLoadMore(evt) {
  evt.preventDefault();
  fetchImages(input.value.trim());
};

function onGalleryClick(evt) {
  evt.preventDefault();  
}
   
async function fetchImages(name){    
  try {
    const response = await axios.get(`https://pixabay.com/api/?key=31294159-be9d27b57dbd5b4db758a00af&q=${name}&image_type=photo&orientation=horizontal&safesearch=true&per_page=4&page=${page}`);
    const image = response.data.hits; 
          
    if (image.length === 0){ 
      gallery.innerHTML =''; 
      btnLoadMore.classList.add('clear');
      Notiflix.Notify.failure('Sorry, there are no images matching your search query. Please try again.');
    }     
    else {       
      if(page===1){
        Notiflix.Notify.info(`Hooray! We found ${response.data.totalHits} images.`);
      }
      btnLoadMore.classList.remove('clear');          
      gallery.insertAdjacentHTML("beforeend", image.map(item=>
        `<div class="photo-card">
          <a class="photo-card__link"  href="${item.largeImageURL}">
            <img  src="${item.webformatURL}" data-source="${item.largeImageURL}" alt="${item.tags}" loading="lazy" width=120/>
          </a>  
          <div class="info">
            <p class="info-item"><b>Likes</b>${item.likes}</p>
            <p class="info-item"><b>Views</b>${item.views}</p>
            <p class="info-item"><b>Comments</b>${item.comments}</p>
            <p class="info-item"><b>Downloads</b>${item.downloads}</p>
          </div>          
        </div> `) 
      .join(''));                          
    }  
    page+=1;
    lightbox. refresh();   
  }
  catch (error) {
    gallery.innerHTML =''; 
    gallery.remove();
    btnLoadMore.classList.add('clear');
    Notiflix.Notify.failure('Sorry, there are no images matching your search query. Please try again.');
  }
}



// startChangeTimeBtn.setAttribute('disabled',true);
// startChangeTimeBtn.removeAttribute('disabled');










