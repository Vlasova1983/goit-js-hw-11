import './css/styles.css';
import Notiflix from 'notiflix';
import SimpleLightbox from 'simplelightbox';
import 'simplelightbox/dist/simple-lightbox.min.css';



const axios = require('axios');
const lightbox = new SimpleLightbox('.gallery a', {
  captionsData: 'alt',
  captionDelay: 250,
});
const btnLoadMore = document.querySelector('.load-more');
const btnSearch = document.querySelector('[type="submit"]');
const input = document.querySelector('[name = "searchQuery"]');
const gallery = document.querySelector('.gallery');

btnLoadMore.classList.add('clear');

btnSearch.addEventListener('click', onClickBtnSearch);
gallery.addEventListener('click', onGalleryClick);

function onClickBtnSearch(evt) {
  evt.preventDefault();
  fetchImages(input.value.trim());
 
}

function onGalleryClick(evt) {
  evt.preventDefault();
}

function fetchImages(name){    
  fetch(`https://pixabay.com/api/?key=31294159-be9d27b57dbd5b4db758a00af&q=${name}&image_type=photo&orientation=horizontal&safesearch=true`)
  .then(response=>{
    return response.json();
    })
  .then(image=>{
    if (image.hits.length === 0){  
      Notiflix.Notify.failure('Sorry, there are no images matching your search query. Please try again.');
    } 
    else { // largeImageURL - ссылка на большое изображение.  
      btnLoadMore.classList.remove('clear');          
      gallery.innerHTML = image.hits.map(item=>
        `<div class="photo-card">
          <img src="${item.webformatURL}" alt="${item.tags}" loading = "lazy" width=120/>
            <div class="info">
              <p class="info-item">
                <b>Likes</b>${item.likes}
              </p>
              <p class="info-item">
                <b>Views</b>${item.views}
              </p>
              <p class="info-item">
                <b>Comments</b>${item.comments}
              </p>
              <p class="info-item">
                <b>Downloads</b>${item.downloads}
              </p>
            </div>
        </div> `) 
      .join('');                   
    }         
  })
  .catch(error=>{
     Notiflix.Notify.failure('Sorry, there are no images matching your search query. Please try again.');
  })
} 







// Notiflix.Notify.info('We're sorry, but you've reached the end of search results.');



// refresh()



// const { height: cardHeight } = document
//   .querySelector(".gallery")
//   .firstElementChild.getBoundingClientRect();

// window.scrollBy({
//   top: cardHeight * 2,
//   behavior: "smooth",
// });

