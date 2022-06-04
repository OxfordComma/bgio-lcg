import React from "react";
import "./GameStateBar.css";

export function GameStateBar({ isPlayerTurn, resources, life }) {
  return (
    <div className="gamestate">
      {isPlayerTurn ? (
        <div className="your-turn">Your turn</div>
      ) : (
        <div className="opponent-turn">Opponent's Turn</div>
      )}
      <div>
        <span>Life:</span>
        <div className="resouceCount">{life}</div>
      </div>
      <div>
        <span>Metal:</span>
        <div className="resouceCount">{resources.metal}</div>
      </div>
      <div>
        <span>Wood:</span>
        <div className="resouceCount">{resources.wood}</div>
      </div>
      <div>
        <span>Soul:</span>
        <div className="resouceCount">{resources.soul}</div>
      </div>
    </div>
  );
}
