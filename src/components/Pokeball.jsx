import { useEffect, useState } from "react";
import "../styles/Pokeball.scss";
import { motion, useAnimation } from "framer-motion";
import { Stats } from "./Stats";

export const Pokeball = ({ pokeData }) => {
  const [pokemon, setPokemon] = useState({});
  useEffect(() => {
    const stats = [];
    pokeData.stats.map((data) => {
      stats.push({
        name: data.stat.name,
        value: data.base_stat,
      });
    });
    setPokemon({
      name: pokeData.name,
      image: pokeData.sprites.other.dream_world.front_default,
      stats,
    });
  }, [pokeData]);

  const [isOpen, setIsOpen] = useState(false);
  const control = useAnimation();

  const firstHalf = {
    open: {
      translateY: -50,
      rotate: -45,
      translateX: -60,
      transition: {
        type: "spring",
      },
    },
    closed: {
      translateY: 0,
      rotate: 0,
      translateX: 0,
      transition: {
        type: "linear",
      },
    },
  };
  const secondHalf = {
    open: {
      translateY: 50,
      rotate: 45,
      translateX: -60,
      transition: {
        type: "spring",
      },
    },
    closed: {
      translateY: 0,
      rotate: 0,
      translateX: 0,
      transition: {
        type: "linear",
      },
    },
  };
  const pokeVariants = {
    open: {
      x: [0, 150, 120],
      scale: [1, 1, 1.5],
    },
    closed: {
      x: 0,
      scale: 1,
    },
  };

  const toggleOpen = () => {
    setIsOpen(!isOpen);
    control.start(isOpen ? "closed" : "open");
  };

  return (
    <motion.div
      onHoverStart={() => control.start("hover")}
      onHoverEnd={() => control.start("noHover")}
      onClick={toggleOpen}
      className="pokeball">
      <motion.div variants={firstHalf} animate={control} className="first-half">
        <div className="first">
          <motion.div
            animate={control}
            variants={{
              hover: {
                backgroundColor: "#ffff00",
              },
              noHover: {
                backgroundColor: "#ffffff",
              },
            }}
            className="second"
          />
        </div>
      </motion.div>
      <motion.div
        variants={secondHalf}
        animate={control}
        className="second-half"
      />
      <motion.div variants={pokeVariants} animate={control} className="pokemon">
        <motion.img
          variants={{
            open: { opacity: 1 },
            closed: { opacity: 0 },
          }}
          initial="closed"
          animate={control}
          src={pokemon?.image}
        />
        <motion.span
          variants={{
            open: { opacity: 1 },
            closed: { opacity: 0 },
          }}
          initial="closed"
          animate={control}
          className="name">
          {pokemon?.name.toUpperCase()}
        </motion.span>
        <Stats control={control} stats={pokemon.stats} />
      </motion.div>
    </motion.div>
  );
};
