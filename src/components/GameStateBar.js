import React from "react";
import "./GameStateBar.css";

export function GameStateBar({
  isPlayerTurn,
  playerResources,
  playerLife,
  opponentResources,
  opponentLife,
}) {
  return (
    <div className="gamestate">
      {isPlayerTurn ? (
        <div className="your-turn">Your Turn</div>
      ) : (
        <div className="opponent-turn">You</div>
      )}
      <div>
        <span>Life:</span>
        <div className="resouceCount">{playerLife}</div>
      </div>
      <div>
        <span>Metal:</span>
        <div className="resouceCount">{playerResources.metal}</div>
      </div>
      <div>
        <span>Wood:</span>
        <div className="resouceCount">{playerResources.wood}</div>
      </div>
      <div>
        <span>Soul:</span>
        <div className="resouceCount">{playerResources.soul}</div>
      </div>
      {!isPlayerTurn ? (
        <div className="your-turn">Opponent's Turn</div>
      ) : (
        <div className="opponent-turn">Opponent</div>
      )}
      <div>
        <span>Life:</span>
        <div className="resouceCount">{opponentLife}</div>
      </div>
      <div>
        <span>Metal:</span>
        <div className="resouceCount">{opponentResources.metal}</div>
      </div>
      <div>
        <span>Wood:</span>
        <div className="resouceCount">{opponentResources.wood}</div>
      </div>
      <div>
        <span>Soul:</span>
        <div className="resouceCount">{opponentResources.soul}</div>
      </div>
    </div>
  );
}
