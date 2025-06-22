import { useEffect, useState } from 'react';
import EmptyCard from './EmptyCard';

interface TimerProps {
    initialSeconds: number;
    onExpire?: () => void;
}

const Timer = ({ initialSeconds, onExpire }: TimerProps) => {
    const [seconds, setSeconds] = useState(initialSeconds);
    const [isRunning, setIsRunning] = useState(false);
    const [isStarted, setIsStarted] = useState(false);

    // Play the timesup.wav sound from public when timer ends
    const playChime = () => {
        const audio = new Audio('/timesup.wav');
        audio.play().catch(error => console.error('Failed to play sound:', error));
    };

    const playBlip = () => {
        const audio = new Audio('/blip.wav');
        audio.play().catch(error => console.error('Failed to play sound:', error));
    }

    useEffect(() => {
        if (!isRunning) return;
        if (seconds <= 0) {
            playChime();
            onExpire?.();
            setIsRunning(false);
            return;
        }
        const intervalId = setInterval(() => setSeconds((prev) => prev - 1), 1000);
        return () => clearInterval(intervalId);
    }, [isRunning, seconds, onExpire]);

    // if initialseconds changes, re-render the component
    useEffect(() => {
        setSeconds(initialSeconds);
        setIsRunning(false);
        setIsStarted(false);
    }, [initialSeconds]);

    const minutes = Math.floor(seconds / 60);
    const secs = seconds % 60;
    const formatted = `${minutes}:${secs.toString().padStart(2, '0')}`;
    const progress = (seconds / initialSeconds) * 100;

    return (
        <EmptyCard>
            <div className="w-100%">
                <div className="w-full bg-gray-200 rounded-full h-2.5 dark:bg-gray-700">
                    <div id="progressBar" className="bg-blue-600 h-2.5 rounded-full" style={{ width: `${progress}%` }}></div>
                </div>
                <div className="text-center text-xl font-bold">
                    <time dateTime={`PT${seconds}S`}>{formatted}</time>
                </div>
                <div className="flex mt-2 gap-10 justify-center">
                    {!isStarted && (<button
                        onClick={() => {
                            setIsRunning(true);
                            setIsStarted(true);
                            playBlip();
                        }}
                        disabled={seconds <= 0}
                        className="w-1/3 px-4 py-2 bg-blue-500 text-white rounded hover:bg-blue-600 disabled:bg-gray-400 disabled:cursor-not-allowed transition-colors duration-200"
                    >
                        Play
                    </button>)}
                    {isStarted && (<button
                        onClick={() => {
                            setSeconds(initialSeconds);
                            setIsRunning(false);
                            setIsStarted(false);
                            playBlip();
                        }}
                        className="w-1/3 px-4 py-2 bg-red-500 text-white rounded hover:bg-red-600 transition-colors duration-200"
                    >
                        Reset
                    </button>)}
                    <button
                        onClick={() => {
                            setIsRunning(!isRunning);
                            playBlip();
                        }}
                        disabled={!isRunning && !isStarted}
                        className="w-1/3 px-4 py-2 bg-yellow-500 text-white rounded hover:bg-yellow-600 transition-colors duration-200 disabled:bg-gray-400 disabled:cursor-not-allowed"
                    >
                        Pause
                    </button>

                </div>
            </div>
        </EmptyCard>

    );
};

export default Timer;
