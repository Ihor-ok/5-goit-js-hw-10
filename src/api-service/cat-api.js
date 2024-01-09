import axios from "axios";

function fetchBreeds() {
    return axios('https://api.thecatapi.com/v1/breeds');
};

function fetchCatByBreed(breedId) {
    return axios(`https://api.thecatapi.com/v1/images/search?breed_ids=${breedId}`);
};

export default { fetchBreeds, fetchCatByBreed };