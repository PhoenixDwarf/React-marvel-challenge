import { ProgressSpinner } from 'primereact/progressspinner';
import { useEffect, useState } from 'react';
import { Link, useParams } from "react-router-dom";
import { getSuperHeroById } from '../services/SuperHeroesService';

function Character() {

    const params = useParams();

    const [currentHero, setCurrentHero] = useState(undefined);
    const [heroID] = useState(params.id);
    const [showSpinner, setShowSpinner] = useState(false);

    const formatDate = (modifiedDate) => {
        const date = new Date(modifiedDate);
        const options = { year: 'numeric', month: 'short', day: 'numeric' };
        return new Intl.DateTimeFormat('en-US', options).format(date); 
    };

    useEffect(() => {
        setShowSpinner(true);
        fetch(getSuperHeroById(heroID))
        .then(res => res.json())
        .then(res => {
            setCurrentHero(res.data.results[0]);
            setShowSpinner(false);
        })
        .catch(err => setShowSpinner(false));
    }, [heroID]);

    return (
        <div className="container">
            <div className="spinner">
                {
                    showSpinner &&  <ProgressSpinner />
                }
            </div>
            {
                (!showSpinner && currentHero) &&
                <div className="character_container flex">
                    <img src={currentHero.thumbnail.path + '.' + currentHero.thumbnail.extension} alt={currentHero.title} className="character_container-img"/>
                    <div className="character_container-info flex">
                        <div>
                            <div className="flex character_container-info-top">
                                <img src={require("../assets/icons/characters.png")} alt="characters" className="character_container-info-icon"/>
                                <h2 className="title">{currentHero.name}</h2>
                            </div>
                            <h5>Description:</h5>
                            <p>{ currentHero.description === '' || currentHero.description === "" ? 'No description found': currentHero.description  }</p>
                            <h5>Modified:</h5>
                            <p>{formatDate(currentHero.modified)}</p>
                            <h5>More:</h5>
                            {
                                currentHero.urls.map((item) => {
                                    return(
                                        <p key={item.url}>
                                            {item.type.toUpperCase()}: <a href={item.url} target="blank"> Click me! </a>
                                        </p>
                                    )
                                })
                            }
                        </div>
                        <Link to="/" className="w-100">
                            <button type="button" className="btn btn-secondary title">Go back home</button>
                        </Link>
                    </div>
                </div>
            }
            {
                (!showSpinner && !currentHero) && 
                <div className="container d-flex align-items-center flex-column mt-4">
                    <h2>Heroe not found</h2>
                    <div className="mt-4">
                        <Link to="/" className="w-100">
                            <button type="button" className="btn btn-secondary title">Go back home</button>
                        </Link>
                    </div>
                </div> 
            }
        </div>
    );
}
  
export default Character;