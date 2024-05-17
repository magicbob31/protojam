import { useState, useEffect } from "react";

const PhotoAnimals = ({ name }) => {
  const [photos, setPhotos] = useState([]);
  const [loading, setLoading] = useState(true);
  const [loadingMore, setLoadingMore] = useState(false);
  const [page, setPage] = useState(1);
  const [totalPages, setTotalPages] = useState(1);

  useEffect(() => {
    const fetchPhotos = async (pageNumber = 1) => {
      const API_KEY =
        "cBdNorf5UxFPFfC1GkSxVo1LlmQLBTfT824Y00D3S8ZWlTi2iuykKl2f";

      const url = `https://api.pexels.com/v1/search?query=${name}&per_page=15&page=${pageNumber}`;

      try {
        const response = await fetch(url, {
          headers: {
            Authorization: API_KEY,
          },
        });
        const data = await response.json();
        setPhotos((prevPhotos) => [...prevPhotos, ...data.photos]);
        setTotalPages(Math.ceil(data.total_results / 15));
        setLoading(false);
        setLoadingMore(false);
        console.log(url);
      } catch (error) {
        console.error("Error fetching data from Pexels API:", error);
        setLoading(false);
        setLoadingMore(false);
      }
    };

    fetchPhotos(page);
  }, [name, page]);

  const handleLoadMore = () => {
    if (page < totalPages) {
      setLoadingMore(true);
      setPage((prevPage) => prevPage + 1);
    }
  };

  if (loading) {
    return <div>Loading...</div>;
  }

  return (
    <div>
      <div>
        {photos.map((photo) => (
          <div key={photo.id}>
            <img src={photo.src.medium} alt={photo.photographer} />
            <p>{photo.photographer}</p>
          </div>
        ))}
      </div>
      {loadingMore ? (
        <div>Loading more...</div>
      ) : (
        page < totalPages && <button onClick={handleLoadMore}>Load More</button>
      )}
    </div>
  );
};

export default PhotoAnimals;
