import { useState, useEffect } from 'react';
import axios from 'axios';
import LoadingElement from './LoadingElement';
import LoadingScreen from './LoadingScreen';
import './PokedexDetails.css';
import API_POKEMON_DEFAULT from '../constants/api';
import colorTypes from '../constants/colorTypes';

function PokedexDetails({ pokemonId }) {
  const [pokemon, setPokemon] = useState({});
  useEffect(() => {
    axios
      .get(`${API_POKEMON_DEFAULT}${pokemonId}`)
      .then((res) => res.data)
      .then(setPokemon);
  }, [pokemonId]);
  const {
    id, sprites, types, abilities, species,
  } = pokemon;

  const [colorsForCard, setColorsForCard] = useState([]);

  useEffect(() => {
    if (types) {
      setColorsForCard([colorTypes[types[0].type.name]]);
      if (types.length > 1) {
        setColorsForCard([
          colorTypes[types[0].type.name],
          colorTypes[types[1].type.name],
        ]);
      }
    }
  }, [id]);

  return (
    <>
      <div className="pokedex-card">
        {colorsForCard.length >= 1 ? (
          <div
            className="pokedex-card-additional"
            style={
              colorsForCard[1]
                ? {
                  background: `linear-gradient(${colorsForCard[0]}, ${colorsForCard[1]})`,
                  'border-radius': '10px',
                }
                : {
                  background: colorsForCard[0],
                  'border-radius': '10px',
                }
            }
          >
            <div className="more-infos">
              {sprites ? (
                <img
                  className="pokedex-card-image"
                  src={sprites.front_default}
                  alt={id}
                />
              ) : (
                <LoadingElement />
              )}
              <div className="pokedex-card-description pokedex-card-right">
                <section className="responsive-description">
                  <p className="pokedex-card-description">Id : {id}</p>
                  {types ? (
                    <ul className="pokedex-card-description">
                      type:
                      {types.map((e) => (
                        <li>{e.type.name}</li>
                      ))}
                    </ul>
                  ) : (
                    <LoadingElement />
                  )}
                  {abilities ? (
                    <ul className="pokedex-card-description">
                      Abilities :
                      {abilities.map((e) => (
                        <li>{e.ability.name}</li>
                      ))}
                    </ul>
                  ) : (
                    <LoadingElement />
                  )}
                </section>
              </div>
            </div>
          </div>
        ) : (
          <LoadingScreen />
        )}
        <div className="pokedex-card-center name">
          {species ? (
            <h2 className="pokemon-police">{species.name}</h2>
          ) : (
            <LoadingScreen />
          )}
        </div>
      </div>
    </>
  );
}
export default PokedexDetails;
