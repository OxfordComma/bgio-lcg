import React, { useState } from "react";
import { SmallCard } from "./Card";
import classNames from "classnames";
import "./Battlefield.css";

function Being({ being, cards, onSelect }) {
  const handleOnSelect = (cardID) =>
    onSelect({ cardID, beingCardID: being.beingCardID });
  return (
    <div className="being">
      {being && (
        <>
          <SmallCard
            card={cards.find((c) => c.id === being.beingCardID)}
            onSelect={handleOnSelect}
          />
          {being?.equipment.map((item) => (
            <SmallCard
              key={item.id}
              card={cards.find((c) => c.id === item.id)}
              onSelect={handleOnSelect}
            />
          ))}
        </>
      )}
    </div>
  );
}

function PartyPosition({ positionID, being, cards, onSelect, isSelected }) {
  return (
    <div
      className={classNames({
        "party-position": true,
        "is-selected": isSelected,
      })}
      onClick={() => onSelect({ positionID, beingCardID: being?.beingCardID })}
    >
      {being ? (
        <Being being={being} cards={cards} onSelect={() => {}} />
      ) : (
        <div className="empty-slot" />
      )}
    </div>
  );
}

export function Battlefield({
  playerBeings = [],
  opponentBeings = [],
  cards,
  selectedBeingID,
  selectedPartyPosition,
  onSelectPartyPosition,
}) {
  const positions = [{ id: 1 }, { id: 2 }, { id: 3 }, { id: 4 }];
  // Need to give each slot a unique id
  // and then attach each dude to a specific slot
  return (
    <div className="battlefield">
      <div className="party their-party">
        {positions
          .slice()
          .reverse()
          .map(({ id }) => {
            const being = opponentBeings.find(
              ({ position }) => position === id
            );
            return (
              <PartyPosition
                key={id}
                positionID={id}
                being={being}
                cards={cards}
                onSelect={() => {}}
              />
            );
          })}
      </div>
      <div className="party my-party">
        {positions.map(({ id }) => {
          const being = playerBeings.find(({ position }) => position === id);
          return (
            <PartyPosition
              key={id}
              positionID={id}
              being={being}
              cards={cards}
              isSelected={id === selectedPartyPosition}
              onSelect={onSelectPartyPosition}
            />
          );
        })}
      </div>
    </div>
  );
}
