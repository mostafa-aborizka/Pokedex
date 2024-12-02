# Pokédex React Web App

This React web application fetches data from the The RESTful Pokémon API to display information about Pokemon. It provides details such as their names, images, sprites, types, moves, and stats. To optimize performance, previously fetched data is cached in local storage, ensuring faster access on subsequent requests.

## Features

- Fetch and display Pokémon data including:
  - Name
  - Image
  - Sprites
  - Types
  - Moves with a modal to describe each move
  - Stats
- Caching of previously fetched Pokemon data using local storage to minimize API calls.
- Searching for specific pokemons using their names or numbers
- Clean and responsive UI to enhance user experience.

## Demo
Include a link to a live demo if available or screenshots of the app in action.

## Installation

1. **Clone the repository**
   ```bash
   git clone <repository-url>
   cd <repository-folder>
   ```

2. **Install dependencies**
   ```bash
   npm install
   ```

3. **Start the development server**
   ```bash
   npm run dev
   ```


## Technologies Used

- React (with functional components and hooks)
- JavaScript (ES6+)
- CSS/fantaCSS for styling
- Local Storage for caching
- PokéAPI for fetching Pokemon data


## How It Works

1. **Fetching Pokemon Data:**
   - When a user searches or navigates to view a Pokemon, the app fetches data from the PokéAPI.

2. **Caching with Local Storage:**
   - If the Pokemon has been fetched before, the app retrieves its data from local storage instead of making an API call.

3. **Displaying Information:**
   - The app dynamically updates the UI to show the Pokemon's name, image, types, moves, and stats.


## API Reference

This app uses the [PokéAPI](https://pokeapi.co/). Refer to its documentation for available endpoints and data structures.

## Contributing

Contributions are welcome! Feel free to submit a pull request or create an issue for any bugs or feature requests.


## Acknowledgments

- [PokeAPI](https://pokeapi.co/) for providing the data.

---

Happy catching 🐉!

