import { runInAction, makeAutoObservable } from 'mobx';
import { IRepository } from './initialState';
import throttle from '../helper';


class SearchRepository {
    repositories: IRepository[] = [];
    lastRequestSource: "input" | "click" | null = null;
    isLoading = false;
    isError = false;
    getRepositoriesThrottled: (repositoryName: string) => void;
    constructor() {
        makeAutoObservable(this);
        this.getRepositoriesThrottled = throttle(
            this.getRepositories.bind(this),
            1000
        );
    }

    handleClick(repositoryName: string): void {
        this.lastRequestSource = "click";
        this.getRepositories(repositoryName);
    }
    
    handleInputChange(repositoryName: string): void {
        this.lastRequestSource = "input";
        this.getRepositoriesThrottled(repositoryName);
    }
    
    getRepositories (repositoryName: string) : void {
        if (!repositoryName) {
            return;
        }
        this.isLoading = true;
        fetch(`https://api.github.com/search/repositories?q=${repositoryName}`)
            .then(response => response.json())
            .then(data => {
                console.log(data)
                runInAction (() => {
                    if (data && data.items) {
                            if (this.lastRequestSource === 'click') {
                                this.repositories = data.items.filter(
                                    (repo:IRepository) => repo.full_name === repositoryName
                                );
                            } else {
                                this.repositories = data.items;
                            }
                        } else {
                            this.repositories = [];
                        }
                });
            })
            .catch((error) => {
                console.error(error);
                runInAction(() => {
                    this.repositories = [];
                    this.isLoading = false;
                    this.isError = true;
                });
              })
            .finally(() => {
                runInAction(() => {
                    this.isLoading = false;
                });
            });
    }
}

const searchRepository = new SearchRepository();
export default searchRepository;