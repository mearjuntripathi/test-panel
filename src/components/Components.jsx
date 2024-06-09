import React, { useState, useEffect } from "react";
import "../css/components.css";

// Preloader.JSX component

function Preloader() {
    return (<div id="preloader">
        <div className="jumper">
            <div></div>
            <div></div>
            <div></div>
            <div></div>
            <div></div>
        </div>
    </div>);
};


// Timer.jsx component

function Timer({ timeLeft }) {
    const minutes = Math.floor(timeLeft / 60);
    const seconds = timeLeft % 60;

    return (
        <div className="timer">
            <h1 class="span">
                <span className="minutes">{minutes}</span>:
                <span className="seconds">{seconds < 10 ? `0${seconds}` : seconds}</span>
            </h1>
        </div>
    );
};

// Question.jsx

function QuestionBox({ question, currentQuestion, totalQuestions, changeQuestion, storeResponse, selectedOption }) {
    const [localSelectedOption, setLocalSelectedOption] = useState(selectedOption);

    useEffect(() => {
        setLocalSelectedOption(selectedOption);
    }, [selectedOption]);

    const handleClearResponse = () => {
        setLocalSelectedOption(null); // Clear selected option
        storeResponse(question.id, null);
    };

    const handleOptionChange = (option) => {
        setLocalSelectedOption(option);
        storeResponse(question.id, option);
    };

    return (
        <div className="question-box">
            <h2 className="question">{question.question}</h2>
            <ul className="options">
                {question.options.map((option, index) => (
                    <li key={index} onClick={() => handleOptionChange(option)}>
                        <input
                            type="radio"
                            name={`question-${question.id}`}
                            value={option}
                            checked={localSelectedOption === option}
                        />
                        {option}
                    </li>
                ))}
            </ul>
            <div className="operation">
                <button
                    onClick={() => changeQuestion(prev => prev > 0 ? prev - 1 : 0)}
                    disabled={currentQuestion === 0}
                >
                    &#8249; Previous
                </button>
                <button onClick={handleClearResponse}>Clear Response</button>
                <button
                    onClick={() => changeQuestion(prev => prev < totalQuestions - 1 ? prev + 1 : totalQuestions - 1)}
                    disabled={currentQuestion === totalQuestions - 1}
                >
                    Next &#8250;
                </button>
            </div>
        </div>
    );
}

/* Navigation.jsx */

function Navigation({ totalQuestions, currentQuestion, changeQuestion, handleSubmit, responses }) {
    function toggleNavigation() {
        document.querySelector('.navigation').classList.toggle('show-navigation');
        const navigateButton = document.getElementById('navigate');
        navigateButton.innerHTML = navigateButton.innerHTML === '‹' ? '›' : '‹';
    }

    const getQuestionClass = (index) => {
        if (currentQuestion === index) {
            return 'active';
        }
        return responses[index]?.response ? 'green' : 'red';
    };

    return (
        <>
            <button id="navigate" onClick={toggleNavigation}>‹</button>
            <div className="navigation">
                <div className="options">
                    <div className="box red">Not Attempted <span className="number">{Object.values(responses).filter(response => response.response === '').length}</span></div>
                    <div className="box green">Attempted <span className="number">{Object.values(responses).filter(response => response.response !== '').length}</span></div>
                </div>
                <div className="lists">
                    {Array.from({ length: totalQuestions }, (_, index) => (
                        <div
                            key={index}
                            className={`list ${getQuestionClass(index)}`}
                            onClick={() => changeQuestion(index)}
                        >
                            {index + 1}
                        </div>
                    ))}
                </div>
                <button className="submit btn" onClick={handleSubmit}>Submit</button>
            </div>
        </>
    );
}


/* Warning.jsx */

function Warning(props) {
    return <div className="warning">
        <div className="warning-content">
            {props.children}
        </div>
    </div>
}

export { Preloader, Timer, QuestionBox, Navigation, Warning }