export function Tooltip({show, card, x, y}) {
  let style = {
    display: 'float',
    border: '1px solid #555',
    width: '100px',
    height: '160px',
    position: 'absolute', 
    left: x,
    top: y,
    backgroundColor: 'darkgray',
    transition: 300,
  }
  const idStyle = {
    'display': 'flex',
    'flexDirection': 'row', 
    'justifyContent': 'space-between',
  }
  const nameStyle = {
    'fontWeight': 'bold',
    'textAlign': 'left'
  }
  const materials = !!card.materials ? 'Materials: ' + Object.keys(card.materials).map(k => card.materials[k]+' '+k).join(', ') : ''
  const production = !!card.production ? 'Production: ' + Object.keys(card.production).map(k => card.production[k]+' '+k).join(', ') : ''
  return (
    <div className='card' style={style}>
      <div style={idStyle}>
        <div>{card ? 'id' + card.id : ''}</div>
        <div>{card ? '#' + card.number : ''}</div>
      </div>
      <div style={nameStyle}>{card ? card.name : ''}</div>
      <div>{card ? card.type + (!!card.subtype ? (' - ' + card.subtype) : '') : ''}</div>
      <div>{card ? card.text : ''}</div>
      <div>{card ? materials : ''}</div>
      <div>{card ? production : ''}</div>
  </div>)
}