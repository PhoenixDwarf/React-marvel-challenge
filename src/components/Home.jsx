import { PrimeReactContext } from 'primereact/api';
import { useContext, useEffect, useState } from 'react';
import CharactersGrid from './CharactersGrid';
import FavoritesList from './FavoritesList';
import { favsArray } from '../services/SuperHeroesService';

function Home() {
    const { setRipple } = useContext(PrimeReactContext);
    const [localFavsArray, setLocalFavsArray] = useState([]);

    const updateFavsArray = (heroes) => {
        setLocalFavsArray(heroes);
    };
    
    useEffect(() => {
        setRipple(true);
        setLocalFavsArray(favsArray);
    }, [setRipple]);

    return (
        <>
            <main className="container">
                <div className="row justify-content-center">
                    <section className="col-9">
                        <CharactersGrid updateFavsArray={updateFavsArray}/>
                    </section>
                    <section className="col-3 right-panel aside">
                        <FavoritesList favsArray={localFavsArray} updateFavsArray={updateFavsArray}/>
                    </section>
                </div>
            </main>
            <footer>
                <h3 className="d-flex justify-content-center">
                    This application was made by Edwin Nemeguen :]
                </h3>
            </footer>
        </>
    );
  }
  
  export default Home;