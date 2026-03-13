import { useState, useEffect, useRef, createRef, useMemo } from "react";
import { CSSTransition, TransitionGroup } from "react-transition-group";
import Spinner from "../spinner/Spinner";
import ErrorMessage from "../errorMessage/ErrorMessage";
import useMarvelService from "../../services/MarvelService";

import "./charList.scss";

const setContent = (process, Component, newItemLoading) => {
    switch (process) {
        case "waiting":
            return <Spinner />;
        case "loading":
            return newItemLoading ? <Component /> : <Spinner />;
        case "confirmed":
            return <Component />;
        case "error":
            return <ErrorMessage />;
        default:
            throw new Error("Unexpected process state");
    }
}

const CharList = (props) => {
    const [charList, setCharList] = useState([]);
    const [newItemLoading, setNewItemLoading] = useState(false);
    const [offset, setOffset] = useState(0);
    const [charEnded, setCharEnded] = useState(false);

    const { loading, error, getAllCharacters, process, setProcess } = useMarvelService();

    useEffect(() => {
        onRequest(offset, true);
    }, []);

    const onRequest = (offset, initial) => {
        initial ? setNewItemLoading(false) : setNewItemLoading(true);
        getAllCharacters(offset).then(onCharListLoaded).then(() => setProcess("confirmed"));
    };

    const onCharListLoaded = (newCharList) => {
        let ended = false;
        if (newCharList.length < 9) {
            ended = true;
        }

        setCharList((charList) => [...charList, ...newCharList]);
        setNewItemLoading((newItemLoading) => false);
        setOffset((offset) => offset + 9);
        setCharEnded((charEnded) => ended);
    };

    const itemRefs = useRef([]);

    const focusOnItemRef = (id) => {
        itemRefs.current.forEach((item) =>
            item.classList.remove("char__item_selected"),
        );
        item.classList.remove("char__item_selected");

        itemRefs.current[id].classList.add("char__item_selected");
        itemRefs.current[id].focus();
    };

    const focusOnItem = (ref) => {
        ref.current.classList.add("char__item_selected");
        ref.current.focus();
    };

    const blurOnItem = (ref) => {
        ref.current.classList.remove("char__item_selected");
    };

    const renderItems = (arr) => {
        const items = arr.map((item, i) => {
            let imgStyle;
            if (item.thumbnail.includes("image_not_available")) {
                imgStyle = { objectFit: "unset" };
            }
            const itemRef = createRef(null);
            return (
                <CSSTransition
                    key={item.id}
                    in={true}
                    timeout={500}
                    classNames="char__item"
                    nodeRef={itemRef}
                >
                    <li
                        className="char__item"
                        key={item.id}
                        tabIndex={0}
                        ref={itemRef}
                        onClick={() => {
                            props.onCharSelected(item.id);
                            focusOnItem(itemRef);
                        }}
                        onBlur={() => blurOnItem(itemRef)}
                        onKeyPress={(e) => {
                            if (e.key === "Enter") {
                                props.onCharSelected(item.id);
                                focusOnItem(itemRef);
                            }
                        }}
                    >
                        <img
                            style={imgStyle}
                            src={item.thumbnail}
                            alt={item.name}
                        />
                        <div className="char__name">{item.name}</div>
                    </li>
                </CSSTransition>
            );
        });
        return (
            <ul className="char__grid">
                <TransitionGroup component={null}>{items}</TransitionGroup>
            </ul>
        );
    };

    const elements = useMemo(() => { return setContent(process, () => renderItems(charList), newItemLoading) }, [process, charList, newItemLoading]);

    return (
        <div className="char__list">
            {elements}
            <button
                className="button button__main button__long"
                disabled={newItemLoading}
                style={{ display: charEnded ? "none" : "block" }}
                onClick={() => onRequest(offset)}
            >
                <div className="inner">load more</div>
            </button>
        </div>
    );
};

export default CharList;
