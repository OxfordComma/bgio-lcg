import React from "react";
import { SmallCard } from "./Card";
import "./Landscape.css";
import classNames from "classnames";

function GridLocation({
  isSelected,
  isPartyLocation,
  onSelect,
  landscape,
  card,
}) {
  return (
    <div
      onClick={(e) => {
        e.preventDefault();
        onSelect(landscape.id);
      }}
      className={classNames({
        "land-area": true,
        highlighted: isSelected,
        "party-location": isPartyLocation,
        "can-place-card": landscape.canPlaceCard,
      })}
    >
      {card && (
        <SmallCard card={card} isSelected={isSelected} onSelect={() => {}} />
      )}
    </div>
  );
}

export function Landscape({
  landscapes,
  playerID,
  cards,
  selectedLandscapeID,
  partyLocation,
  onSelect,
}) {
  return (
    <div className="landscape">
      {landscapes.map((landscape) => (
        <GridLocation
          key={playerID + "_landscape" + landscape.id}
          landscape={landscape}
          card={cards.find((c) => c.id === landscape.landscapeCardID)}
          isSelected={selectedLandscapeID === landscape.id}
          isPartyLocation={partyLocation === landscape.id}
          onSelect={onSelect}
        />
      ))}
    </div>
  );
}
