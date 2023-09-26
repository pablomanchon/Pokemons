import { useEffect, useState } from "react";
import "../../styles/evolutions.scss"
import { getByName } from "../../apis/pokeAPI";

export const Evolutions = ({ evolutions }) => {
  const [images, setImages] = useState([]);

  useEffect(() => {
    const fetchImages = async () => {
      try {
        const imagePromises = evolutions.map(async (ev) => {
          const res = await getByName(ev);
          return res.sprites.other.dream_world.front_default;
        });

        const imageUrls = await Promise.all(imagePromises);
        setImages(imageUrls);
      } catch (error) {
        console.error("Error fetching evolution images:", error);
      }
    };

    fetchImages();
  }, [evolutions]);

  return (
    <div className="evolution">
      <div className="evolutions-container">
        {images.map((image, key) => (
          <>
          <div key={key} className="evolution-image">
            <img src={image}/>
            <span>{evolutions[key]}</span>
          </div>
          {key !== images.length -1 && <span>{">"}</span>}
          </>
        ))}
      </div>
    </div>
  );
};
