import React from "react";
import { useSelector } from "react-redux";
import { selectPlayerLife, selectPlayerResources } from "../selectors";
import "./GameStateBar.css";

function Stats({ life, resources }) {
  return (
    <>
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
    </>
  );
}

export function GameStateBar({ playerID, opponentID }) {
  const isPlayerTurn = useSelector(({ ctx }) => ctx.currentPlayer === playerID);
  const playerResources = useSelector(({ G }) =>
    selectPlayerResources(G, playerID)
  );

  const playerLife = useSelector(({ G }) => selectPlayerLife(G, playerID));
  const opponentLife = useSelector(({ G }) => selectPlayerLife(G, opponentID));
  const opponentResources = useSelector(({ G }) =>
    selectPlayerResources(G, opponentID)
  );

  return (
    <div className="gamestate">
      {isPlayerTurn ? (
        <div className="your-turn">Your Turn</div>
      ) : (
        <div className="opponent-turn">You</div>
      )}
      <Stats life={playerLife} resources={playerResources} />
      {!isPlayerTurn ? (
        <div className="your-turn">Opponent's Turn</div>
      ) : (
        <div className="opponent-turn">Opponent</div>
      )}
      <Stats life={opponentLife} resources={opponentResources} />
    </div>
  );
}
