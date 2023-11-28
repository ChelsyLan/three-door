import React, { useState, useEffect } from 'react';

const ThreeDoorsGame = () => {
  const [doors, setDoors] = useState([0, 1, 2]);
  const [carBehindDoor, setCarBehindDoor] = useState(null);
  const [chosenDoorIndex, setChosenDoorIndex] = useState(null);
  const [revealedDoorIndex, setRevealedDoorIndex] = useState(null);
  const [gameStage, setGameStage] = useState(1);
  const [gameOver, setGameOver] = useState(false);

  useEffect(() => {
    resetGame();
  }, []);

  const resetGame = () => {
    setCarBehindDoor(Math.floor(Math.random() * 3));
    setChosenDoorIndex(null);
    setRevealedDoorIndex(null);
    setGameStage(1);
    setGameOver(false);
  };

  const handleDoorClick = (index) => {
    if (gameStage === 1) {
      setChosenDoorIndex(index);
      revealGoatDoor(index);
      setGameStage(2);
    } else if (gameStage === 2) {
      setChosenDoorIndex(index); // Allow the user to either switch or stay
      checkWin(index); // Proceed to check the result
    }
  };

  const getDoorContent = (index) => {
    if (index === chosenDoorIndex) {
      return 'Chosen';
    }
    if (index === revealedDoorIndex) {
      return 'Goat';
    }
    return `Door ${index + 1}`;
  };

  const revealGoatDoor = (chosenIndex) => {
    let goatDoorIndex;
    do {
      goatDoorIndex = Math.floor(Math.random() * 3);
    } while (goatDoorIndex === chosenIndex || goatDoorIndex === carBehindDoor);
    setRevealedDoorIndex(goatDoorIndex);
  };

  const checkWin = (index) => {
    if (index === carBehindDoor) {
      alert("Congratulations! You win the car！");
    } else {
      alert("Sorry,it's a goat");
    }
    setGameOver(true);
  };

  return (
    <div>
      <h1>Three Door Game</h1>
      {doors.map((door, index) => (
        <div
          key={door}
          className={`door ${index === chosenDoorIndex ? 'selected' : ''} ${index === revealedDoorIndex ? 'revealed' : ''} ${gameOver && index === carBehindDoor ? 'car' : ''}`}
          onClick={() => handleDoorClick(index)}
        >
          {getDoorContent(index)}
        </div>
      ))}
      <button onClick={resetGame}>Restart</button>
    </div>
  );
};


export default ThreeDoorsGame;
