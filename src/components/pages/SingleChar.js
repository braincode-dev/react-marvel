import { Link, useParams } from "react-router-dom";
import { useState, useEffect } from "react";
import useMarvelService from "../../services/MarvelService";
import AppBanner from "../appBanner/AppBanner";
import setContent from "../../utils/setContent";

import './singleComic.scss';

const SingleComic = () => {

    const {charId} = useParams();
    const [char, setChar] = useState(null);
    const { proccess, setProccess, getCharacter, clearError } = useMarvelService();

    useEffect(() => {
        updateChar();
    }, [charId]);

    const updateChar = () => {
        clearError();
        getCharacter(charId)
          .then((res) => onCharLoaded(res))
          .then(() => setProccess('confirmed'));
      };

    const onCharLoaded = (char) => {
        setChar(char);
    };  

    return (
        <>
            <AppBanner />
            <div className="single-comic">
                {setContent(proccess, View, char)}
            </div>
        </>
    )
}

const View = ({data}) => {

    const {image, description, name} = data;
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