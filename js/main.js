import { FavoritesView } from "./Favorites.js";



const favoritesView = new FavoritesView('#app')


document.querySelector('.search button').onclick = (e) => {
    e.preventDefault()
    console.log(document.querySelector('#input-search').value)
    favoritesView.add(document.querySelector('#input-search').value)
    favoritesView.update()
}