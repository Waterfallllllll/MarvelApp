import { useState } from "react";
import { Link } from "react-router-dom/cjs/react-router-dom.min";
import { Formik, Form, Field, ErrorMessage } from "formik";
import * as Yup from "yup";
import "./charSearch.scss";
import useMarvelService from "../../services/MarvelService";

const CharSearch = () => {
    const [char, setChar] = useState(null); // Сюда помещается персонаж, который был найден в нашей апишке
    const { loading, error, getCharacterByName, clearError } =
        useMarvelService();

    const onCharLoaded = (char) => {
        setChar(char);
    };

    const updateChar = (name) => {
        clearError();

        getCharacterByName(name).then(onCharLoaded);
    };

    const errorMessage = 

    return (
        <Formik
            initialValues={{ name: "" }}
            validationSchema={Yup.object({
                name: Yup.string().required("This field is required"),
            })}
            onSubmit={({ name }) => {
                updateChar(name);
            }}
        >
            <Form className="char__search">
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
                >
                    <div className="inner">Find</div>
                </button>
                <ErrorMessage
                    className="char__search-error"
                    name="name"
                    component="div"
                />
            </Form>
        </Formik>
    );
};

export default CharSearch;
