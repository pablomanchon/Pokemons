import { create } from "zustand"

export const usePokemon = create((set) => ({
  pokemon:{},
  image: "",
  stats: [],
  setPokemon: (newPokemon) => set((state) =>{
    const pokemon = newPokemon || {};
    const image = newPokemon ? newPokemon.sprites.other.dream_world.front_default : ""
    const stats = []
    newPokemon?.stats.map((stat) => {
      console.log(stat)
    })

    return {
      pokemon,
      image: newPokemon ? newPokemon.sprites.other.dream_world.front_default : "",
      stats
    }
  })
  }
))