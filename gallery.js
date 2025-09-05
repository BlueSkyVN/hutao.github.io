const galleryEl = document.getElementById('gallery');

// Danh sách ảnh tĩnh (đặt file trong thư mục images/)
const images = [
  { name: 'hutao1.jpg', url: 'images/hutao1.jpg' },
  { name: 'hutao2.jpg', url: 'images/hutao2.jpg' },
  { name: 'hutao3.jpg', url: 'images/hutao3.jpg' }
];

function renderGallery(images) {
  galleryEl.innerHTML = '';
  images.forEach(img => {
    const div = document.createElement('div');
    div.className = 'thumb';
    const el = document.createElement('img');
    el.src = img.url;
    el.alt = img.name;
    el.loading = 'lazy';
    el.addEventListener('click', () => openLightbox(img.url));
    div.appendChild(el);
    galleryEl.appendChild(div);
  });
}

const lightbox = document.getElementById('lightbox');
const lightboxImg = document.getElementById('lightbox-img');

function openLightbox(url) {
  lightboxImg.src = url;
  lightbox.classList.add('open');
}
function closeLightbox() {
  lightbox.classList.remove('open');
  lightboxImg.src = '';
}
lightbox.addEventListener('click', (e) => {
  if (e.target === lightbox || e.target === lightboxImg) closeLightbox();
});
document.addEventListener('keydown', (e) => {
  if (e.key === 'Escape') closeLightbox();
});

window.addEventListener('DOMContentLoaded', () => renderGallery(images));
