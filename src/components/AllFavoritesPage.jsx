import { useEffect, useRef, useState } from "react";
import { favsArray, deleteFavComic } from '../services/SuperHeroesService';
import { Link } from "react-router-dom";
import { Toast } from "primereact/toast";

function AllFavoritesPage() {

    const toast = useRef(null);
    const [localFavsArray, setLocalFavsArray] = useState([]);

    const deleteFavComicFromService = (comic) => {
        deleteFavComic(comic);
        setLocalFavsArray([...favsArray]);
        toast.current.show({severity:'success', summary: 'Success', detail: `"${comic.title}" was removed from favourites`});
    };
  
    useEffect(() => {
        setLocalFavsArray(favsArray);
    }, []);

    return (
        <>
            <div className="container">
                <div className="flex top-title mt-5 mb-5">
                    <img src={require("../assets/icons/favourites.png")} alt="favourites" />
                    <h2 className="title">My favourites comics</h2>
                </div>
                <div className="flex myFavoriteTotal">
                    <h6 className="title">Total: {localFavsArray.length}</h6>
                    <Link to="/">
                        <button type='button' className='btn btn-secondary title'>Go back home</button>
                    </Link>
                </div>
            </div>
            <div className="container favourites_component flex">
                {
                    localFavsArray.length === 0 &&
                    <div className="flex favourites_component-404">
                        <img src={require("../assets/images/iron404.png")} alt="iron man" />
                        <div>
                            <h1>UPS!</h1>
                            <h6>Seems that you don't have any favourites comics yet</h6>
                        </div>
                    </div>
                }
                {
                    localFavsArray.map((comic) => {
                        return (
                            <div className="flex myFavoriteDiv mb-4" key={comic.id}>
                                <img src={require("../assets/icons/btn-delete.png")} alt="btn-delete" className="myFavoriteDiv-delete" onClick={()=> deleteFavComicFromService(comic)}/>
                                <img src={comic.thumbnail.path + '.' + comic.thumbnail.extension} alt={comic.title} className="myFavoriteImg"/>
                                <h6 className="title mt-2">{ comic.title }</h6>
                            </div>
                        );
                    })
                }
            </div>
            <Toast ref={toast} />
        </>
    );
  }
  
export default AllFavoritesPage;