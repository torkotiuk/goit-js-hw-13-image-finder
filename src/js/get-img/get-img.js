import '../../css/styles.css';
import notify from '../components/notify';
import LoadMoreBtn from '../components/load-more-btn';
import API from '../api/get-image-api';
import galleryTemplate from '../../template/gallery-template.hbs';

const refs = {
  searchForm: document.querySelector('.search-form'),
  galleryContainer: document.querySelector('.gallery'),
};

const api = new API();

const loadMoreBtn = new LoadMoreBtn({
  selector: '[data-action="load-more"]',
  hidden: true,
});

function onSearch(e) {
  e.preventDefault();

  const searchQuery = e.currentTarget.elements.query.value.trim();

  if (searchQuery === '') {
    notify.catchSpace();
    refs.galleryContainer.innerHTML = '';
    return;
  }

  api.query = searchQuery;

  loadMoreBtn.show();
  loadMoreBtn.disable();

  api.resetPage();

  api.fetchImages().then(images => {
    if (images.length === 0) {
      notify.isNotCorrectQuery();
      loadMoreBtn.hide();
      return;
    }

    cleargalleryContainer();
    appendArticlesMarkup(images);
    loadMoreBtn.enable();
  });
}

function appendArticlesMarkup(images) {
  refs.galleryContainer.insertAdjacentHTML(
    'beforeend',
    galleryTemplate(images),
  );
}

function cleargalleryContainer() {
  refs.galleryContainer.innerHTML = '';
}

async function onLoadMore() {
  loadMoreBtn.disable();
  await api.fetchImages().then(images => {
    appendArticlesMarkup(images);
    loadMoreBtn.enable();
  });
  scrollBy();
}

function scrollBy() {
  window.scrollBy({
    top: screen.height - 300,
    behavior: 'smooth',
  });
}

loadMoreBtn.refs.button.addEventListener('click', onLoadMore);
refs.searchForm.addEventListener('submit', onSearch);
