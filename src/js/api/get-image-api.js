export default class GetImageAPI {
  constructor() {
    this.searchQuery = '';
    this.page = 1;
  }

  fetchImages() {
    const URL = `https://pixabay.com/api/?image_type=photo&orientation=horizontal&q=${this.searchQuery}&page=${this.page}&per_page=3&key=20575585-f86bba565132ad4f87d3b8fdb`;

    return fetch(URL)
      .then(response => response.json())
      .then(data => {
        // console.log(data);
        this.page += 1;

        return data.hits;
      });
  }

  get query() {
    return this.searchQuery;
  }

  set query(newQuery) {
    this.searchQuery = newQuery;
  }

  resetPage() {
    this.page = 1;
  }
}
