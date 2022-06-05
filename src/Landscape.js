import React from "react";
import { SmallCard } from "./Card";
import "./Landscape.css";

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
      className={
        "land-area" +
        (isSelected ? " highlighted" : "") +
        (isPartyLocation ? " party-location" : "")
      }
    >
      {card && <SmallCard card={card} onSelect={(cardID) => {}} />}
    </div>
  );
}

export function Landscape({
  landscapes,
  playerID,
  partyLocation,
  cards,
  selectedLandscapeID,
  onSelect,
}) {
  // const myLandscapes = landscapes
  // let theirLandscapes = [ ...landscapes[['0', '1'].filter(p => p !== playerID)] ].reverse()

  return (
    <div className="landscape">
      {/*{theirLandscapes.map(landscape => 
      <GridLocation
        key={playerID+"_landscape" + landscape.id.toString()}
        landscape={landscape}
        card={cards.find(c => c.id === landscape.landscapeCardID)}
        isSelected={ false }
        onSelect={onSelect}
      />
    )}*/}
      {landscapes.map((landscape) => (
        <GridLocation
          key={playerID + "_landscape" + landscape.id.toString()}
          landscape={landscape}
          card={cards.find((c) => c.id === landscape.landscapeCardID)}
          isSelected={selectedLandscapeID === landscape.id}
          isPartyLocation={partyLocation.toString() === landscape.id}
          onSelect={onSelect}
        />
      ))}
    </div>
  );
}
