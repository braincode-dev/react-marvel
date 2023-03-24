import { Link, useParams } from "react-router-dom";
import { useState, useEffect } from "react";
import useMarvelService from "../../services/MarvelService";
import setContent from "../../utils/setContent";

import './singleComic.scss';

const SingleComic = () => {

    const {comicId} = useParams();
    const [comic, setComic] = useState(null);
    const { getComic, clearError, proccess, setProccess } = useMarvelService();

    useEffect(() => {
        updateComic();
    }, [comicId]);

    const updateComic = () => {
        clearError();
        getComic(comicId)
          .then((res) => onComicLoaded(res))
          .then(() => setProccess('confirmed'));
      };

    const onComicLoaded = (comic) => {
        setComic(comic);
    };  



    return (
        <div className="single-comic">
            {setContent(proccess, View, comic)}
        </div>
    )
}

const View = ({data}) => {

    const {image, description, title, language, price, pageCount} = data;
    return(
        <>
            <img src={image} alt="x-men" className="single-comic__img"/>
            <div className="single-comic__info">
                <h2 className="single-comic__name">{title}</h2>
                <p className="single-comic__descr">{description}</p>
                <p className="single-comic__descr">{pageCount}</p>
                <p className="single-comic__descr">Language: {language}</p>
                <div className="single-comic__price">{price}</div>
            </div>
            <Link to="../" className="single-comic__back">Back to all</Link>
        </>
    )
}

export default SingleComic;