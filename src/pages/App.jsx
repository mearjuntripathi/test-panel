import React, { useEffect, useState } from "react";
import { Preloader, Warning } from "../components/Components";
import TestPanel from "../components/TestPanel";
import Instruction from "../components/Instruction";
import { useNavigate } from 'react-router-dom';
import { suspend } from "../script/api";

export default function App({ questions }) {
    const navigate = useNavigate();
    useEffect(() => {
        if (!window.localStorage.getItem('token')) {
            navigate('/login');
        }
    }, [navigate]);

    const handleOut = () => {
        window.localStorage.clear();
        navigate('/login');
    };

    const handleSuspend = () => {
        suspend();
        handleOut();
    };


    const [loading, setLoading] = useState(true);
    const [isFullscreen, setIsFullscreen] = useState(false);
    const [step, setStep] = useState(1);

    useEffect(() => {
        const handleLoad = () => setLoading(false);

        if (document.readyState === 'complete') {
            handleLoad();
        } else {
            window.addEventListener('load', handleLoad);
        }

        return () => window.removeEventListener('load', handleLoad);
    }, []);

    useEffect(() => {
        const handleFullscreenChange = () => {
            setIsFullscreen(
                document.fullscreenElement ||
                document.mozFullScreenElement ||
                document.webkitFullscreenElement ||
                document.msFullscreenElement
            );
        };

        document.addEventListener("fullscreenchange", handleFullscreenChange);
        document.addEventListener("webkitfullscreenchange", handleFullscreenChange);
        document.addEventListener("mozfullscreenchange", handleFullscreenChange);
        document.addEventListener("MSFullscreenChange", handleFullscreenChange);

        return () => {
            document.removeEventListener("fullscreenchange", handleFullscreenChange);
            document.removeEventListener("webkitfullscreenchange", handleFullscreenChange);
            document.removeEventListener("mozfullscreenchange", handleFullscreenChange);
            document.removeEventListener("MSFullscreenChange", handleFullscreenChange);
        };
    }, []);

    useEffect(() => {
        const handleContextMenu = (event) => {
            event.preventDefault();
            alert("Right-click context menu is disabled during the test.");
        };

        const handleKeydown = (event) => {
            if (event.ctrlKey && event.shiftKey && event.key === "I") {
                event.preventDefault();
                alert("Inspect mode is disabled during the test.");
            }
        };

        const handleVisibilityChange = () => {
            if (document.hidden) {
                handleSuspend();  // Trigger suspend when the page becomes hidden
            }
        };

        const handleBeforeUnload = (event) => {
            event.preventDefault();
            event.returnValue = 'Are you sure you want to leave? Your progress will be lost.';
            handleSuspend();  // Trigger suspend on page unload
        };

        document.addEventListener("contextmenu", handleContextMenu);
        document.addEventListener("keydown", handleKeydown);
        document.addEventListener('visibilitychange', handleVisibilityChange);
        window.addEventListener('beforeunload', handleBeforeUnload);

        return () => {
            document.removeEventListener("contextmenu", handleContextMenu);
            document.removeEventListener("keydown", handleKeydown);
            document.removeEventListener('visibilitychange', handleVisibilityChange);
            window.removeEventListener('beforeunload', handleBeforeUnload);
        };
    }, []);

    const enterFullscreen = () => {
        if (document.documentElement.requestFullscreen) {
            document.documentElement.requestFullscreen();
        } else if (document.documentElement.mozRequestFullScreen) { // Firefox
            document.documentElement.mozRequestFullScreen();
        } else if (document.documentElement.webkitRequestFullscreen) { // Chrome, Safari, and Opera
            document.documentElement.webkitRequestFullscreen();
        } else if (document.documentElement.msRequestFullscreen) { // IE/Edge
            document.documentElement.msRequestFullscreen();
        }
    };

    return (
        <>
            {!isFullscreen && (
                <Warning>
                    <p>To take the exam, it's essential to switch to fullscreen mode. Without fullscreen, you won't be able to proceed with the exam. Please switch to fullscreen mode now to begin.</p>
                    <br />
                    <button className="btn" onClick={enterFullscreen}>
                        Switch to Fullscreen
                    </button>
                </Warning>
            )}
            {step === 1 && <Instruction setStep={setStep} />}
            {step === 2 && <TestPanel questions={questions} handleOut={handleOut} />}
        </>
    );
}