import { Link, useParams } from "react-router-dom";
import { useState, useEffect } from "react";
import useMarvelService from "../../services/MarvelService";
import ErrorMessage from "../errorMessage/ErrorMessage";
import Spinner from "../spinner/Spinner";
import AppBanner from "../appBanner/AppBanner";

import './singleComic.scss';

const SingleComic = () => {

    const {charId} = useParams();
    const [char, setChar] = useState(null);
    const { loading, error, getCharacter, clearError } = useMarvelService();

    useEffect(() => {
        updateChar();
    }, [charId]);

    const updateChar = () => {
        clearError();
        getCharacter(charId)
          .then((res) => onCharLoaded(res));
      };

    const onCharLoaded = (char) => {
        setChar(char);
    };  

    const errorMessage = error ? <ErrorMessage /> : null;
    const spinner = loading ? <Spinner /> : null;
    const content = !(error || loading || !char) ? <View char={char} /> : null;

    return (
        <>
            <AppBanner />
            <div className="single-comic">
                {errorMessage}
                {spinner}
                {content}
            </div>
        </>
    )
}

const View = ({char}) => {

    const {image, description, name} = char;
    return(
        
        <>
            <img src={image} alt="x-men" className="single-comic__img"/>
            <div className="single-comic__info">
                <h2 className="single-comic__name">{name}</h2>
                <p className="single-comic__descr">{description}</p>
            </div>
            <Link to="../" className="single-comic__back">Back to all</Link>
        </>
    )
}

export default SingleComic;