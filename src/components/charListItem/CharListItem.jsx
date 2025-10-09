import "./charListItem.scss";

const CharListItem = (props) => {
    const { name, thumbnail, onClick } = props;

    return (
        <li className="char__item" onClick={onClick}>
            <img src={thumbnail} alt="heroes" />
            <div className="char__name">{name}</div>
        </li>
    );
};

export default CharListItem;
