import { useState, useEffect } from 'react';
import axios from 'axios';
import PokedexDetails from './PokedexDetails';
import API_POKEMON_DEFAULT from '../constants/api';

function PokedexList() {
  const [pokemons, setPokemons] = useState([]);
  const [currPage, setCurrPage] = useState(API_POKEMON_DEFAULT);
  const [nextPage, setNextPage] = useState([]);
  const [prevPage, setPrevPage] = useState([]);
  useEffect(() => {
    axios
      .get(currPage)
      .then((res) => res.data)
      .then((res) => {
        setNextPage(res.next);
        setPrevPage(res.previous);
        return res.results;
      })
      .then(setPokemons);
  }, [currPage]);
  if (pokemons) {
    return (
      <>
        {prevPage && (
          <button
            className="pokedex-button"
            type="submit"
            onClick={() => setCurrPage(prevPage)}
          >
            ←
          </button>
        )}
        {nextPage && (
          <button
            className="pokedex-button"
            type="submit"
            onClick={() => setCurrPage(nextPage)}
          >
            →
          </button>
        )}
        <div className="pokedex-cards">
          {pokemons.map((pokemon) => (
            <PokedexDetails key={pokemon.name} pokemonId={pokemon.name} />
          ))}
        </div>
      </>
    );
  }
}
export default PokedexList;
