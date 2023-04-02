import { makeAutoObservable } from 'mobx';
import { IRepository } from './initialState';

class Favorites {
    favoritesList: IRepository[] = [];
    constructor() {
        makeAutoObservable(this);
        const storedFavorites = localStorage.getItem('favoritesList');
        if (storedFavorites) {
            this.favoritesList = JSON.parse(storedFavorites);
        }
    }

    addFavorites(repo:IRepository) {
        if (!this.favoritesList.some(fav => fav.id === repo.id)) {
            this.favoritesList.push(repo);
            localStorage.setItem('favoritesList', JSON.stringify(this.favoritesList));
        }
    }

    removeFavorites(id:number) {
        this.favoritesList = this.favoritesList.filter(fav => fav.id !== id);
        localStorage.setItem('favoritesList', JSON.stringify(this.favoritesList));
    }
}

const favorites = new Favorites();
export default favorites;