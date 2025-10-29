import {useMemo} from 'react'
import './App.css'
import {DndProvider} from "react-dnd";
import {HTML5Backend} from "react-dnd-html5-backend";
import {GameState} from "./gameState.tsx";
import Game from "./Game.tsx";

function App() {
    const game = useMemo(() => new GameState(), [])

  return (
    <>
        <DndProvider backend={HTML5Backend}><Game gameState={game}/></DndProvider>
    </>
  )
}

export default App
