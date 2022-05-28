import React from 'react';

export function SelectDeckMenu({G, ctx, moves, events, playerID}) {
    function onSubmit(event, events) {
      event.preventDefault()
      console.log('menu submit:', event.target)
      let deckType = event.target.value
      // console.log(deckType)
      if (deckType === 'fire')
        moves.selectDeck('Fire Deck', playerID)
     if (deckType === 'water')
        moves.selectDeck('Fire Deck', playerID)
      if (deckType === 'earth')
        moves.selectDeck('Fire Deck', playerID)
      if (deckType === 'air')
        moves.selectDeck('Fire Deck', playerID)
       // console.log(events)
      else
        moves.selectDeck('Fire Deck', playerID)
    }
  
    return <div>
      <form onSubmit={e => onSubmit(e, events)}>
        <div id='deckselect'>
          <label for='fire'>Fire</label>
          <input id='fire' type='radio' value='fire'/>
          <label for='water'>Water</label>
          <input id='water' type='radio' value='water'/>
          <label for='earth'>Earth</label>
          <input id='earth' type='radio' value='earth'/>
          <label for='air'>Air</label>
          <input id='air' type='radio' value='air'/>
        </div>
        {/*<div id='playerselect'>
          <label for='player'>Player ID:</label>
          <select id='player' type='dropdown'>
            <option>0</option>
            <option>1</option>
          </select>
        </div>*/}
        <button type='submit'>submit</button>
      </form>
    </div>
  }
