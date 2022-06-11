import React from "react";
import { useSelector } from "react-redux";
import Button from "./Button";
import "./Controls.css";

export default function Controls({
  playerID,
  onPlayCard,
  move,
  attack,
  endTurn,
  chatMessages,
}) {
  const isPlayerTurn = useSelector(({ ctx }) => ctx.currentPlayer === playerID);
  return (
    <div className="controls">
      <div>
        <Button
          onClick={(e) => {
            e.preventDefault();
            onPlayCard();
          }}
          disabled={!isPlayerTurn}
          text={"play"}
        />
        <Button
          onClick={(e) => {
            e.preventDefault();
            move();
          }}
          disabled={!isPlayerTurn}
          text={"move"}
        />
        <Button
          onClick={(e) => {
            e.preventDefault();
            attack();
          }}
          disabled={!isPlayerTurn}
          text={"attack"}
        />
        <Button
          onClick={(e) => {
            e.preventDefault();
            endTurn();
          }}
          disabled={!isPlayerTurn}
          text={"end"}
        />
      </div>
      <div className="output">
        {chatMessages.map((msg, i) => (
          <div key={i}>{`player ${msg.sender}: ${msg.payload}`}</div>
        ))}
      </div>
    </div>
  );
}
