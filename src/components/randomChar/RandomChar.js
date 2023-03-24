import { useState, useEffect } from "react";
import useMarvelService from "../../services/MarvelService";
import setContent from "../../utils/setContent";

import "./randomChar.scss";
import mjolnir from "../../resources/img/mjolnir.png";

const RandomChar = () => {

  const [char, setChar] = useState({});
  const {getCharacter, clearError, proccess, setProccess} = useMarvelService();

  useEffect(() => {
    updateCharacter();
  }, []);

  const onCharLoaded = (char) => {
    setChar(char);
  }; 

  const updateCharacter = () => {
    const id = Math.floor(Math.random() * (1011400 - 1011000) + 1011000);

    clearError();
    getCharacter(id)
        .then((res) => {
            onCharLoaded(res);
        })
        .then(() => setProccess('confirmed'));
  };

  return (
    <div className="randomchar">

      {setContent(proccess, View, char)}

      <div className="randomchar__static">
        <p className="randomchar__title">
          Random character for today!
          <br />
          Do you want to get to know him better?
        </p>
        <p className="randomchar__title">Or choose another one</p>
        <button className="button button__main" onClick={updateCharacter}>
          <div className="inner">try it</div>
        </button>
        <img src={mjolnir} alt="mjolnir" className="randomchar__decoration" />
      </div>
    </div>
  );
}

const View = ({data}) => {
  const { name, description, image, homelink, wiki } = data;

  let shortDescription = !description ? "Description is enpty" : description;
  if (shortDescription.length > 200) {
    shortDescription = shortDescription.substring(1, 200) + "...";
  }

  let imageStyle = {objectFit: 'cover'};
  if (image === 'http://i.annihil.us/u/prod/marvel/i/mg/b/40/image_not_available.jpg') {
    imageStyle = {objectFit: 'contain'};
  }

  return (
    <div className="randomchar__block">
      <img src={image} style={imageStyle} alt="Random character" className="randomchar__img" />
      <div className="randomchar__info">
        <p className="randomchar__name">{name}</p>
        <p className="randomchar__descr">{shortDescription}</p>
        <div className="randomchar__btns">
          <a href={homelink} className="button button__main">
            <div className="inner">homepage</div>
          </a>
          <a href={wiki} className="button button__secondary">
            <div className="inner">Wiki</div>
          </a>
        </div>
      </div>
    </div>
  );
};

export default RandomChar;
