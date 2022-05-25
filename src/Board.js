import React, { useState, useEffect } from 'react'
import { Cards } from './Cards'
import './styles/Board.css'

function Card({card, selectedHandCardID, onClick, customStyle, fields}) {
  let style = {
    border: '1px solid #555',
    backgroundColor: selectedHandCardID == card.id ? 'yellow' : 'white',
    pointerEvents: 'none',
    ...customStyle
  }
  return (
    <div className='card' style={style}>
      <div>{card ? 'id' + card.id : ''}</div>
      <div>{card ? '#' + card.Number : ''}</div>
      <div>{card ? card.Name : ''}</div>
      <div>{card ? card.Type : ''}</div>
      <div>{card ? card.Subtype : ''}</div>
      <div>{card ? card.Materials : ''}</div>
      <div>{card ? card.Text : ''}</div>
  </div>)
}

function Tooltip({show, card, x, y}) {
  let style = {
    display: 'float',
    border: '1px solid #555',
    width: '160px',
    height: 'auto',
    position: 'absolute', 
    left: x,
    top: y,
    backgroundColor: 'darkgray',
    transition: 300,
  }

  return show ? <Card customStyle={style} card={card}/> : <div/>
}


function HandCard({card, selectedHandCardID, onClick}) {
  let style = {
    border: '1px solid #555',
    width: '100px',
    backgroundColor: selectedHandCardID == card.id ? 'yellow' : 'white',
    pointerEvents: 'none',
    aspectRatio: (1/1.6),
  }
  return <Card card={card} customStyle={style}/>
}


function LocationCard({ onClick, selectedFieldID, field, card}) {
  let cardID = field.fieldCardID
  let fieldID = field.fieldID
  
  let style = {
    border: '1px solid #555',
    width: '100%',
    height: '100%',
    backgroundColor: (selectedFieldID == fieldID) ? 'yellow' : 'white',
  }
  return (
    card == undefined ? 
      <div onClick={onClick} style={style}/> : 
      <div onClick={onClick} className='card' style={style}>
        <div>{card ? 'id' + card.id : ''}</div>
        <div>{card ? card.Name : ''}</div>
    </div>
  )
}

function Menu({G, ctx, moves, events, playerID}) {
  let [deck, setDeck] = useState('')
  function onSubmit(event, events) {
    event.preventDefault()
    console.log('menu submit:', event.target)
    let deckType = event.target.value
    console.log(deckType)
    if (deckType == 'fire')
      moves.selectDeck('Fire Deck', playerID)
   if (deckType == 'water')
      moves.selectDeck('Fire Deck', playerID)
    if (deckType == 'earth')
      moves.selectDeck('Fire Deck', playerID)
    if (deckType == 'air')
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

function Battlefield({ ctx, G, moves, playerID }) {
  let [selectedHandCardID, setSelectedHandCardID] = useState(null)
  let [selectedFieldID, setSelectedFieldID] = useState(null)

  let [showTooltip, setShowTooltip] = useState(null)
  let [x, setX] = useState()
  let [y, setY] = useState()
  

  function onHover(e) {
    // console.log(e.target)
    setShowTooltip(e.target.id)
    setX(e.screenX < 0 ? 0 : e.screenX)
    setY(e.screenY < 0 ? 0 : e.screenY)
    // console.log(e.screenX, e.screenY)
  }

  let player = G.players[playerID]
  let opponentID = ctx.playOrder.filter(p => p != playerID)[0]
  console.log(opponentID)
  let cards = []
  let decklist = G.decklists[playerID]
  // console.log(G.decklists)
  Object.keys(decklist).map(cardName => {
    let numCards = decklist[cardName]
    // console.log('numCards:', numCarfds)
    let card = Cards().filter(c => c.Name == cardName)[0]
    // console.log('card:', card)
    for (let i = 0; i<numCards; i++)  {
      let obj = {...card}
      obj['id'] = cards.length.toString()
      // console.log('card:', obj)
      cards = cards.concat( obj )
    }
    // fireDeck['cards'] = fireDeck['cards'].map( (card, i) => {card['id'] = i; return card})
  })

  // console.log(player)
  return (
    <div className='board'>
      <div className='battlefield'>
        {G.field[opponentID].slice(0).reverse().map(field => 
          <LocationCard
            onClick={e => { e.preventDefault(); console.log('click field'); moves.selectFieldCard(field.fieldID) }} 
            selectedFieldID={null} 
            field={field} 
            card={cards.filter(c => c.id == field.fieldCardID)[0]}
          />
        )}
        {G.field[playerID].map(field => 
          <LocationCard
            onClick={e => { e.preventDefault(); console.log('click field'); moves.selectFieldCard(field.fieldID) }} 
            selectedFieldID={G.players[ctx.currentPlayer]?.selectedFieldID} 
            field={field} 
            card={cards.filter(c => c.id == field.fieldCardID)[0]}
          />
        )}
      </div>
      <div className='myhand' >{player.handIDs.map(cardID => {
        {/*console.log(cardID)*/}
        let card = cards.filter(c => c.id == cardID)[0]
        return (
          <div id={card.id} onMouseMove={onHover} onMouseOut={e => setShowTooltip(null)}  onClick={e => {e.preventDefault(); moves.selectHandCard(e.target.id)} }>
            <Tooltip show={showTooltip == card.id} card={card} x={x+5} y={y-240} />
            <HandCard 
              onClick={e => { e.preventDefault(); moves.selectHandCard(cardID) }} 
              selectedHandCardID={G.players[ctx.currentPlayer]?.selectedHandCardID} 
              card={card}
            />
          </div>)
      })}
      </div>
      <div className='gamestate'>
        <div>Metal:{G.resources[ctx.currentPlayer].metal}</div>
        <div>Wood:{G.resources[ctx.currentPlayer].wood}</div>
        <div>Mana:{G.resources[ctx.currentPlayer].mana}</div>
      </div>
      <div className='controls'>
        <button onClick={e =>  {
          if (G.players[ctx.currentPlayer].selectedHandCardID != null)
            moves.playCard(G.players[ctx.currentPlayer].selectedHandCardID)
        }}>play</button>
      </div>
    </div>
  )
}

export function GameBoard({ G, ctx, moves, events, playerID }) {
  return (
    <div id='container'>
      {ctx.phase == 'menu' ? 
        <Menu
          G={G}
          ctx={ctx}
          moves={moves}
          events={events}
          playerID={playerID}
        /> : 
        <Battlefield  
          G={G}
          ctx={ctx}
          moves={moves}
          playerID={playerID}
        />
      }
    </div>
  );
}