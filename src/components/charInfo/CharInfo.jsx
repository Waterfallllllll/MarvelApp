import { useState, useEffect } from "react";
import { Link } from "react-router-dom/cjs/react-router-dom.min";
import PropTypes from "prop-types";

import useMarvelService from "../../services/MarvelService";
import setContent from "../../utils/setContent";

import "./charInfo.scss";

const CharInfo = (props) => {
    const [char, setChar] = useState(null);
    const [comicChar, setComicChar] = useState(null);

    const { getCharacter, clearError, process, setProcess, getAllComics } =
        useMarvelService();

    useEffect(() => {
        updateChar();
    }, [props.charId]);

    useEffect(() => {
        updateComicChar();
    }, []);

    const updateChar = () => {
        const { charId } = props;
        if (!charId) {
            return;
        }

        clearError();
        getCharacter(charId).then(onCharLoaded).then(() => setProcess("confirmed"));
    };

    const updateComicChar = () => {
        getAllComics().then(onComicCharLoaded);
    };

    const onCharLoaded = (char) => {
        setChar(char);
    };

    const onComicCharLoaded = (comicChar) => {
        setComicChar(comicChar);
    };

    return (
        <div className="char__info">
            {
                setContent(process, View, char, comicChar)
            }
        </div>
    );
};

const View = ({ data, comicChar }) => {
    const { name, description, thumbnail, homepage, wiki, comics } = data;

    let imgStyle = { objectFit: "cover" };
    if (
        thumbnail ===
        "http://i.annihil.us/u/prod/marvel/i/mg/b/40/image_not_available.jpg"
    ) {
        imgStyle = { objectFit: "contain" };
    }

    return (
        <>
            <div className="char__basics">
                <img src={thumbnail} alt={name} style={imgStyle} />
                <div>
                    <div className="char__info-name">{name}</div>
                    <div className="char__btns">
                        <a href={homepage} className="button button__main">
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
            <ul className="char__comics-list">
                {comics.length > 0
                    ? null
                    : "There is no comics with this character"}
                {comics.map((item, i) => {
                    return comicChar.map((comic) => {
                        if (i > 9) return;
                        if (comic.title === item) {
                            return (
                                <Link
                                    to={`/comics/${comic.id}`}
                                    key={i}
                                    className="char__comics-item"
                                >
                                    {item}
                                </Link>
                            );
                        }
                    });
                })}
            </ul>
        </>
    );
};

CharInfo.propTypes = {
    charId: PropTypes.number,
};

export default CharInfo;
