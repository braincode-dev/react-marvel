import { useHttp } from '../hooks/http.hook';

const useMarvelService = () => {

    const { request, clearError, proccess, setProccess  } = useHttp();

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

    const getComic = async (id) => {
        const url = `${_apiBase}/comics/${id}?apikey=${_apiKey}&ts=1&hash=${_apiHash}`;
        const res = await request(url);
        return _transformComics(res.data.results[0]);
    }

    const getCharacterByName = async (name) => {
        const url = `${_apiBase}/characters?name=${name}&apikey=${_apiKey}&ts=1&hash=${_apiHash}`;
        const res = await request(url);
        return res.data.results.map(_transformCharacter);
    }

    const _transformComics = (comics) => {
        return {
            id: comics.id,
            title: comics.title,
            description: comics.description || 'There is not description',
            price: comics.prices[0].price > 0 ? `${comics.prices[0].price}$` : 'Not available',
            language: comics.textObjects.language || 'en-us',
            image: comics.thumbnail.path + '.' + comics.thumbnail.extension,
            pageCount: comics.pageCount > 0 ? `${comics.pageCount} pages` : 'Unknown number of pages'
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

    return {proccess, setProccess, getAllCharacters, getCharacter, clearError, getAllComics, getComic, getCharacterByName};
}

export default useMarvelService;