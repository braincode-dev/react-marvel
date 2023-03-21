import {useState, useEffect, useRef} from 'react';
import PropTypes from 'prop-types';
import './charList.scss';
import MarvelService from '../../services/MarvelService';
import Spinner from '../spinner/Spinner';
import ErrorMessage from '../errorMessage/ErrorMessage';

const CharList = (props) => {

    const [chars, setChars] = useState([]);
    const [loaded, setLoaded] = useState(true);
    const [error, setError] = useState(false);
    const [loadingMore, setLoadingMore] = useState(false);
    const [offset, setOffset] = useState(210);
    const [charsDataEnded, setCharsDataEnded] = useState(false);

    const marvelService = new MarvelService();

    useEffect(() => {
        onRequest();
    }, [])

    const onCharsListLoaded = (newCharsList) => {
        let ended = false;
        if (newCharsList.length < 9){
            ended = true;
        }

        setChars(chars => [...chars, ...newCharsList]);
        setLoaded(loaded => false);
        setLoadingMore(loadingMore => false);
        setOffset(offset => offset + 9);
        setCharsDataEnded(charsDataEnded => ended);
    }

    const onError = () => {
        setError(error => true);
        setLoaded(loaded =>  false);
    }

    const onRequest = (offset) => {
        onCharListLoadingMore();

        marvelService
            .getAllCharacters(offset)
            .then(res => {
                onCharsListLoaded(res);
            }).catch(onError)
    }

    const onCharListLoadingMore = () => {
        setLoadingMore(true);
    }

    // Ref
    const itemRefs = useRef([]);

    const focusOnItem = (id) => {
        itemRefs.current.forEach(item => item.classList.remove('char__item_selected'));
        itemRefs.current[id].classList.add('char__item_selected');
        itemRefs.current[id].focus();
    }

    function renderItems(arr){
        const itemsList = arr.map((item, i) => {

            let imageStyle = {objectFit: 'cover'};
            if (item.image === 'http://i.annihil.us/u/prod/marvel/i/mg/b/40/image_not_available.jpg') {
                imageStyle = {objectFit: 'contain'};
            }

            return (
                <li 
                    className="char__item"
                    tabIndex={0}
                    ref={el => itemRefs.current[i] = el}
                    key={item.id} 
                    
                    onClick={() => { 
                        props.onSelectedChar(item.id);
                        focusOnItem(i);
                    }}
                    >
                    <img src={item.image} style={imageStyle} alt="abyss"/>
                    <div className="char__name">{item.name}</div>
                </li>
            )
        })

        return (
            <ul className="char__grid">
                {itemsList}
            </ul>
        )
    }
    


    const spinner = loaded ? <Spinner/> : null;
    const errorMessage = error ? <ErrorMessage /> : null;  
    const content = !(loaded || error) ? renderItems(chars) : null;
    const buttonStyle = charsDataEnded ? { 'display': 'none' } : null;

    return (
        <div className="char__list">

            {spinner}
            {errorMessage}
            {content}
            
            <button style={buttonStyle} className="button button__main button__long"
                disabled={loadingMore}
                onClick={() => onRequest(offset)} 
                >
                <div className="inner">load more</div>
            </button>
        </div>
    )
}

CharList.propTypes = {
    onSelectedChar: PropTypes.func.isRequired
}

export default CharList;