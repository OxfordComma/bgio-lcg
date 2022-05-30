import React from 'react';

export function SelectDeckMenu({ decks, onDeckSelect }) {
  return <div>
    <form onSubmit={e => {e.preventDefault(); onDeckSelect(e.target.value);}}>
      <div>
        {decks.map((deck => <span key={deck.id}>
          <label htmlFor={deck.id}>{deck.name}</label>
          <input id={deck.id} type="radio" value={deck.id}/>
        </span>))}
      </div>
      <button type="submit">submit</button>
    </form>
  </div>
}
