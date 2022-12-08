import React from "react";
import { useSelector } from "react-redux";
import {
  selectPlayerLife,
  selectPlayerResources,
  selectRemainingActions,
} from "../selectors";
import "./GameStateBar.css";

function Stats({ life, resources, actions }) {
  return (
    <>
      <div>
        <span>Life:</span>
        <div className="resourceCount">{life}</div>
      </div>
      <div>
        <span>Actions:</span>
        <div className="resourceCount">{actions}</div>
      </div>
      {/*<div>
        <span>Flax:</span>
        <div className="resourceCount">{resources.flax}</div>
      </div>
      <div>
        <span>Food:</span>
        <div className="resourceCount">{resources.food}</div>
      </div>
      <div>
        <span>Metal:</span>
        <div className="resourceCount">{resources.metal}</div>
      </div>
      <div>
        <span>Wood:</span>
        <div className="resourceCount">{resources.wood}</div>
      </div>
      <div>
        <span>Soul:</span>
        <div className="resourceCount">{resources.soul}</div>
      </div>*/}
    </>
  );
}

export function GameStateBar({ playerID, opponentID }) {
  const isPlayerTurn = useSelector(({ ctx }) => ctx.currentPlayer === playerID);

  const playerLife = useSelector(({ G }) => selectPlayerLife(G, playerID));
  const playerResources = useSelector(({ G }) =>
    selectPlayerResources(G, playerID)
  );
  const playerActions = useSelector(({ G, ctx }) =>
    selectRemainingActions(G, ctx)
  );

  const opponentLife = useSelector(({ G }) => selectPlayerLife(G, opponentID));
  const opponentResources = useSelector(({ G }) =>
    selectPlayerResources(G, opponentID)
  );

  return (
    <div className="gamestate">
      <div className="gamestate-bar">
        {/*{!isPlayerTurn ? (*/}
        {/*<div className="your-turn">Opponent's Turn</div>*/}
        {/*) : (*/}
        <div className="opponent-turn">Opponent</div>
        {/*)}*/}
        <Stats life={opponentLife} resources={opponentResources} actions={""} />
      </div>
      {isPlayerTurn ? (
        <div className="your-turn">Your Turn</div>
      ) : (
        <div className="opponent-turn">Opponent's Turn</div>
      )}
      <div className="gamestate-bar">
        {/*{isPlayerTurn ? (*/}
        {/*<div className="your-turn">Your Turn</div>*/}
        {/*) : (*/}
        <div className="your-turn">You</div>
        {/*)}*/}
        <Stats
          life={playerLife}
          resources={playerResources}
          actions={playerActions}
        />
      </div>
    </div>
  );
}
