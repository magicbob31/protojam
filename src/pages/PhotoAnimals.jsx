import { useState, useEffect } from "react";
import PropTypes from "prop-types";

const PhotoAnimals = ({ name }) => {
  const [photo, setPhoto] = useState(null);
  const [loading, setLoading] = useState(true);

  useEffect(() => {
    const fetchPhoto = async () => {
      const API_KEY =
        "cBdNorf5UxFPFfC1GkSxVo1LlmQLBTfT824Y00D3S8ZWlTi2iuykKl2f";
      const url = `https://api.pexels.com/v1/search?query=${name}&per_page=1`;

      try {
        const response = await fetch(url, {
          headers: {
            Authorization: API_KEY,
          },
        });
        const data = await response.json();
        if (data.photos && data.photos.length > 0) {
          setPhoto(data.photos[0]);
        } else {
          console.error("No photo found for the given query.");
        }
        setLoading(false);
      } catch (error) {
        console.error("Error fetching data from Pexels API:", error);
        setLoading(false);
      }
    };

    fetchPhoto();
  }, [name]);

  if (loading) {
    return <div>Loading...</div>;
  }

  if (!photo) {
    return (
      <div className="error">
        <div>photo non dispobile</div>
      </div>
    );
  }

  return (
    <div className="containerPhoto">
      <img className="photo" src={photo.src.medium} alt="" />
      <p className="namePhotographer">{photo.photographer}</p>
    </div>
  );
};

PhotoAnimals.propTypes = {
  name: PropTypes.string.isRequired,
};

export default PhotoAnimals;
