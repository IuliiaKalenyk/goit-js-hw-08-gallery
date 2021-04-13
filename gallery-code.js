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
function onOpenModal(evt) {
    if (evt.target.nodeName !== IMG) {
        return;
    }
    console.log(evt.target.textContent);
}

const refs = {
    lightbox: document.querySelector('.lightbox'),
    closeModalBtn: document.querySelector('[data-action="close-lightbox"]'),
    overlay: document.querySelector('.lightbox__overlay'),
    content: document.querySelector('.lightbox__content'),
    image: document.querySelector('.lightbox__image'),
}


refs.closeModalBtn.addEventListener('click', onCloseModal);
refs.overlay.addEventListener('click', onCloseOverlay);

function onCloseModal() {
    refs.closeModalBtn.classList.remove('is-open');
}

function onCloseOverlay(event) {
    if (event.currentTarget === event.target) {
        onCloseModal();
    }
}
