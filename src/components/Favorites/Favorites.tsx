import React from 'react';
import {observer} from 'mobx-react-lite';
import favorites from '../../store/favorites';
import styles from './favorites.module.css';

const Favorites = observer(() => {
    const handleOnClick = (id:number): void => {
        favorites.removeFavorites(id);
    }
    return (
        <div className={styles.favoritesWrapper}>
            {!favorites.favoritesList || favorites.favoritesList.length === 0 ? (
                <h2 className={styles.favoritesTitle}>No favorites yet!</h2>
            ) : (
                <>
                    <h2 className={styles.favoritesTitle}>Favorites</h2>
                    <ul>
                    {favorites.favoritesList.map(fav => (
                        <li key={fav.id} className={styles.favoritesItem}>
                            <img width="95px" height="75px" src={fav.owner.avatar_url} alt="flag"/>
                            <a href={fav.owner.html_url}>{fav.full_name}</a>
                            <span>Stars: {fav.stargazers_count}</span>
                            <span>Forks: {fav.forks_count}</span>
                            <button className={styles.removeFavorites} onClick={() => handleOnClick(fav.id)}>X</button>
                        </li>
                    ))}
                    </ul>
                </>
            )}
        </div>
    )
})

export default Favorites;