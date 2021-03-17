import { alert, error, success } from '@pnotify/core';
import '@pnotify/core/dist/BrightTheme.css';
import '@pnotify/core/dist/PNotify.css';

import '../../css/styles.css';
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

loadMoreBtn.refs.button.addEventListener('click', onLoadMore);
refs.searchForm.addEventListener('submit', onSearch);

function onSearch(e) {
  e.preventDefault();

  const searchQuery = e.currentTarget.elements.query.value.trim();

  if (searchQuery === '') {
    catchError();
    refs.galleryContainer.innerHTML = '';
    return;
  }

  api.query = searchQuery;

  loadMoreBtn.show();
  loadMoreBtn.disable();

  api.resetPage();

  api.fetchImages().then(images => {
    cleargalleryContainer();
    appendArticlesMarkup(images);
    loadMoreBtn.enable();
  });
}

function onLoadMore() {
  loadMoreBtn.disable();
  api.fetchImages().then(images => {
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

function catchError() {
  error({
    text: 'Enter smth to find your query!',
    delay: 4000,
  });
}
