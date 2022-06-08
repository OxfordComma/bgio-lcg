import React, { useState, useEffect } from "react";
import { createPortal } from "react-dom";
import classNames from "classnames";
import "./Card.css";

function CardDetails({ card }) {
  return (
    <>
      <div className="card-id">
        <div>id{card.id}</div>
        <div>#{card.number}</div>
      </div>
      <div className="card-name">{card?.name}</div>
      <div>{card.type + (card?.subtype && " - " + card.subtype)}</div>
      <div>{card.text}</div>
      {card?.stats && (
        <div className="stats">
          <div style={{ gridArea: "str" }}>STR {card.stats.strength}</div>
          <div style={{ gridArea: "arm" }}>ARM {card.stats.armor}</div>
          <div style={{ gridArea: "agi" }}>AGI {card.stats.agility}</div>
          <div style={{ gridArea: "will" }}>WIL {card.stats.will}</div>
        </div>
      )}
      {card?.materials && (
        <div>
          <span>Cost:</span>
          <span>
            {Object.entries(card.materials).map(([resource, amount]) => (
              <div key={resource}>
                -{amount} {resource}
              </div>
            ))}
          </span>
        </div>
      )}
      {card?.production && (
        <div>
          <span>Gain:</span>
          <span>
            {Object.entries(card.production).map(([resource, amount]) => (
              <div key={resource}>
                +{amount} {resource}
              </div>
            ))}
          </span>
        </div>
      )}
    </>
  );
}

function CardSummary({ card }) {
  return (
    <>
      <div className="card-name">{card?.name}</div>
      <div>{card.type + (card?.subtype && " - " + card.subtype)}</div>
      {card?.stats && (
        <div className="stats">
          <div style={{ gridArea: "str" }}>S {card.stats.strength}</div>
          <div style={{ gridArea: "arm" }}>D {card.stats.armor}</div>
          <div style={{ gridArea: "agi" }}>A {card.stats.agility}</div>
          <div style={{ gridArea: "will" }}>W {card.stats.will}</div>
        </div>
      )}
      {card?.production && (
        <div>
          {Object.entries(card.production)?.map(([resource, amount]) => (
            <div key={resource}>
              +{amount} {resource}
            </div>
          ))}
        </div>
      )}
    </>
  );
}

const Tooltip = ({ cursor, children }) => {
  const mount = document.getElementById("tooltip-anchor");

  return createPortal(
    <div className="card-tooltip" style={{ left: cursor.x, top: cursor.y }}>
      {children}
    </div>,
    mount
  );
};

function Card({
  card,
  isHorizontal = false,
  isSelected,
  onSelect,
  children,
  ...rest
}) {
  return (
    <div
      className={classNames({
        card: true,
        "is-selected": isSelected,
        horizontal: isHorizontal,
      })}
      onClick={(e) => {
        e.preventDefault();
        onSelect(card.id);
      }}
      {...rest}
    >
      {children}
    </div>
  );
}

function CardWithTooltip({
  card,
  isHorizontal = false,
  isSelected,
  onSelect,
  children,
}) {
  const [showTooltip, setShowTooltip] = useState(false);
  const [cursor, setCursor] = useState({ x: 0, y: 0 });

  function onHover(e) {
    setShowTooltip(true);
    const x = e.clientX + 15 + window.scrollX;
    const y = e.clientY - 55 + window.scrollY;
    const maxWidth = window.innerwidth - 115;
    const maxHeight = window.innerHeight - 110;

    setCursor({
      x: x < 0 ? 0 : maxWidth < x ? maxWidth : x,
      y: y < 0 ? 0 : maxHeight < y ? maxHeight : y,
    });
  }

  return (
    <Card
      card={card}
      isSelected={isSelected}
      isHorizontal={isHorizontal}
      onMouseMove={onHover}
      onMouseOut={(e) => setShowTooltip(false)}
      onSelect={onSelect}
    >
      {showTooltip && (
        <Tooltip cursor={cursor}>
          <Card card={card} onSelect={() => {}}>
            <CardDetails card={card} />
          </Card>
        </Tooltip>
      )}
      {children}
    </Card>
  );
}

export function SmallCard({ card, isSelected, onSelect }) {
  return (
    <CardWithTooltip
      card={card}
      isSelected={isSelected}
      onSelect={onSelect}
      isHorizontal
    >
      <CardSummary card={card} isSelected={isSelected} isHorizontal />
    </CardWithTooltip>
  );
}

export function PlayerHandCard({ card, isSelected, onSelect }) {
  return (
    <CardWithTooltip card={card} isSelected={isSelected} onSelect={onSelect}>
      <CardDetails card={card} isSelected={isSelected} />
    </CardWithTooltip>
  );
}
