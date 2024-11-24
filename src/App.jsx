import { useEffect, useState } from 'react'
import reactLogo from './assets/react.svg'
import viteLogo from '/vite.svg'
import './App.css'
import Board from './Board'
import GameOver from './GameOver'
const Player_X='X';
const Player_O='O';
const winningCombiation=[
  {combo:[0,1,2],strikeClass:"strike-row-1"},
  {combo:[3,4,5],strikeClass:"strike-row-2"},
  {combo:[6,7,8],strikeClass:"strike-row-3"},

  {combo:[0,3,6],strikeClass:"strike-column-1"},
  {combo:[1,4,7],strikeClass:"strike-column-2"},
  {combo:[2,5,8],strikeClass:"strike-column-3"},

  {combo:[0,4,8],strikeClass:'strike-diagonal-1'},
  {combo:[2,4,6],strikeClass:'strike-diagonal-2'},
];

function App() {
  const [tiles,settiles]=useState(Array(9).fill(null));
  const[playerTurn,setplayerTurn]=useState(Player_X);
  const [strikeClass,setstrikeClass]=useState("");
  function checkwinner(tiles,setstrikeClass){
    for(const {combo,strikeClass}of winningCombiation){
      const tilevalue1=tiles[combo[0]];
      const tilevalue2=tiles[combo[1]];
      const tilevalue3=tiles[combo[2]];
      if(
        tilevalue1!==null&&tilevalue1===tilevalue2&&tilevalue1===tilevalue3
      ){
        setstrikeClass(strikeClass);
      }
    }
  }
  const handelTileclick= (index)=>{
    if (tiles[index]!==null){
      return;
    }
    const newTile=[...tiles];
    newTile[index]=playerTurn;
    settiles(newTile);
    if(playerTurn===Player_X){
      setplayerTurn(Player_O);
    }
    else{
      setplayerTurn(Player_X)
    }
  };
  useEffect(()=>{
    checkwinner(tiles,setstrikeClass);
  },[tiles])
  return (
    <>
    <h1>tic-tac-toe</h1>
    <Board playerTurn={playerTurn}
            tiles={tiles} 
            onTileClick={handelTileclick}
            strikeClass={strikeClass}/>
          
    </>
  )
}

export default App
