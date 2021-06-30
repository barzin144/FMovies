import React from "react";
import { Link } from "react-router-dom";

const NotFound = () => {

    return (
        <div className="container container--pall">
            <div className="notFound flex flex-jc-c flex-ai-c">
                <h1 className="notFound__text">Oo0ps, 404 Error</h1>
                <h1 className="notFound__text">Page not found :(</h1>
                <Link className="notFound__link" to="/">Home</Link>
            </div>
        </div>
    );
}

export default NotFound;