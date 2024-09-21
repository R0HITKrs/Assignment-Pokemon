import React, { useEffect, useState } from "react";
import axios from "axios";
import "./App.css";
import heading from "./assets/heading.png";

const pokemonDescriptions = {
  bulbasaur:
    "A strange seed was planted on its back at birth. The plant sprouts and grows with this Pokémon.",
  ivysaur:
    "When the bulb on its back grows large, it appears to lose the ability to stand on its hind legs.",
  venusaur:
    "The plant blooms when it is absorbing solar energy. It stays on the move to seek sunlight.",
  charmander:
    "The flame on its tail indicates Charmander's life force. If it's healthy, the flame will be strong.",
  // Add descriptions for more Pokémon...
};

const App = () => {
  const [pokemon, setPokemon] = useState([]);
  const [searchTerm, setSearchTerm] = useState("");
  const [filteredPokemon, setFilteredPokemon] = useState([]);

  useEffect(() => {
    const fetchPokemon = async () => {
      try {
        const response = await axios.get(
          "https://pokeapi.co/api/v2/pokemon?limit=20"
        );
        setPokemon(response.data.results);
        setFilteredPokemon(response.data.results);
      } catch (error) {
        console.error("Error fetching the Pokémon data", error);
      }
    };
    fetchPokemon();
  }, []);

  const handleSearch = (e) => {
    const value = e.target.value.toLowerCase();
    setSearchTerm(value);
    setFilteredPokemon(
      pokemon.filter((p) => p.name.toLowerCase().includes(value))
    );
  };

  return (
    <div className="app">
      <header>
        <img src={heading} alt="" />
      </header>
      <div>
        <div className="title">
          <span>Pokédex</span>
        </div>
        <input
          type="text"
          placeholder="Search Pokémon..."
          value={searchTerm}
          onChange={handleSearch}
        />
      </div>
      <div className="card-container">
        {filteredPokemon.map((poke, index) => (
          <PokemonCard key={index} name={poke.name} url={poke.url} />
        ))}
      </div>
    </div>
  );
};

const PokemonCard = ({ name, url }) => {
  const [image, setImage] = useState("");
  const description =
    pokemonDescriptions[name] || " We can add more description if we want.";

  useEffect(() => {
    const fetchImage = async () => {
      const response = await axios.get(url);
      setImage(response.data.sprites.front_default);
    };
    fetchImage();
  }, [url]);

  return (
    <div className="card">
      <img src={image} alt={name} />
      <h2>{name.charAt(0).toUpperCase() + name.slice(1)}</h2>
      <div className="description">{description}</div>
    </div>
  );
};

export default App;
