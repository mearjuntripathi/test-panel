import React, { useState, useEffect } from 'react';
import { Timer, QuestionBox, Navigation } from './Components';
import { Warning } from './Components';
import { submitResponse } from "../script/api";

export default function TestPanel({ questions, handleOut }) {
    const [message,setMessage] = useState('');
    const [warning, setWarning] = useState(false);
    const [alert, setAlert] = useState(false);
    const initialResponses = questions.map(question => ({
        question: question.question,
        answer: question.answer,
        response: ''
    }));

    const [timeLeft, setTimeLeft] = useState(6 * 60);
    const [currentQuestion, setCurrentQuestion] = useState(0);
    const [responses, setResponses] = useState(initialResponses);

    const storeResponse = (questionId, response) => {
        setResponses(prevResponses => 
            prevResponses.map(item => 
                item.question === questions.find(q => q.id === questionId).question
                ? { ...item, response: response }
                : item
            )
        );
    };

    const speak = (text) => {
        if ('speechSynthesis' in window) {
            const utterance = new SpeechSynthesisUtterance(text);
            window.speechSynthesis.speak(utterance);
        } else {
            console.warn('Speech synthesis not supported');
        }
    };

    const handleSubmit = async() => {
        console.log('User responses:', responses);
        let score = 0;
        responses.map(response => response.answer === response.response ? score++ : score);
        console.log(score);
        await submitResponse(score, responses);
        setMessage('You have sucessfully finished You test see you later');
        setWarning(true);
        // Here you can process the responses, such as sending them to an API, calculating the score, etc.
    };

    useEffect(() => {
        const timer = setInterval(() => {
            setTimeLeft(prev => {
                if (prev === 1) {
                    clearInterval(timer);
                    handleSubmit();
                    return 0;
                }
                if(prev == 5*60){
                    speak('Only 5 minutes left');
                    setAlert(true);
                }
                return prev > 0 ? prev - 1 : 0;
            });
        }, 1000);
        return () => clearInterval(timer);
    }, []);

    return (
        <>
        {alert && (
            <Warning>
                <p>Only 5 min left</p>
                <button className='btn' onClick={()=>{setAlert(false)}}>I understand</button>
            </Warning>
        )}
        {warning && (
                <Warning>
                    <p>{message}</p>
                    <br />
                    <button className="btn" onClick={handleOut}>
                        Go to Homescreen
                    </button>
                </Warning>
            )}
            <Timer timeLeft={timeLeft} />
            <QuestionBox
                question={questions[currentQuestion]}
                changeQuestion={setCurrentQuestion}
                totalQuestions={questions.length}
                currentQuestion={currentQuestion}
                storeResponse={storeResponse}
                selectedOption={responses.find(r => r.question === questions[currentQuestion].question).response}
            />
            <Navigation
                totalQuestions={questions.length}
                currentQuestion={currentQuestion}
                changeQuestion={setCurrentQuestion}
                handleSubmit={handleSubmit}
                responses={responses}
            />
        </>
    );
}
