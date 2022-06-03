import React, { useState } from 'react';
import { GridLayout, Responsive, WidthProvider } from 'react-grid-layout';
import './GameInterface.css';

const ResponsiveGridLayout = WidthProvider(Responsive);

function GridItemWrapper({ item, isEditModeEnabled }) {
  const [showTitle, setShowTitle] = useState(false);

  return <div 
    onMouseMove={e => setShowTitle(true)} 
    onMouseOut={e => setShowTitle(false)} 
    style={{'width': '100%', 'height': '100%'}}
  >
    { isEditModeEnabled && showTitle &&
      <div className="grid-item__title">
        Drag here
      </div> 
    }
    <div className="grid-item__body">
      {item}
    </div>
  </div>;
}

function EditModeToggle({ isEditModeEnabled, onEditModeToggle }) {
  return <div className='edit-mode-control'>
      <button onClick={e => {e.preventDefault(); onEditModeToggle(!isEditModeEnabled)}} >{ isEditModeEnabled ? 'Turn Edit Mode Off' : 'Turn Edit Mode On' }</button>
    </div>
}

function filterObjectKeys(item, keys) {
  return Object.entries(item).reduce(
    (newItem, [key, val]) => keys.includes(key) ? { [key]: val,  ...newItem } : newItem, 
    {}
  );
}

export function GameInterface({ children }) {
  const [breakpoint, setBreakPoint] = useState("lg");
  const [isEditModeEnabled, setIsEditModeEnabled] = useState(false);

  // Edit layout in the browser. After each edit there is a console output you can copy/paste here.
  const layouts = {
    lg: [{"i":"1","y":0,"x":0,"h":1,"w":12},{"i":"2","y":1,"x":0,"h":9,"w":6},{"i":"3","y":1,"x":6,"h":12,"w":6},{"i":"4","y":13,"x":0,"h":5,"w":12},{"i":"5","y":10,"x":0,"h":3,"w":6}]
    // sm: [
    //   { i: "1", x: 0, y: 0, w: 1, h: 1 },
    //   { i: "2", x: 1, y: 0, w: 2, h: 2 },
    //   { i: "3", x: 1, y: 0, w: 2, h: 2 },
    //   { i: "4", x: 1, y: 0, w: 2, h: 2 },
    // ]
  };

  function handleLayoutChange(layout) {
    const keysToPrint = ['i', 'w', 'h', 'x', 'y', ];
    const prettyLayout = layout.map((block) => filterObjectKeys(block, keysToPrint));
        
    console.log(`changed layout to:\n ${JSON.stringify(prettyLayout)}\n`, layout)
  }


  function handleBreakPointChange(bp) {
    setBreakPoint(bp);
  };

  function handleEditModeToggle(newValue) {
    setIsEditModeEnabled(newValue);
  }

  return <div>
    <EditModeToggle 
      isEditModeEnabled={isEditModeEnabled} 
      onEditModeToggle={handleEditModeToggle}
    />
    <ResponsiveGridLayout
          className="layout"
          layouts={layouts}
          rowHeight={32}
          breakpoint={breakpoint}
          onBreakpointChange={handleBreakPointChange}
          isDraggable={isEditModeEnabled}
          isRearrangeable={isEditModeEnabled}
          isResizable={isEditModeEnabled}
          onLayoutChange={handleLayoutChange}
          draggableHandle=".grid-item__title"
          // breakpoints={{ lg: 1280, md: 992, sm: 767, xs: 480, xxs: 0 }}
          // cols={{ lg: 12, md: 10, sm: 6, xs: 4, xxs: 2 }}
          breakpoints={{ lg: 0 }}
          cols={{ lg: 12 }}
      >
        {/* When I turn this into a component it has a react ref bug */}
        { children.slice().map((child, i) => 
            <div className={'grid-item' + (isEditModeEnabled ? ' editable': '') } key={i+1} >
              <GridItemWrapper isEditModeEnabled={isEditModeEnabled} item={child} />
            </div>
        ) }
    </ResponsiveGridLayout>
    </div>
}