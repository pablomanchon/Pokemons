import { useEffect, useState } from "react";
import { getFromPokeApi } from "../../apis/pokeAPI";
import { Evolutions } from "./Evolutions";

export const Card = ({ pokeData }) => {
  const [pokemon, setPokemon] = useState({});
  const [stats, setStats] = useState([]);
  const [moves, setMoves] = useState([]);
  const [evolutions, setEvolutions] = useState([]);

  useEffect(() => {
    const fetchData = async () => {
      try {
        const pokemonData = await getFromPokeApi(pokeData.url);
        setEvolutions([]);
        setPokemon(pokemonData);
        setStats(pokemonData.stats);
        setMoves(pokemonData.abilities);
      } catch (error) {
        console.error("Error fetching Pokemon data:", error);
      }
    };

    fetchData();
  }, [pokeData]);

  useEffect(() => {
    const fetchEvolutions = async () => {
      if (pokemon.id) {
        try {
          const speciesResponse = await getFromPokeApi(pokemon.species.url);
          const evolutionChainResponse = await getFromPokeApi(speciesResponse.evolution_chain.url);

          const evolutions = [];

          const processChain = (chain) => {
            evolutions.push(chain.species.name);

            if (chain.evolves_to.length > 0) {
              chain.evolves_to.forEach((e) => {
                processChain(e);
              });
            }
          };

          processChain(evolutionChainResponse.chain);

          setEvolutions(evolutions);
        } catch (error) {
          console.error("Error fetching evolution data:", error);
        }
      }
    };

    fetchEvolutions();
  }, [pokemon]);

  return (
    <article
    style={{
      backgroundImage: `url(${pokemon.sprites?.other.dream_world.front_default})`,
    }}
    className="pokemon">
    <h2 className="name">{pokeData.name.toUpperCase()}</h2>
    <div className="atributes">
      <section>
        <h3 className="titles">Moves</h3>
        <div className="moves">
          {moves.map((move, key) => (
            <span key={key}>{move.ability.name.toUpperCase()}</span>
          ))}
        </div>
      </section>
      <section className="stats">
        <h3 className="titles">Stats</h3>
        {stats.map((stat, key) => (
          <div key={key}>
            <span>{stat.stat.name.toUpperCase()}</span>
            <span className="stat">{stat.base_stat}</span>
          </div>
        ))}
      </section>
    </div>
    <Evolutions evolutions={evolutions} />
  </article>
  );
};
