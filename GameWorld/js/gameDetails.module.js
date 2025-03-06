import { UI } from "./ui.module.js";

export class GameDetails {
    constructor(id) {
        this.loading = document.querySelector('.loading');
        document.querySelector('#btnClose').addEventListener('click',
            () => {
                document.getElementById('details').classList.add('d-none');
                document.getElementById('gameData').classList.remove('d-none')
            });
        this.getGameDetails(id)
    };
    async getGameDetails(id) {
        this.loading.classList.remove('d-none');

        const options = {
            method: 'GET',
            headers: {
                'x-rapidapi-key': 'f4d99fd6b7msh34e3622b4e74ddap1a2d19jsnddc753389c69',
                'x-rapidapi-host': 'free-to-play-games-database.p.rapidapi.com'
            }
        };
        const api = await fetch(`https://free-to-play-games-database.p.rapidapi.com/api/game?id=${id}`, options);
        const response = await api.json();
        this.loading.classList.add('d-none');
        new UI().displayGameDetails(response);
    }
}