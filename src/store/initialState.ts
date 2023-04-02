export interface IRepository {
    id: number,
    description: string,
    full_name: string,
    name: string,
    owner: {
        avatar_url: string,
        html_url: string,
    }
    stargazers_count: number,
    forks_count: number
}