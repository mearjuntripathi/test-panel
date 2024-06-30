import styles from "../css/login.module.css";
import React, { useState } from "react";
import { useNavigate } from 'react-router-dom';
import { login } from "../script/api";
import { Loading } from "../components/Components";


export default function Login({ setQuestions }) {
    const [error, setError] = useState('');
    const [loading,  setLoading] = useState(false);
    const navigate = useNavigate();

    const handleSubmit = async (event) => {
        event.preventDefault();
        const formData = new FormData(event.target);
        const formDataObject = Object.fromEntries(formData.entries());
        setLoading(true);
        try {
            const response = await login(formDataObject);
            window.localStorage.setItem('test_id', response[0].test_id);
            window.localStorage.setItem('test_name', response[0].test_name);
            window.localStorage.setItem('timing', response[0].timing);

            const formattedQuestions = response[0].questions.map(item => ({
                id: item.id,
                question: item.question,
                options: item.options,
                answer: item.answer
            }));
            
            setQuestions(formattedQuestions);
            console.log(formattedQuestions);
            navigate('/');
        } catch (error) {
            setError(error.error || 'An error occurred during login.');
        } finally {
            setLoading(false);
        }
    }

    return (
        <>
        {loading && <Loading />}
        <div className={styles.main}>
            <div className={styles.container}>
                <h2>Welcome Back Student!</h2>
                <p>Enter Your Credential to give test</p>
                {error && <div className={styles.message}><p className={styles.error}>{error}</p></div>}
                <form className={styles.box} onSubmit={handleSubmit}>
                    <div className={styles.input}>
                        <i className="uil uil-envelope"></i>
                        <input type="email" name="email" placeholder="Enter Email" required />
                    </div>
                    <div className={`${styles.input}`}>
                        <i className="uil uil-edit" id="icon"></i>
                        <input type="text" name="test_id" placeholder="Enter Test ID" required />
                    </div>
                    <button type="submit" className={styles.input}>Login</button>
                </form>
            </div>
        </div>
        </>
    );
}