import {useEffect, useRef, useState} from "react";
import type {GameState} from "./GameState.ts";

const WordEntry = ({state, onCorrect}: {state: GameState, onCorrect: () => void}) => {
    const [input, setInput] = useState("");
    const inputRef = useRef<HTMLInputElement>(null);

    useEffect(() => {
        if (!state.isActive) setInput("");
    }, [state.isActive]);

    const handleInput = (value: string): void => {
        if (value === state.currentWord) {
            setInput("");
            onCorrect();
        } else {
            setInput(value);
        }
    };

    if (state.isActive === false) {
        return <div className="word-entry" hidden></div>;
    }

    return (
        <div className="typer-container rounded">
            <p className="type-label">Type the following:</p>
            <p className="target-word">{state.currentWord}</p>
            <input
                ref={inputRef}
                autoFocus={true}
                className="input-word rounded"
                type="text"
                placeholder="Type your word here..."
                value={input}
                onChange={(e) => handleInput(e.target.value)}
                onBlur={() => inputRef.current!.focus()}
            />
        </div>
    );
};

export default WordEntry;