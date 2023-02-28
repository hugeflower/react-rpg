import React, { useMemo } from "react";
import { DndProvider } from "react-dnd";
import { HTML5Backend } from "react-dnd-html5-backend";
import { Game } from "./game.tsx";
import { GameState } from "./gameState.tsx";

export default function App() {
    const game = useMemo(() => new GameState(), [])
    return <DndProvider backend={HTML5Backend}><Game gameState={game}/></DndProvider>
}