import {Component} from 'react';
import PropTypes from 'prop-types';
import './charList.scss';
import MarvelService from '../../services/MarvelService';
import Spinner from '../spinner/Spinner';
import ErrorMessage from '../errorMessage/ErrorMessage';

class CharList extends Component {

    state = {
        chars: [],
        loaded: true,
        error: false,
        loadingMore: false,
        offset: 210,
        charsDataEnded: false
    }

    marvelService = new MarvelService();

    componentDidMount = () => {
        this.getAllChars();
    }

    onCharsListLoaded = (newCharsList) => {
        let ended = false;
        if (newCharsList.length < 9){
            ended = true;
        }

        this.setState(({chars, offset}) => ({
            chars: [...chars, ...newCharsList], 
            loaded: false,
            loadingMore: false,
            offset: offset + 9,
            charsDataEnded: ended
        }));
    }

    onError = () => {
        this.setState({
            error: true,
            loaded: false
        });
    }

    getAllChars = () => {
        this.onRequest();
    }

    onRequest = (offset) => {
        this.onCharListLoadingMore();
        this.marvelService
            .getAllCharacters(offset)
            .then(res => {
                this.onCharsListLoaded(res);
            }).catch(this.onError)
    }

    onCharListLoadingMore = () => {
        this.setState({
            loadingMore: true
        })
    }

    // Ref
    // itemRefs = [];

    // setRef = (ref) => {
    //     this.itemRefs.push(ref);
    // }

    // focusOnItem = (id) => {
        // Я реализовал вариант чуть сложнее, и с классом и с фокусом
        // Но в теории можно оставить только фокус, и его в стилях использовать вместо класса
        // На самом деле, решение с css-классом можно сделать, вынеся персонажа
        // в отдельный компонент. Но кода будет больше, появится новое состояние
        // и не факт, что мы выиграем по оптимизации за счет бОльшего кол-ва элементов

        // По возможности, не злоупотребляйте рефами, только в крайних случаях
        // this.itemRefs.forEach(item => item.classList.remove('char__item_selected'));
        // this.itemRefs[id].classList.add('char__item_selected');
        // this.itemRefs[id].focus();
    // }

    renderItems = (arr) => {
        const itemsList = arr.map((item, i) => {

            let imageStyle = {objectFit: 'cover'};
            if (item.image === 'http://i.annihil.us/u/prod/marvel/i/mg/b/40/image_not_available.jpg') {
                imageStyle = {objectFit: 'contain'};
            }

            return (
                <li key={item.id} 
                    className="char__item"
                    onClick={() => { 
                        this.props.onSelectedChar(item.id);
                        // this.focusOnItem(i);
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
    
    render() {
        const {chars, loaded, error, loadingMore, offset, charsDataEnded} = this.state;

        const spinner = loaded ? <Spinner/> : null;
        const errorMessage = error ? <ErrorMessage /> : null;  
        const content = !(loaded || error) ? this.renderItems(chars) : null;
        const buttonStyle = charsDataEnded ? { 'display': 'none' } : null;

        return (
            <div className="char__list">

                {spinner}
                {errorMessage}
                {content}
                
                <button style={buttonStyle} className="button button__main button__long"
                    disabled={loadingMore}
                    onClick={() => this.onRequest(offset)} 
                    >
                    <div className="inner">load more</div>
                </button>
            </div>
        )
    }
}

CharList.propTypes = {
    onSelectedChar: PropTypes.func.isRequired
}

export default CharList;