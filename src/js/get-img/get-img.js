import '../../css/styles.css';
import LoadMoreBtn from '../components/load-more-btn';
import API from '../api/get-image-api';
import galleryTemplate from '../../template/gallery-template.hbs';

const refs = {
  searchForm: document.querySelector('.js-search-form'),
  articlesContainer: document.querySelector('.js-articles-container'),
  // loadMoreBtn: document.querySelector('[data-action="load-more"]'),
};

const api = new API();

// === --- ===

// v2. --- Load more button ---
const loadMoreBtn = new LoadMoreBtn({
  selector: '[data-action="load-more"]',
  hidden: true,
});
// -----------------------------
// const apiService = new NewsApiService();

// let searchQuery = '';

// refs.loadMoreBtn.addEventListener('click', onLoadMore);
// v2. --- Load more button ---
loadMoreBtn.refs.button.addEventListener('click', onLoadMore);

// ----------------------------
refs.searchForm.addEventListener('submit', onSearch);

function onSearch(e) {
  e.preventDefault();

  // searchQuery = e.currentTarget.elements.query.value;

  // if we don't use gettter in class
  // apiService.searchQuery = e.currentTarget.elements.query.value;

  // if we use gettter in class
  // apiService.query = e.currentTarget.elements.query.value;
  api.query = e.currentTarget.elements.query.value;

  // v2. --- Load more button ---
  loadMoreBtn.show();
  loadMoreBtn.disable();
  //-----------------------------

  api.resetPage();
  api.fetchArticles().then(images => {
    clearArticlesContainer();
    appendArticlesMarkup(images);
    // v2. --- Load more button ---
    loadMoreBtn.enable();
    //-----------------------------
  });
}

function onLoadMore() {
  loadMoreBtn.disable();
  api.fetchArticles().then(images => {
    appendArticlesMarkup(images);
    loadMoreBtn.enable();
  });
}

function appendArticlesMarkup(images) {
  refs.articlesContainer.insertAdjacentHTML(
    'beforeend',
    galleryTemplate(images),
  );
}

function clearArticlesContainer() {
  refs.articlesContainer.innerHTML = '';
}
