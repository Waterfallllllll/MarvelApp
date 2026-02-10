import { useHttp } from "../hooks/useHttp";

const useMarvelService = () => {
    const { loading, request, error, clearError } = useHttp();

    const _apiBase = "https://marvel-server-zeta.vercel.app/";
    const _apiKey = "apikey=d4eecb0c66dedbfae4eab45d312fc1df";
    const _baseOffset = 0;
    const _baseLimit = 9;
    const _baseComicOffset = 0;
    const _baseComicLimit = 8;

    const getResource = async (url) => {
        let res = await fetch(url);

        if (!res.ok) {
            throw new Error(`Could not fetch ${url}, status: ${res.status}`);
        }

        return await res.json();
    };

    const getAllComics = async (
        offset = _baseComicOffset,
        limit = _baseComicLimit
    ) => {
        const res = await getResource(
            `https://marvel-server-zeta.vercel.app/comics?limit=${limit}&offset=${offset}&${_apiKey}`
        );

        return res.data.results.map(_transformComics);
    };

    const getComic = async (id) => {
        const res = await getResource(
            `https://marvel-server-zeta.vercel.app/comics/${id}?${_apiKey}`
        );

        console.log(res);

        return _transformComics(res.data.results[0]);
    };

    const getAllCharacters = async (
        offset = _baseOffset,
        limit = _baseLimit
    ) => {
        const res = await getResource(
            `${_apiBase}characters?limit=${limit}&offset=${offset}&${_apiKey}`
        );

        return res.data.results.map(_transformCharacter);
    };

    const getCharacter = async (id) => {
        const res = await getResource(`${_apiBase}characters/${id}?${_apiKey}`);

        return _transformCharacter(res.data.results[0]);
    };

    const _transformComics = (char) => {
        return {
            id: char.id,
            description: char.description,
            pages: char.pageCount,
            price: char.prices[0].price,
            languages: char.textObjects.languages,
            picture: char.thumbnail.path + "." + char.thumbnail.extension,
            title: char.title,
        };
    };

    const _transformCharacter = (char) => {
        return {
            id: char.id,
            name: char.name,
            description: char.description,
            thumbnail: char.thumbnail.path + "." + char.thumbnail.extension,
            homepage: char.urls[0].url,
            wiki: char.urls[1].url,
            comics: char.comics.items,
        };
    };

    return {
        loading,
        error,
        clearError,
        getAllCharacters,
        getCharacter,
        getAllComics,
        getComic,
    };
};

export default useMarvelService;
