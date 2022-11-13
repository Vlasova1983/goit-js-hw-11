import './css/styles.css';
import SimpleLightbox from "simplelightbox";
import "simplelightbox/dist/simple-lightbox.min.css";
import Notiflix from 'notiflix';


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
  btnLoadMore.classList.remove('clear');
}

function onGalleryClick(evt) {
  evt.preventDefault();
}

function fetchImages(name){    
    axios.get('/user?ID=12345')
    .then(response=>{
      return response.json();
    })
    .then(image=>{
        if (image.length===0){            
          Notiflix.Notify.info('Sorry, there are no images matching your search query. Please try again.');
        } 
        else { // largeImageURL - ссылка на большое изображение.            
            gallery.innerHTML = image.map(item=>
                `<div class="photo-card">
                <img src="${webformatURL}" alt="${tags}" loading="lazy" />
                <div class="info">
                  <p class="info-item">
                    <b>Likes</b>${likes}
                  </p>
                  <p class="info-item">${views}
                    <b>Views</b>
                  </p>
                  <p class="info-item">
                    <b>Comments</b>${comments}
                  </p>
                  <p class="info-item">
                    <b>Downloads</b>${downloads}
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

