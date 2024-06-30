import React, { useState } from "react";
import styles from "../css/login.module.css";
import { Warning } from "../components/Components";
import { useNavigate, useLocation } from 'react-router-dom';
import { signup } from "../script/api";
import { Loading } from "../components/Components";

export default function Signup() {
    const [message, setMessage] = useState('');
    const [error, setError] = useState('');
    const [loading, setLoading] = useState(false);

    const navigate = useNavigate();
    const moveHomeScreen = () => {
        navigate('/')
    }
    const useQuery = () => {
        return new URLSearchParams(useLocation().search);
    }
    const query = useQuery();
    const test_id = query.get('test_id');
    if (!test_id) {
        return <Warning>
            <p>Your Test form link is not valid plese try correct URL.</p>
            <br />
            <button className="btn" onClick={moveHomeScreen}>
                Go To Home Screen
            </button>
        </Warning>
    }

    const handleSubmit = async (event) => {
        event.preventDefault();
        setLoading(true);
        const formData = new FormData(event.target);
        const formDataObject = Object.fromEntries(formData.entries());

        try {
            const response = await signup(formDataObject, test_id);
            setMessage(response.message);
            setError('');
        } catch (error) {
            setError(error.error || 'An error occurred during Signup.');
            setMessage('');
        } finally {
            setLoading(false);
        }
    }

    return (
        <>
        {loading && <Loading />}
        <div className={styles.main}>
            <div className={styles.container}>
                <h2>Welcome Student!</h2>
                <p>Enter Your Details for apply in test</p>
                {message && <div className={styles.message}><p className={styles.success}>{message}</p></div>}
                {error && <div className={styles.message}><p className={styles.error}>{error}</p></div>}
                <form className={styles.box} onSubmit={handleSubmit}>
                    <div className={styles.input}>
                        <i className="uil uil-user"></i>
                        <input type="text" name="name" placeholder="Enter Your Name" required />
                    </div>
                    <div className={styles.input}>
                        <i className="uil uil-envelope"></i>
                        <input type="email" name="email" placeholder="Enter Email" required />
                    </div>
                    <div className={`${styles.input}`}>
                        <i className="uil uil-paperclip" id="icon"></i>
                        <input type="text" name="resume_link" placeholder="Resume Drive Link" required />
                    </div>
                    <button type="submit" className={styles.input}>Signup</button>
                </form>
            </div>
        </div>
        </>
    );
}