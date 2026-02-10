import ErrorMessage from "../errorMessage/ErrorMessage";
import { Link, useHistory } from "react-router-dom";

const Page404 = () => {
    const history = useHistory();

    return (
        <div>
            <ErrorMessage />
            <p
                style={{
                    textAlign: "center",
                    fontWeight: "bold",
                    fontSize: "24px",
                }}
            >
                Page doesn't exist
            </p>
            <Link
                style={{
                    display: "block",
                    textAlign: "center",
                    fontWeight: "bold",
                    fontSize: "24px",
                    marginTop: "30px",
                }}
                to="#"
                onClick={(e) => {
                    e.preventDefault();
                    history.goBack();
                }}
            >
                Back to previous page
            </Link>
            <Link
                style={{
                    display: "block",
                    textAlign: "center",
                    fontWeight: "bold",
                    fontSize: "24px",
                    marginTop: "30px",
                }}
                to="/"
            >
                Back to main page
            </Link>
        </div>
    );
};

export default Page404;
