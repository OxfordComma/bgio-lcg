import React, { useState } from "react";
import { useSelector } from "react-redux";
import {
  selectCardByID,
  selectPlayerHandCardIDs,
  selectSelectedHandCardID,
} from "../selectors";
import { CardDetails, CardWithTooltip } from "./Card";
import "./PlayerHand.css";

export function PlayerHandCard({ playerID, id, isSelected, onSelect }) {
  const card = useSelector(({ G }) => selectCardByID(G, playerID, id));

  return (
    <CardWithTooltip card={card} isSelected={isSelected} onSelect={onSelect}>
      <CardDetails card={card} isSelected={isSelected} />
    </CardWithTooltip>
  );
}

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
