import { useState, useEffect } from "react";
import PropTypes from 'prop-types';
import useMarvelService from "../../services/MarvelService";
import ErrorMessage from "../errorMessage/ErrorMessage";
import Spinner from "../spinner/Spinner";
import Skeleton from "../skeleton/Skeleton";

import "./charInfo.scss";

const CharInfo = (props) => {
  const [char, setChar] = useState(null);
  const { loading, error, getCharacter, clearError } = useMarvelService();

  useEffect(() => {
    updateChar();
  }, [props.charId])

  const updateChar = () => {
    const { charId } = props;
    if (!charId) {
      return;
    }

    clearError();
    getCharacter(charId)
      .then((res) => onCharLoaded(res));
  };

  const onCharLoaded = (char) => {
    setChar(char);
  };

  const skeleton = char || loading || error ? null : <Skeleton />;
  const errorMessage = error ? <ErrorMessage /> : null;
  const spinner = loading ? <Spinner /> : null;
  const content = !(error || loading || !char) ? <View char={char} /> : null;

  return (
    <div className="char__info">
      {skeleton}
      {errorMessage}
      {spinner}
      {content}
    </div>
  );
}

const View = ({ char }) => {
  const { name, description, image, homelink, wiki, comics } = char;
  let imageStyle = {objectFit: 'cover'};
  if (image === 'http://i.annihil.us/u/prod/marvel/i/mg/b/40/image_not_available.jpg') {
    imageStyle = {objectFit: 'contain'};
  }

  return (
    <>
      <div className="char__basics">
        <img src={image} style={imageStyle} alt="name" />
        <div>
          <div className="char__info-name">{name}</div>
          <div className="char__btns">
            <a href={homelink} className="button button__main">
              <div className="inner">homepage</div>
            </a>
            <a href={wiki} className="button button__secondary">
              <div className="inner">Wiki</div>
            </a>
          </div>
        </div>
      </div>
      <div className="char__descr">{description}</div>
      <div className="char__comics">Comics:</div>
      {comics.length > 0 ? null : 'There is no comics with this character' }
      <ul className="char__comics-list">
        {
            comics.slice(0, 10).map((item, i) => (
                <li key={i} className="char__comics-item">
                  {item.name}
                </li>
              ))
        } 
      </ul>
    </>
  );
};

CharInfo.propTypes = {
  charId: PropTypes.number
}

export default CharInfo;
