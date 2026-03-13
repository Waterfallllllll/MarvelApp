import { useState } from "react";
import { Link } from "react-router-dom/cjs/react-router-dom.min";
import { Formik, Form, Field, ErrorMessage as FormikErrorMessage } from "formik";
import * as Yup from "yup";
import "./charSearch.scss";
import useMarvelService from "../../services/MarvelService";
import ErrorMessage from "../errorMessage/ErrorMessage";

const setContent = (process, results) => {
    switch (process) {
        case "waiting":
            return null;
        case "loading":
            return null;
        case "confirmed":
            return results;
        case "error":
            return <ErrorMessage />;
        default:
            throw new Error("Unexpected process state");
    }
}

const CharSearch = () => {
    const [char, setChar] = useState(null); // Сюда помещается персонаж, который был найден в нашей апишке
    const { getCharacterByName, clearError, process, setProcess } =
        useMarvelService();

    const onCharLoaded = (char) => {
        setChar(char);
    };

    const updateChar = (name) => {
        clearError();
        getCharacterByName(name).then(onCharLoaded).then(() => setProcess("confirmed"));
    };

    const results = !char ? null : char.length > 0 ?
        <div className="char__search-wrapper">
            <div className="char__search-success">There is! Visit {char[0].name} page?</div>
            <Link to={`/characters/${char[0].id}`} className="button button__secondary char__search-gray-btn">
                <div className="inner">To page</div>
            </Link>
        </div> :
        <div className="char__search-error">
            The character was not found. Check the name and try again
        </div>;

    return (
        <div className="char__search">
            <Formik
                initialValues={{ name: "" }}
                validationSchema={Yup.object({
                    name: Yup.string().required("This field is required"),
                })}
                onSubmit={({ name }) => {
                    updateChar(name);
                }}
            >
                <Form>
                    <h2 className="char__search-title">
                        Or find a character by name:
                    </h2>
                    <Field
                        className="char__search-input"
                        placeholder="Enter name"
                        id="name"
                        name="name"
                        type="text"
                    />
                    <button
                        type="submit"
                        className="button button__main char__search-button"
                        disabled={process === "loading"}
                    >
                        <div className="inner">Find</div>
                    </button>
                    <FormikErrorMessage
                        className="char__search-error"
                        name="name"
                        component="div"
                    />
                </Form>
            </Formik>
            {setContent(process, results)}
        </div>
    );
};

export default CharSearch;
