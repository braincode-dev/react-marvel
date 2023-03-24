import {useState, useEffect, useRef} from 'react';
import PropTypes from 'prop-types';
import './charList.scss';
import useMarvelService from '../../services/MarvelService';
import Spinner from '../spinner/Spinner';
import ErrorMessage from '../errorMessage/ErrorMessage';

const setContent = (proccess, Component, loadingMore  ) => {
    switch (proccess){
      case 'waiting':
        return <Spinner />; 
      case 'loading':
        return loadingMore ? <Component/> : <Spinner />;
      case 'confirmed':
          return <Component/>;
      case 'error':
        return <ErrorMessage />;
      default:
        throw new Error('Unexpected proccess state.');
    }
}

const CharList = (props) => {
    const [chars, setChars] = useState([]);
    const [loadingMore, setLoadingMore] = useState(false);
    const [offset, setOffset] = useState(210);
    const [charsDataEnded, setCharsDataEnded] = useState(false);

    const { getAllCharacters, proccess, setProccess } = useMarvelService();

    useEffect(() => {
        onRequest(offset, true);
        console.log(223);
    }, [])

    const onRequest = (offset, inicial) => {
        inicial ? setLoadingMore(false) : setLoadingMore(true);

        getAllCharacters(offset)
            .then(res => {
                onCharsListLoaded(res);
            })
            .then(() => setProccess('confirmed'));
    }

    const onCharsListLoaded = (newCharsList) => {
        let ended = false;
        if (newCharsList.length < 9){
            ended = true;
        }   

        setChars(chars => {
            return [...chars, ...newCharsList]
        });
        setLoadingMore(loadingMore => false);
        setOffset(() => offset + 9);
        setCharsDataEnded(charsDataEnded => ended);
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
                    key={i} 
                    
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
    
    const buttonStyle = charsDataEnded ? { 'display': 'none' } : null;

    return (
        <div className="char__list">

            {setContent( proccess, () => renderItems(chars), loadingMore )}
            
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