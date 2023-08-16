import { useEffect, useRef, useState } from "react";
import { Dialog } from 'primereact/dialog';
import { ProgressSpinner } from 'primereact/progressspinner';
import { Toast } from 'primereact/toast';
import { getComics, favsArray } from '../services/SuperHeroesService';

function Modal(props) {
    const [visible, setVisible] = useState(true);
    const [currentComic, setCurrentComic] = useState(false);
    const [getShowSpinner, setShowSpinner] = useState(true);
    const [disableBtn, setDisableBtn] = useState(false);
    const [isComicAlreadyFav, setIsComicAlreadyFav] = useState(false);
    const toast = useRef(null);

    const hideModal = () => {
        setVisible(false);
        props.hideModal();
    }

    const addFavourite = (comic) => {
        if(disableBtn === false){
          favsArray.push(comic);
          props.updateFavsArray([...favsArray]);
          setDisableBtn(true);
          toast.current.show({ severity: 'success', summary: 'Success', detail: `"${comic.title}" was added to favourites` });
        }
        else return;
    }

    useEffect(() => {
        fetch(getComics(props.comicURL)).then((res) => res.json()).then((res) => {
            setCurrentComic(res.data.results[0]);
            setIsComicAlreadyFav(favsArray.find( fav => fav?.id === currentComic.id));
            if(isComicAlreadyFav) setDisableBtn(true);
            setShowSpinner(false);
        });
        
    }, [props.comicURL, isComicAlreadyFav, currentComic.id]);

    return(
        <Dialog header='' visible={visible} style={{ width: 'auto' }} onHide={hideModal} dismissableMask={true} className='primeDialog' draggable={false}> 
            <div className='flex modal-container'>
                {getShowSpinner && <ProgressSpinner />}
                {
                    currentComic &&
                    <>
                        <div className='comic_card_top'>
                            <img className='comic_card_top-img' src={currentComic.thumbnail.path + '.' + currentComic.thumbnail.extension} alt={currentComic.title} />
                            <div className='comic_card_top-right'>
                                <h4 className='title'>{currentComic.title}</h4>
                                <p>{ currentComic.description === null || currentComic.description === "" ? 'No description found': currentComic.description }</p>
                            </div>
                        </div>
                        <div className='comic_card_bottom'>
                            <button className='button-fav title' onClick={() => addFavourite(currentComic)} disabled={disableBtn}>
                                <img className='comic_card_bottom-img' src={require("../assets/icons/favourites.png")} alt='favourites icon' />
                                { disableBtn ? 'ADDED TO FAVOURITES' : 'ADD TO FAVOURITES ' }
                            </button>
                            <button className='button-buy title'>
                                <img className='comic_card_bottom-img' src={require("../assets/icons/shopping-cart-primary.png")} alt="shopping cart"/>
                                BUY FOR $3.99
                            </button>
                        </div>
                    </>
                    
                }  
            </div>
            <Toast ref={toast} />
        </Dialog>
    )
}

export default Modal;