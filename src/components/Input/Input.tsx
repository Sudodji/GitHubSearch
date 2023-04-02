import React, {useState} from 'react';
import styles from './input.module.css';
import { NavLink } from 'react-router-dom';
import {observer} from 'mobx-react-lite';
import searchRepository from '../../store/searchRepository';
import favorites from '../../store/favorites';
import { IRepository } from '../../store/initialState';

const Input = observer(() => {
    const [repository, setRepository] = useState('');
    const [isOpen, setIsOpen] = useState(false);
    const handleOnChangeInput = (event: React.ChangeEvent<HTMLInputElement>): void => {
        setRepository(event.target.value);
        setIsOpen(true);
        searchRepository.handleInputChange(event.target.value);
    }
    const handleOnClick = (repo: IRepository): void => {
        favorites.addFavorites(repo);
    }
    return (
        <div className={styles.inputContainer}>
            <input 
                type="text" 
                name="searchRepository" 
                placeholder="Find repository"
                value={repository}
                onChange={handleOnChangeInput} 
            />
            {!searchRepository.isError ? (
                <>
                    {searchRepository.isLoading ? (
                        <h2 className={styles.loader}>Loading...</h2>
                    ) : (
                        <>
                            {isOpen && repository && searchRepository.repositories.length > 0 &&
                                <div className={styles.repositoriesWrapper}>
                                    <ul>
                                    {searchRepository.repositories.map(repository => (
                                        <li className={styles.repositoryItem} title="add to favorites" onClick={() => handleOnClick(repository)} key={repository.id}>
                                            <img width="95px" height="75px" src={repository.owner.avatar_url} alt="flag"/>
                                            <a href={repository.owner.html_url}>{repository.full_name}</a>
                                            <span>Stars: {repository.stargazers_count}</span>
                                            <span>Forks: {repository.forks_count}</span>
                                            <NavLink to={`/repositories/${repository.full_name}`} onClick={(event) => event.stopPropagation()} className={styles.repositoryButton}>more details</NavLink>
                                        </li>
                                    ))}
                                    </ul>
                                </div>
                            }
                        </>
                    )}
                </>
            ) : <h3>Error</h3>}
        </div>
    )
})

export default Input;