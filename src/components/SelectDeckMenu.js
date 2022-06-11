import React, { useState } from "react";
import { useSelector } from "react-redux";
import { selectAllDecks } from "../selectors";
import Button from "./Button";
import "./SelectDeckMenu.css";

export function SelectDeckMenu({ playerID, onDeckSelect }) {
  const isPlayerTurn = useSelector(({ ctx }) => ctx.currentPlayer === playerID);
  const decks = useSelector(({ G }) => selectAllDecks(G));
  let [selectedDeckID, setSelectedDeckID] = useState(null);
  return (
    <div className="select-deck-menu">
      <form
        onSubmit={(e) => {
          e.preventDefault();
          if (!selectedDeckID) return;
          onDeckSelect(selectedDeckID);
        }}
      >
        <div className="options">
          {decks.map((deck) => (
            <span key={deck.id}>
              <label htmlFor={deck.id}>{deck.name}</label>
              <input
                id={deck.id}
                type="radio"
                checked={selectedDeckID == deck.id}
                value={deck.id}
                onChange={(e) => setSelectedDeckID(deck.id)}
              />
            </span>
          ))}
        </div>
        <Button
          type="submit"
          disabled={!isPlayerTurn || !selectedDeckID}
          text={"submit"}
        />
      </form>
    </div>
  );
}
