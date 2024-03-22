/* La barre de recherche : 
- Récupérer la ville renseignée par l'utilisateur
- à partir de la ville, trouvez la latitude et la longitude de cette ville
- si la ville renseignée n'est pas dans la BDD, indiquer une erreur
- BONUS : proposer des suggestions de villes (auto-complétion)
- BONUS : enregistrer les dernières recherches
*/

class Search {

    constructor() {
        /* définir les variables, les propriétés */
        this.input = document.querySelector('.js-search-input')
        this.form = document.querySelector('.js-search-form')
        this.cities = []
        /* lancer les fonctions, les méthodes */
        this.init()
    }

    init() {
        /* Méthode pour lancer toutes les fonctions de ma classe */
        this.watchUserInput()
        this.getCities()
    }

    watchUserInput() {
        this.form.addEventListener('submit', (event) => {
            event.preventDefault()
            this.getLatLong()
        })
    }

    getCities() {
        fetch('../data/french-cities.json')
            .then(response => response.json())
            .then(data => {
                this.cities = data
            })
    }

    getLatLong() {
        const name = this.input.value
        const cityData = this.getCityData(name)
        // Récupérer l'objet correspondant à la ville tapée
        if (cityData) {
            const lat = cityData.lat
            const lng = cityData.lng
            console.log(lat, lng)
        }
        else {
            alert("pas de ville")
        }
    }

    getCityData(cityName) {
        const cityNameLower = cityName.toLowerCase()
        let cityData = {}
        for (let i = 0; i < this.cities.length; i++) {
            const cityNameInDataLower = this.cities[i].city.toLowerCase()
            if (cityNameLower === cityNameInDataLower) {
                cityData = this.cities[i]
                break
            }
        }
        return cityData
    }
}

export { Search }