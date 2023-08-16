import { Toast } from "primereact/toast";
import { useRef } from "react";
import { deleteFavComic, favsArray } from '../services/SuperHeroesService';
import { Link } from "react-router-dom";

function FavoritesList(props) {

    const toast = useRef(null);

    const deleteFavComicFromService = (comic) => {
        deleteFavComic(comic);
        props.updateFavsArray([...favsArray]);
        toast.current.show({severity:'success', summary: 'Success', detail: `"${comic.title}" was removed from favourites`});
    };

    return (
        <aside className="selector">
            <div className="flex top-title mt-5 mb-5">
                <img src={require("../assets/icons/favourites.png")} alt="favourites" />
                <h2 className="title">My favourites</h2>
            </div>
            <div className="flex myFavoriteTotal">
                <p className="m-0">Total: {props.favsArray.length}</p>
                <Link className="gotofavourites" to="/favourites">View All</Link>
            </div>

            {
                props.favsArray.slice(-8).map(comic => {
                    return(
                        <div className="flex myFavoriteDiv mb-4" key={comic.id}>
                            <img className="myFavoriteDiv-delete" src={require("../assets/icons/btn-delete.png")} alt="btn-delete" onClick={()=> deleteFavComicFromService(comic)} />
                            <img className="myFavoriteImg" src={comic.thumbnail.path + '.' + comic.thumbnail.extension} alt={comic.title} />
                            <h6 className="title mt-2">{comic.title}</h6>
                        </div>
                    );
                })
            }
            <Toast ref={toast} />
        </aside>
    );
}

export default FavoritesList;