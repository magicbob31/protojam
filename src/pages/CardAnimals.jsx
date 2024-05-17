import { useEffect, useState } from "react";
import "./CardAnimals.scss";
import drawing from "../assets/imgs/OIG2.jpg";
import PhotoAnimals from "./PhotoAnimals";

function CardAnimals() {
  const [value, setValue] = useState();
  const [data, setData] = useState([]);

  useEffect(() => {
    const url = `https://api.api-ninjas.com/v1/animals?name=${value}`;

    const options = {
      method: "GET",
      headers: {
        "X-Api-Key": "PGS+gK/Y2dl38ccevJ0uQQ==DbQLckaAbOoIdM76",
      },
    };

    fetch(url, options)
      .then((response) => response.json())
      .then((data) => {
        setData(data);
      })
      .catch((error) => {
        console.error("Erreur :", error);
      });
  }, [value]);

  return (
    <div className="allpage">
      <img src={drawing} alt="" />
      <div className="input">
        <input
          type="text"
          value={value}
          onChange={(event) => {
            setValue(event.target.value);
          }}
          placeholder="     Entrez du texte ici"
        />
      </div>

      <div className="card">
        {Array.isArray(data)
          ? data
              .filter((animal) =>
                animal.name.toLowerCase().includes(value.toLowerCase())
              )
              .slice(0, 20)
              .map((animal) => (
                <>
                  <div className="onelement" key={animal.scientific_name}>
                    <h2>{animal.name}</h2>
                    <PhotoAnimals name={animal.name} />
                    <p>
                      <h3>locations :</h3>
                      {animal.locations || "Information non disponible"}
                    </p>
                    <p>
                      <h3>prey :</h3>
                      {animal.characteristics.prey ||
                        "Information non disponible"}
                    </p>
                    <p>
                      <h3>estimated population :</h3>
                      {animal.characteristics.estimated_population_size ||
                        "Information non disponible"}
                    </p>
                    <p>
                      <h3>gestation_period :</h3>
                      {animal.characteristics.gestation_period ||
                        "Information non disponible"}
                    </p>
                    <p>
                      <h3>habitat :</h3>
                      {animal.characteristics.habitat ||
                        "Information non disponible"}
                    </p>
                    <p>
                      <h3>diet :</h3>
                      {animal.characteristics.diet ||
                        "Information non disponible"}
                    </p>
                    <p>
                      <h3>lifespan :</h3>
                      {animal.characteristics.lifespan ||
                        "Information non disponible"}
                    </p>
                    <p>
                      <h3>weight :</h3>
                      {animal.characteristics.weight ||
                        "Information non disponible"}
                    </p>
                    <p>
                      <h3>height :</h3>
                      {animal.characteristics.height ||
                        "Information non disponible"}
                    </p>
                  </div>
                </>
              ))
          : null}
      </div>
    </div>
  );
}

export default CardAnimals;
