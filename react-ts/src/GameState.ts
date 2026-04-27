import type GameSettings from "./GameSettings.ts";

export class GameState {
    isActive: boolean;
    score: number;
    currentWord: string;
    gameSettings: GameSettings;

    constructor(currentWord: string, settings: GameSettings) {
        this.isActive = true;
        this.score = 0;
        this.currentWord = currentWord;
        this.gameSettings = settings;
    }
}