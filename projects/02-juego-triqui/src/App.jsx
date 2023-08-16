import { useState } from "react";
import confetti from "canvas-confetti";
import Square from "./Components/Square";

const TURNS = {
  X: 'x',
  O: "o"
}


const WINNER_COMBOS = [
  [0, 1, 3],
  [3, 4, 5],
  [6, 7, 8],
  [0, 3, 6],
  [1, 4, 7],
  [2, 5, 8],
  [0, 4, 8],
  [2, 4, 6]
]

function App() {

  const [board, setBoard] = useState(() => {
    const boardFromStorage = window.localStorage.getItem('board')
    if (boardFromStorage) return JSON.parse(boardFromStorage)
    return Array(9).fill(null)
  })
    
  const [turn, setTurn] = useState(TURNS.X);
  const [winner, setWinner] = useState(null);

  const checkWinner = (boardToCheck) => {
    for (const combo of WINNER_COMBOS) {
      const [a, b, c] = combo;
      if (
        boardToCheck[a] &&
        boardToCheck[a] === boardToCheck[b] &&
        boardToCheck[a] === boardToCheck[c]
      ) {
        return boardToCheck[a]
      }
    }
  }

  const checkEndGame = (newBoard) => {
    return newBoard.every((square) => square != null)
   }

  const updateBoard = (index) => {
    if (board[index] || winner) return
    //actualizar board
    const newBoard = [...board]
    newBoard[index] = turn
    setBoard(newBoard)
    //cambair turno
    const newTurn = turn === TURNS.X ? TURNS.O : TURNS.X
    setTurn(newTurn);
    //Guardar partida
    window.sessionStorage.setItem('board', JSON.stringify(newBoard))
    window.sessionStorage.setItem('turn', newTurn)
    //Revisar si hay un ganador
    const newWinner = checkWinner(newBoard)
    if (newWinner) {
      confetti()
      setWinner(newWinner)
    }else if(checkEndGame(newBoard)){
      setWinner(false)
    }
  }

  const resetGame = () => {
    setBoard(Array(9).fill(null))
    setTurn(TURNS.X)
    setWinner(null)
  }
 



  return (
    <main className="board">
      <h1>Triqui</h1>
      <button onClick={resetGame}>Reset Game</button>
      <section className="game">
        {
          board.map((_, index) =>
            <Square
              key={index}
              index={index}
              updateBoard={updateBoard}

            >
              {board[index]}

            </Square>
          )
        }
      </section>

      <section className="turn">
        <Square isSelected={turn === TURNS.X}>{TURNS.X}</Square>
        <Square isSelected={turn === TURNS.O}>{TURNS.O}</Square>

        {
          winner != null &&(
            <section className="winner">
              <div className="text">
                <h2>
                  {
                    winner === false ? 'Empate' : 'Gano'
                  }
                </h2>

                <header className="win">
                  {winner && <Square>{winner}</Square>}
                </header>

                <footer>
                  <button onClick={resetGame}>Empezar de nuevo</button>
                </footer>
              </div>
            </section>
          )
        }
      </section>
    </main>
  )
}

export default App
