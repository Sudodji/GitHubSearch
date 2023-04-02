import React, { useEffect } from 'react';
import styles from './repoPage.module.css';
import { useParams, NavLink } from 'react-router-dom';
import {observer} from 'mobx-react-lite';
import searchRepository from '../../store/searchRepository';

const RepoPage = observer(() => {
    const { '*': repoPath } = useParams();
    useEffect(() => {
        if (repoPath) {
            searchRepository.handleClick(repoPath);
        }
    }, [ repoPath ])
      
    return (
        <>
            {!searchRepository.isError ? (
                <>
                    {searchRepository.isLoading ? (
                        <h2 className={styles.loader}>Loading...</h2>
                    ) : (
                        <>
                            {searchRepository.repositories.length > 0 &&
                                <div className={styles.repositoryWrapper}>
                                    {searchRepository.repositories.map(repository => (
                                        <>
                                            <img width="500px" height="480px" src={repository.owner.avatar_url} alt="flag"/>
                                            <div className={styles.repositoryInfo} key={repository.id}>
                                                <span>Link:<a href={repository.owner.html_url}>{repository.full_name}</a></span>
                                                <span>Name: {repository.name}</span>
                                                <span>Description: {repository.description}</span>
                                                <span>Stars: {repository.stargazers_count}</span>
                                                <span>Forks: {repository.forks_count}</span>
                                            </div>
                                        </>
                                    ))}
                                </div>
                            }
                        </>
                    )}
                </>
            ) : <h3>Error</h3>}
            <NavLink to={ `/` } className={styles.backButton}>Back</NavLink>
        </>
    )
})

export default RepoPage;