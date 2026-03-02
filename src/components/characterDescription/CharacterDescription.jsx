import "./characterDescription.scss";
import loki from "../../resources/img/loki.jpg"

const CharacterDescription = () => {
    return (
        <div className="character-description">
            <div className="character-description__grid">
                <img
                    src={loki}
                    alt="loki"
                    className="character-description__img"
                />
                <div className="character-description__wrapper">
                    <div className="character-description__title">LOKI</div>
                    <div className="character-description__text">
                        In Norse mythology, Loki is a god or jötunn (or both).
                        Loki is the son of Fárbauti and Laufey, and the brother
                        of Helblindi and Býleistr. By the jötunn Angrboða, Loki
                        is the father of Hel, the wolf Fenrir, and the world
                        serpent Jörmungandr. By Sigyn, Loki is the father of
                        Nari and/or Narfi and with the stallion Svaðilfari as
                        the father, Loki gave birth—in the form of a mare—to the
                        eight-legged horse Sleipnir. In addition, Loki is
                        referred to as the father of Váli in the Prose Edda.
                    </div>
                </div>
            </div>
        </div>
    );
};

export default CharacterDescription;


