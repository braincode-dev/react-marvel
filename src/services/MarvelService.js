class MarvelService {
    _apiBase = 'https://gateway.marvel.com:443/v1/public';
    _apiKey = 'afb0879496bde582e1153a26d77bc870';
    _apiHash = '0fcbe2baf170e86da574ccb72e1cfa48';

    _offsetCharsList = 210;

    getResource = async (url) => {
        let res = await fetch(url);
        if (!res.ok) {
            throw new Error (`Could not fetch ${url}`);
        }
        return await res.json();
    }

    getAllCharacters = async (offset = this._offsetCharsList) => {
        const url = `${this._apiBase}/characters?limit=9&offset=${offset}&apikey=${this._apiKey}&ts=1&hash=${this._apiHash}`;
        const res = await this.getResource(url);
        return res.data.results.map(this._transformCharacter);
    }

    getCharacter = async (id) => {
        const url = `${this._apiBase}/characters/${id}?apikey=${this._apiKey}&ts=1&hash=${this._apiHash}`;
        const res = await this.getResource(url);
        return this._transformCharacter(res.data.results[0]);
    }

    _transformCharacter = (char) => {
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
}

export default MarvelService;