import axios from "axios"

const pokeApi = axios.create()

export const getPokemons = async () => {
  const res = await pokeApi.get("https://pokeapi.co/api/v2/pokemon?limit=100&offset=0")
  const promises = await res.data.results.map((data) => getFromPokeApi(data.url))
  const pokemons = await Promise.all(promises)
  return pokemons;
}

export const getFromPokeApi = async(url) => {
  const res = await pokeApi.get(url)
  return res.data
}

export const getByName = async(name) => {
  const res = await pokeApi.get(`https://pokeapi.co/api/v2/pokemon/${name}`)
  return res.data
}