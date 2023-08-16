import { useState } from "react";
import Modal from "./Modal";
import { Link } from "react-router-dom";

function Card(props) {

    const [modalVisible, setModalVisible] = useState(false);
    const [getComicURL, setComicURL] = useState('');

    const show = comicUrl => {
        setComicURL(comicUrl.slice(0,4) + 's' + comicUrl.slice(4));
        setModalVisible(true);
    }

    const dismissModal = () => {
        setModalVisible(false);
    };

    return (
        <>
            <article className="flex">
                <div className="flex card-top">
                    <div>
                        <img src={props.heroe.thumbnail.path + '.' + props.heroe.thumbnail.extension} alt={props.heroe.name} />
                    </div>
                    <div className="card-top-right">
                        <h4 className="title">{props.heroe.name}</h4>
                        <p>
                            { props.heroe.description === '' || props.heroe.description === "" ? 'No description found': props.heroe.description  }
                        </p>
                        <Link to={"character/" + props.heroe.id} >
                            <button className="btn btn-danger title">
                                VIEW MORE
                            </button>
                        </Link>
                    </div>
                </div>
                <div className="card-bottom">
                    <h5 className="title gray-title">Related comics</h5>
                    <div className="flex card-bottom-comics">
                        <span onClick={() => show(props.heroe.comics.items[0].resourceURI)} className="span-hover">{props.heroe.comics.items[0]?.name}</span>
                        <span onClick={() => show(props.heroe.comics.items[1].resourceURI)} className="span-hover">{props.heroe.comics.items[1]?.name}</span>
                        <span onClick={() => show(props.heroe.comics.items[2].resourceURI)} className="span-hover">{props.heroe.comics.items[2]?.name}</span>
                        <span onClick={() => show(props.heroe.comics.items[3].resourceURI)} className="span-hover">{props.heroe.comics.items[3]?.name}</span>
                        { 
                            props.heroe.comics.available === 0 ? <span>No associated comics found</span> : ''
                        }
                    </div>
                </div>
            </article>
           { modalVisible && <Modal hideModal={dismissModal} comicURL={getComicURL} updateFavsArray={props.updateFavsArray}/> }
        </>
        
    );
  }
  
  export default Card;
