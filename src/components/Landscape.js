import React, { useState } from "react";
import { useSelector } from "react-redux";
import { SmallCard } from "./Card";
import "./Landscape.css";
import classNames from "classnames";
import {
  canPlaceCardOnLocation,
  selectCardByID,
  selectIsSelectedCardLocation,
  selectLandscapes,
  selectPartyLocationID,
  selectSelectedHandCardID,
  selectSelectedLandscapeID,
} from "../selectors";

function GridLocation({ playerID, landscape, showCanPlayCard, onSelect }) {
  const isSelected = useSelector(
    ({ G }) => selectSelectedLandscapeID(G, playerID) === landscape.id
  );
  const canPlaceCard = useSelector(({ G }) =>
    canPlaceCardOnLocation(G, playerID, landscape)
  );
  const isPartyLocation = useSelector(
    ({ G }) => landscape.id === selectPartyLocationID(G, playerID)
  );

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
        "can-place-card": showCanPlayCard && canPlaceCard,
        ally: landscape.playerID === playerID,
        enemy: landscape.playerID && landscape.playerID !== playerID,
      })}
    >
      {landscape.landscapeCardID && (
        <SmallCard
          playerID={playerID}
          id={landscape.landscapeCardID}
          isSelected={isSelected}
          onSelect={() => {}}
        />
      )}
    </div>
  );
}

export function Landscape({ playerID, onSelect }) {
  const isSelectedCardLocation = useSelector(({ G }) =>
    selectIsSelectedCardLocation(G, playerID)
  );
  const landscapes = useSelector(({ G }) =>
    selectLandscapes(G).map((landscape) => ({
      ...landscape,
    }))
  );

  const [isHovering, setIsHovering] = useState(isSelectedCardLocation);
  return (
    <div
      className="landscape"
      onMouseMove={(e) => {
        setIsHovering(true);
      }}
      onMouseOut={(e) => {
        setIsHovering(false);
      }}
    >
      {landscapes.map((landscape) => (
        <GridLocation
          key={playerID + "_landscape" + landscape.id}
          playerID={playerID}
          landscape={landscape}
          showCanPlayCard={isHovering || isSelectedCardLocation}
          onSelect={onSelect}
        />
      ))}
    </div>
  );
}
