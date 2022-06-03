import React, { useState } from "react";
import { Card } from "./Card";
import "./PlayerHand.css";

export function PlayerHand({ hand, selectedCardID, onSelect }) {
  return (
    <div className="myhand">
      <div className="card-slots">
        {hand
          ?.filter((c) => c)
          .map((card) => (
            <Card
              key={"card" + card.id}
              card={card}
              isSelected={card.id === selectedCardID}
              onSelect={onSelect}
            />
          ))}
      </div>
    </div>
  );
}
