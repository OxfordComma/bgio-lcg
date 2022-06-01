import React, {useState} from 'react';


export function SelectDeckMenu({ decks, onDeckSelect }) {
  let [selectedDeckID, setSelectedDeckID] = useState(null)
  return <div>
    <form onSubmit={e => {e.preventDefault(); onDeckSelect(selectedDeckID);}}>
      <div>
        {decks.map((deck => <span key={deck.id}>
          <label htmlFor={deck.id}>{deck.name}</label>
          <input id={deck.id} type="radio" checked={selectedDeckID==deck.id} value={deck.id} onChange={e => setSelectedDeckID(deck.id)}/>
        </span>))}
      </div>
      <button type="submit">submit</button>
    </form>
  </div>
}
