import { useHttp } from '../hooks/http.hook';

const useMarvelService = () => {

    const { loading, error, request, clearError } = useHttp();

    const _apiBase = 'https://gateway.marvel.com:443/v1/public';
    const _apiKey = 'afb0879496bde582e1153a26d77bc870';
    const _apiHash = '0fcbe2baf170e86da574ccb72e1cfa48';

    const _offsetCharsList = 210;
    const _offsetComocsList = 8;

    const getAllCharacters = async (offset = _offsetCharsList) => {
        const url = `${_apiBase}/characters?limit=9&offset=${offset}&apikey=${_apiKey}&ts=1&hash=${_apiHash}`;
        const res = await request(url);
        return res.data.results.map(_transformCharacter);
    }

    const getCharacter = async (id) => {
        const url = `${_apiBase}/characters/${id}?apikey=${_apiKey}&ts=1&hash=${_apiHash}`;
        const res = await request(url);
        return _transformCharacter(res.data.results[0]);
    }

    const getAllComics = async (offset = _offsetComocsList) => {
        const url = `${_apiBase}/comics?limit=8&offset=${offset}&apikey=${_apiKey}&ts=1&hash=${_apiHash}`;
        const res = await request(url);
        return res.data.results.map(_transformComics);
    }

    const _transformComics = (comics) => {
        return {
            id: comics.id,
            title: comics.title,
            price: comics.prices[0].price,
            image: comics.thumbnail.path + '.' + comics.thumbnail.extension,
        }
    }

    const _transformCharacter = (char) => {
        return {
            id: char.id,
            name: char.name,
            description: char.description,
            image: char.thumbnail.path + '.' + char.thumbnail.extension,
            homelink: char.urls[0].url,
            wiki: char.urls[1].url,
            comics: char.comics.items
        }
    }

    return {loading, error, getAllCharacters, getCharacter, clearError, getAllComics};
}

export default useMarvelService;