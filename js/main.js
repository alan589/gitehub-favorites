import { FavoritesView, GithubUser } from "./Favorites.js";



const favoritesView = new FavoritesView('#app')


document.querySelector('.search button').onclick = (e) => {
    e.preventDefault()
    favoritesView.add(document.querySelector('#input-search').value)
}

