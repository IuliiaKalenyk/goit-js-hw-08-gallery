import galleryItems from '/gallery-items.js';
console.log(galleryItems)
const navEl = document.querySelector('.js-gallery');
console.log(navEl);
const gallery = ({ preview, original, description }) => {
  return `<li class="gallery__item">
  <a
    class="gallery__link"
    href="${original}"
  >
    <img
      loading = "lazy"
      class="gallery__image"
      src="${preview}"
      data-source="${original}"
      alt="${description}"
      width = "510"
      height = "340"
    />
  </a>
</li>`;
};

const makeGalleryMarkupRows = galleryItems.map(gallery).join('');
navEl.insertAdjacentHTML('afterbegin', makeGalleryMarkupRows);
console.log(gallery(galleryItems[0]));

navEl.addEventListener('click', onOpenModal);

const refs = {
    lightbox: document.querySelector('.js-lightbox'),
    closeModalBtn: document.querySelector('[data-action="close-lightbox"]'),
    overlay: document.querySelector('.lightbox__overlay'),
    content: document.querySelector('.lightbox__content'),
    image: document.querySelector('.lightbox__image'),
}
console.log(refs.image);

refs.closeModalBtn.addEventListener('click', onCloseModal);
refs.overlay.addEventListener('click', onCloseOverlay);

function onOpenModal(evt) {
    evt.preventDefault();
    if (evt.target.nodeName === "IMG") {
        refs.lightbox.classList.add("is-open");
        refs.image.src = evt.target.dataset.source;
        refs.image.alt = evt.target.alt;
        refs.closeModalBtn.addEventListener("click", onCloseModal);
        refs.lightbox.addEventListener("click", onlightboxImg);
        refs.overlay.addEventListener("click", onCloseOverlay);
    }
};


function onCloseModal() {
    refs.lightbox.classList.remove('is-open');
    refs.image.src = '';
    refs.image.alt = '';
    /* refs.closeModalBtn.remove("click", onCloseModal);
    refs.lightbox.remove("click", onlightboxImg);
    refs.overlay.remove("click", onCloseOverlay); */
};

function onCloseOverlay(event) {
    if (event.currentTarget === event.target) {
        onCloseModal();
    }
};
function onlightboxImg(event) {
    if (event.target.nodeName !== "IMG") {
        onCloseModal();
    }
};
const lazyImages = document.querySelectorAll('img[loading = "lazy"]');

lazyImages.forEach(image => {
    image.addEventListener('load', onImageLoaded);
});

function onImageLoaded(evt) {
    console.log('Картинка загрузилась');
};