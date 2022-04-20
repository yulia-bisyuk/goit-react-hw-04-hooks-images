function fetchImages(userQuery, page) {
  const key = '25297171-b070f342ccd33435260198644';

  return fetch(
    `https://pixabay.com/api/?q=${userQuery}&page=${page}&key=${key}&image_type=photo&orientation=horizontal&per_page=128`
  ).then(response => {
    if (response.ok) {
      return response.json();
    }
    return Promise.reject(new Error(`No images on ${userQuery} query`));
  });
}

const api = { fetchImages };
export default api;
