import { UI } from "./ui.module.js";
import { GameDetails } from "./gameDetails.module.js";


export class Home {
    constructor() {
        this.loading = document.querySelector('.loading');
        this.details = document.querySelector('#details');
        this.games = document.querySelector('#gameData');
        document.querySelectorAll('.nav-link').forEach(link => {
            link.addEventListener('click', () => {
                const category = link.dataset.category;
                this.activeLink(link);
                this.getGames(category);

            });
        });
        this.UI = new UI();

        this.detailSection = new GameDetails();
        this.getGames("MMORPG");

    }
    activeLink(link) {
        document.querySelector('.navbar-nav .active').classList.remove("active");
        link.classList.add('active');


    }
    async getGames(id) {
        this.loading.classList.remove('d-none');
        const options = {
            method: 'get',
            headers: {
                'x-rapidapi-key': 'f4d99fd6b7msh34e3622b4e74ddap1a2d19jsnddc753389c69',
                'x-rapidapi-host': 'free-to-play-games-database.p.rapidapi.com'
            }
        };
        const api = await fetch(`https://free-to-play-games-database.p.rapidapi.com/api/games?category=${id}`, options);
        const response = await api.json();
        this.loading.classList.add('d-none');
        this.UI.displayGames(response);
        document.querySelectorAll(".card").forEach((card) => {
            card.addEventListener('click', () => {
                this.details.classList.remove('d-none');
                this.games.classList.add('d-none');
                new GameDetails(card.dataset.id);


            });
        });

    }

}