import { Formik, Form, Field, ErrorMessage } from "formik";
import * as Yup from "yup";
import "./charSearch.scss";

const CharSearch = () => {
    return (
        <Formik
            initialValues={{ name: "" }}
            validationSchema={Yup.object({
                name: Yup.string().required("This field is required"),
            })}
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
