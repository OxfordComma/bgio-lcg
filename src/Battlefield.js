import React, { useState } from "react";
import { SmallCard as Card } from "./Card";
import "./Battlefield.css";

function Being({ being, items, cards, onSelect }) {
  return (
    <div className="being">
      <Card
        card={cards.find((c) => c.id === being.beingCardID)}
        onSelect={onSelect}
      />
      {items?.map((item) => (
        <Card
          key={item.id}
          card={cards.find((c) => c.id === item.id)}
          onSelect={onSelect}
        />
      ))}
    </div>
  );
}

function Party({ beings, cards, onSelectCard }) {
  return (
    <div className="party">
      {beings.map((being) => (
        <Being
          key={being.id}
          being={being}
          items={being.equipment}
          cards={cards}
          onSelect={(e) => onSelectCard(being.beingCardID)}
        />
      ))}
    </div>
  );
}

export function Battlefield({
  beings,
  playerID,
  cards,
  selectedBeingID,
  onSelectCard,
}) {
  return (
    <div className="battlefield">
      {beings && (
        <Party beings={beings["0"]} cards={cards} onSelectCard={onSelectCard} />
      )}
      {beings && (
        <Party beings={beings["1"]} cards={cards} onSelectCard={onSelectCard} />
      )}
    </div>
  );
}
