import React, { useState, useEffect } from 'react'
import { Cards } from './Cards'
import './styles/Board.css'

function Card({card, selectedHandCardID, onClick, customStyle}) {
  let style = {
    border: '1px solid #555',
    backgroundColor: selectedHandCardID == card.id ? 'yellow' : 'white',
    pointerEvents: 'none',
    ...customStyle
  }
  return (
    <div className='card' style={style}>
      {/*<div>{card ? 'id' + card.id : ''}</div>*/}
      {/*<div>{card ? '#' + card.number : ''}</div>*/}
      <div>{card ? `${card.name} (${card.id})` : ''}</div>
      <div>{card ? `${card.type} ${card.subtype}`: ''}</div>
      <div>{card ? card.text : ''}</div>
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


function LocationCard({ onClick, selectedLandscapeID, landscape, card}) {
  let cardID = landscape.landscapeCardID
  let landscapeID = landscape.landscapeID
  
  let style = {
    border: '1px solid #555',
    width: '100%',
    height: '100%',
    backgroundColor: (selectedLandscapeID == landscapeID) ? 'yellow' : 'white',
  }
  return (
    card == undefined ? 
      <div onClick={onClick} style={style}/> : 
      <div onClick={onClick} className='card' style={style}>
        <div>{card ? 'id' + card.id : ''}</div>
        <div>{card ? card.name : ''}</div>
    </div>
  )
}

// function BeingCard({ onClick, selectedLandscapeID, landscape, card}) {

// }

function Menu({G, ctx, moves, events, playerID}) {
  let [deck, setDeck] = useState('')
  function onSubmit(event, events) {
    event.preventDefault()
    console.log('menu submit:', event.target)
    let decktype = event.target.value
    console.log(decktype)
    if (decktype == 'fire')
      moves.selectDeck('Fire Deck', playerID)
   if (decktype == 'water')
      moves.selectDeck('Fire Deck', playerID)
    if (decktype == 'earth')
      moves.selectDeck('Fire Deck', playerID)
    if (decktype == 'air')
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

function Battle({ ctx, G, moves, playerID }) {
  let [selectedHandCardID, setSelectedHandCardID] = useState(null)
  let [selectedLandscapeID, setSelectedLandscapeID] = useState(null)

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
  Object.keys(decklist).map(cardname => {
    let numCards = decklist[cardname]
    // console.log('numCards:', numCarfds)
    let card = Cards().filter(c => c.name == cardname)[0]
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
      <div className='landscape'>
        {G.landscape[opponentID].slice(0).reverse().map(landscape => 
          <LocationCard
            onClick={e => { e.preventDefault(); console.log('click landscape'); moves.selectLandscapeCard(landscape.landscapeID) }} 
            selectedLandscapeID={null} 
            landscape={landscape} 
            card={cards.filter(c => c.id == landscape.landscapeCardID)[0]}
          />
        )}
        {G.landscape[playerID].map(landscape => 
          <LocationCard
            onClick={e => { e.preventDefault(); console.log('click landscape'); moves.selectLandscapeCard(landscape.landscapeID) }} 
            selectedLandscapeID={G.players[ctx.currentPlayer]?.selectedLandscapeID} 
            landscape={landscape} 
            card={cards.filter(c => c.id == landscape.landscapeCardID)[0]}
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
      <div className='battlefield'>
        {player.beingIDs.map(beingID => {
          let card = cards.filter(c => c.id == beingID)[0]
          return (
            <div id={card.id} onMouseMove={onHover} onMouseOut={e => setShowTooltip(null)}  onClick={e => {e.preventDefault(); moves.selectBeingCard(e.target.id)} }>
              <Tooltip show={showTooltip == card.id} card={card} x={x+5} y={y-240} />
              <HandCard 
                onClick={e => { e.preventDefault(); moves.selectBeingCard(beingID) }} 
                selectedHandCardID={G.players[ctx.currentPlayer]?.selectedHandCardID} 
                card={card}
              />
            </div>)
        })}
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
        <Battle  
          G={G}
          ctx={ctx}
          moves={moves}
          playerID={playerID}
        />
      }
    </div>
  );
}