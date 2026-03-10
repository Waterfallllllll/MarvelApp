import { Helmet } from "react-helmet";

import "./singleCharacterLayout.scss";

const SingleCharacterLayout = ({ data }) => {

    const { name, description, thumbnail } = data;

    return (
        <div className="character-description">
            <Helmet>
                <meta name="description" content={`${name} character`} />
                <title>{name}</title>
            </Helmet>
            <div className="character-description__grid">
                <img
                    src={thumbnail}
                    alt={name}
                    className="character-description__img"
                />
                <div className="character-description__wrapper">
                    <div className="character-description__title">{name}</div>
                    <div className="character-description__text">
                        {description}
                    </div>
                </div>
            </div>
        </div>
    );
};

export default SingleCharacterLayout;


