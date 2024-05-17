import { useEffect, useState } from "react";
import "./CardAnimals.scss";
import drawing from "../assets/imgs/OIG2.jpg";
import PhotoAnimals from "./PhotoAnimals";

function CardAnimals() {
  const [value, setValue] = useState("");
  const [data, setData] = useState([]);
  const [loading, setLoading] = useState(true);

  useEffect(() => {
    const fetchAnimals = async () => {
      const url = `https://api.api-ninjas.com/v1/animals?name=${value}`;

      const options = {
        method: "GET",
        headers: {
          "X-Api-Key": "PGS+gK/Y2dl38ccevJ0uQQ==DbQLckaAbOoIdM76",
        },
      };

      try {
        const response = await fetch(url, options);
        const data = await response.json();
        setData(data);
        setLoading(false);
      } catch (error) {
        console.error("Erreur :", error);
        setLoading(false);
      }
    };

    fetchAnimals();
  }, [value]);

  return (
    <div className="allpage">
      <div>
        <img className="logo" src={drawing} alt="logo" />
        <h1 className="title">Animals Discovery</h1>
      </div>
      <div className="input">
        <input
          type="text"
          value={value}
          onChange={(event) => {
            setValue(event.target.value);
          }}
          placeholder="Entrez du texte ici"
        />
      </div>

      <div className="card">
        {loading ? (
          <div>Loading...</div>
        ) : (
          Array.isArray(data) &&
          data
            .filter((animal) =>
              animal.name.toLowerCase().includes(value.toLowerCase())
            )
            .slice(0, 20)
            .map((animal) => (
              <div className="onelement" key={animal.scientific_name}>
                <h2>{animal.name}</h2>
                <PhotoAnimals name={animal.name} />
                <div className="allP">
                  <div className="p">
                    <h3>locations :</h3>
                    <p>{animal.locations || "Information non disponible"}</p>
                  </div>
                  <div className="p">
                    <h3>prey :</h3>
                    <p>
                      {animal.characteristics.prey ||
                        "Information non disponible"}
                    </p>
                  </div>
                  <div className="p">
                    <h3>estimated population :</h3>
                    <p>
                      {animal.characteristics.estimated_population_size ||
                        "Information non disponible"}
                    </p>
                  </div>
                  <div className="p">
                    <h3>gestation period :</h3>
                    <p>
                      {animal.characteristics.gestation_period ||
                        "Information non disponible"}
                    </p>
                  </div>
                  <div className="p">
                    <h3>habitat :</h3>
                    <p>
                      {animal.characteristics.habitat ||
                        "Information non disponible"}
                    </p>
                  </div>
                  <div className="p">
                    <h3>diet :</h3>
                    <p>
                      {animal.characteristics.diet ||
                        "Information non disponible"}
                    </p>
                  </div>
                  <div className="p">
                    <h3>lifespan :</h3>
                    <p>
                      {animal.characteristics.lifespan ||
                        "Information non disponible"}
                    </p>
                  </div>
                  <div className="p">
                    <h3>weight :</h3>
                    <p>
                      {animal.characteristics.weight ||
                        "Information non disponible"}
                    </p>
                  </div>
                  <div className="p">
                    <h3>height :</h3>
                    <p>
                      {animal.characteristics.height ||
                        "Information non disponible"}
                    </p>
                  </div>
                </div>
              </div>
            ))
        )}
      </div>
    </div>
  );
}

export default CardAnimals;
