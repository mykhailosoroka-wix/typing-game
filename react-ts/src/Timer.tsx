import { useEffect } from "react";

const Timer = ({ time, setTime, onFinish }: {
    time: number;
    setTime: React.Dispatch<React.SetStateAction<number>>;
    onFinish: () => void;
}): React.ReactElement => {
    useEffect(() => {
        const countdown = setInterval(() => {
            setTime((t) => {
                if (t <= 1) {
                    clearInterval(countdown);
                    onFinish();
                    return 0;
                }
                return t - 1;
            });
        }, 1000);

        return () => clearInterval(countdown);
    }, [onFinish, setTime]);

    return <p>Time left: {time}</p>;
};

export default Timer;