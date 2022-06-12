import React, { useState } from "react";
import { useSelector } from "react-redux";
import { SmallCard } from "./Card";
import classNames from "classnames";
import "./Battlefield.css";
import {
  selectBeingItems,
  selectPlayerBeingByPosition,
  selectSelectedPartyPosition,
  selectSelectedItemID,
  selectSelectedBeingID,
} from "../selectors";

function Being({ being, onSelectBeing, onSelectItem }) {
  const items = useSelector(({ G }) =>
    selectBeingItems(G, being.playerID, being.id)
  );

  const selectedItemID = useSelector(({ G }) =>
    selectSelectedItemID(G, being.playerID)
  );

  const selectedBeingID = useSelector(({ G }) =>
    selectSelectedBeingID(G, being.playerID)
  );

  return (
    <div className="being">
      {being && (
        <>
          <SmallCard
            id={being.id}
            playerID={being.playerID}
            isSelected={being.id === selectedBeingID}
            onSelect={() => onSelectBeing(being.id)}
          />
          {items.map((item) => (
            <SmallCard
              key={item.id}
              id={item.id}
              playerID={being.playerID}
              isSelected={item.id === selectedItemID}
              onSelect={() => onSelectItem(item.id)}
            />
          ))}
        </>
      )}
    </div>
  );
}

function PartyPosition({
  playerID,
  positionID,
  onSelectPartyPosition,
  onSelectBeing,
  onSelectItem,
}) {
  const being = useSelector(({ G }) =>
    selectPlayerBeingByPosition(G, playerID, positionID)
  );
  const isSelected = useSelector(
    ({ G }) => positionID === selectSelectedPartyPosition(G, playerID)
  );

  return (
    <div
      className={classNames({
        "party-position": true,
        "is-selected": isSelected,
      })}
      onClick={() => onSelectPartyPosition({ positionID: positionID })}
    >
      {being ? (
        <Being
          playerID={playerID}
          being={being}
          onSelectBeing={onSelectBeing}
          onSelectItem={onSelectItem}
        />
      ) : (
        <div className="empty-slot" />
      )}
    </div>
  );
}

export function Battlefield({
  playerID,
  opponentID,
  onSelectPartyPosition,
  onSelectBeing,
  onSelectItem,
}) {
  const positions = [{ id: 1 }, { id: 2 }, { id: 3 }, { id: 4 }];

  const selectedPartyPosition = useSelector(({ G }) =>
    selectSelectedPartyPosition(G, playerID)
  );

  // Need to give each slot a unique id
  // and then attach each dude to a specific slot
  return (
    <div className="battlefield">
      <div className="party their-party">
        {positions
          .slice()
          .reverse()
          .map(({ id }) => {
            return (
              <PartyPosition
                key={id}
                playerID={opponentID}
                positionID={id}
                onSelect={() => {}}
              />
            );
          })}
      </div>
      <div className="party my-party">
        {positions.map(({ id }) => {
          return (
            <PartyPosition
              key={id}
              playerID={playerID}
              positionID={id}
              isSelected={id === selectedPartyPosition}
              onSelectPartyPosition={onSelectPartyPosition}
              onSelectBeing={onSelectBeing}
              onSelectItem={onSelectItem}
            />
          );
        })}
      </div>
    </div>
  );
}
