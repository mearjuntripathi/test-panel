import React from "react";
import { Link } from "react-router-dom";
import "../css/error.css";

export default function Error() {
    return <div className="error">
        <div className="inner-div">
            <h1>Oops!</h1>
            <h2>404 - Page Not Found</h2>
            <Link to="/" className="btn">Go to Home Page</Link>
        </div>
    </div>

}