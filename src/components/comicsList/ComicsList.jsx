import { useState, useEffect, createRef } from "react";
import { Link } from "react-router-dom";
import { CSSTransition, TransitionGroup } from "react-transition-group";

import useMarvelService from "../../services/MarvelService";
import Spinner from "../spinner/Spinner";
import ErrorMessage from "../errorMessage/ErrorMessage";

import "./comicsList.scss";

const setContent = (process, Component, newItemLoading) => {
    switch (process) {
        case "waiting":
            return <Spinner />;
            break;
        case "loading":
            return newItemLoading ? <Component /> : <Spinner />;
            break;
        case "confirmed":
            return <Component />;
            break;
        case "error":
            return <ErrorMessage />;
            break;
        default:
            throw new Error("Unexpected process state");
    }
}

const ComicsList = () => {
    const [comicsList, setComicsList] = useState([]);
    const [newItemLoading, setnewItemLoading] = useState(false);
    const [offset, setOffset] = useState(0);
    const [comicsEnded, setComicsEnded] = useState(false);

    const { loading, error, getAllComics, process, setProcess } = useMarvelService();

    useEffect(() => {
        onRequest(offset, true);
    }, []);

    const onRequest = (offset, initial) => {
        initial ? setnewItemLoading(false) : setnewItemLoading(true);
        getAllComics(offset).then(onComicsListLoaded).then(() => setProcess("confirmed"));
    };

    const onComicsListLoaded = (newComicsList) => {
        let ended = false;
        if (newComicsList.length < 8) {
            ended = true;
        }
        setComicsList([...comicsList, ...newComicsList]);
        setnewItemLoading(false);
        setOffset(offset + 8);
        setComicsEnded(ended);
    };

    function renderItems(arr) {
        const items = arr.map((item, i) => {
            const itemRef = createRef(null);
            return (
                <CSSTransition
                    key={item.id}
                    in={true}
                    tabIndex={0}
                    timeout={500}
                    classNames="comics__item"
                    nodeRef={itemRef}
                >
                    <li className="comics__item" key={i} ref={itemRef}>
                        <Link to={`/comics/${item.id}`}>
                            <img
                                src={item.picture}
                                alt={item.title}
                                className="comics__item-img"
                            />
                            <div className="comics__item-name">
                                {item.title}
                            </div>
                            <div className="comics__item-price">
                                {item.price}$
                            </div>
                        </Link>
                    </li>
                </CSSTransition>
            );
        });

        return (
            <ul className="comics__grid">
                <TransitionGroup component={null}>{items}</TransitionGroup>
            </ul>
        );
    }

    return (
        <div className="comics__list">
            {setContent(process, () => renderItems(comicsList), newItemLoading)}
            <button
                disabled={newItemLoading}
                style={{ display: comicsEnded ? "none" : "block" }}
                className="button button__main button__long"
                onClick={() => onRequest(offset)}
            >
                <div className="inner">load more</div>
            </button>
        </div>
    );
};

export default ComicsList;
