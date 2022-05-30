import React, { useState } from 'react';
import './Navigation.css';
import { BrowserRouter, Routes, Route, Link, useLocation } from "react-router-dom";


function NavigationItem({ to, name }) {
 return <Link
  className={(useLocation().pathname === to) ? 'active' : ''}
  to={to}>
    <span>{name}</span>
    <div className="indicator" />
 </Link>
}

export function Tab({ path, children }) {
  return children;
}

export function NavigationMenu({ children }) {
  if (children.find(child => !('path' in child.props && 'name' in child.props ) )) {
    console.error('NavigationMenu children need to be of type Tab.');
  }
  return <BrowserRouter>
    <div className='navigation-menu'>
      <nav>
        {children.map(child => 
          <NavigationItem 
            key={child.props.path} 
            to={child.props.path} 
            name={child.props.name} 
          />
        )}
      </nav>
      <div className='navigation-menu-buffer' />
    </div>
    <div>
      <Routes>
        {children.map(child => 
          <Route 
            key={child.props.path} 
            path={child.props.path} 
            element={child} 
          />
        )}
      </Routes>
    </div>
</BrowserRouter>
}
