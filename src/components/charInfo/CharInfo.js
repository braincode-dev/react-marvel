import { useState, useEffect } from "react";
import PropTypes from 'prop-types';
import useMarvelService from "../../services/MarvelService";
import setContent from "../../utils/setContent";

import "./charInfo.scss";

const CharInfo = (props) => {
  const [char, setChar] = useState(null);
  const { getCharacter, clearError, proccess, setProccess } = useMarvelService();

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
      .then((res) => onCharLoaded(res))
      .then(() => setProccess('confirmed'));
  };

  const onCharLoaded = (char) => {
    setChar(char);
  };

  
  return (
    <div className="char__info">
      {setContent(proccess, View, char)}
    </div>
  );
}

const View = ({ data }) => {
  const { name, description, image, homelink, wiki, comics } = data;
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
                  {/* <Link to={`/comics/${item.id}`}> */}
                    {item.name}
                  {/* </Link> */}
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
