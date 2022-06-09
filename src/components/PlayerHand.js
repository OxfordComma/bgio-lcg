import React, { useState } from "react";
import { useSelector } from "react-redux";
import {
  selectPlayerHandCardIDs,
  selectSelectedHandCardID,
} from "../selectors";
import { PlayerHandCard } from "./Card";
import "./PlayerHand.css";

export default function PlayerHand({ playerID, onSelect }) {
  const hand = useSelector(({ G }) => selectPlayerHandCardIDs(G, playerID));
  const selectedCardID = useSelector(({ G }) =>
    selectSelectedHandCardID(G, playerID)
  );

  return (
    <div className="myhand">
      <div className="card-slots">
        {hand.map((cardID) => (
          <PlayerHandCard
            key={"card" + cardID}
            playerID={playerID}
            id={cardID}
            isSelected={cardID === selectedCardID}
            onSelect={onSelect}
          />
        ))}
      </div>
    </div>
  );
}
