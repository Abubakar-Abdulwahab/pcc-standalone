// Link.js
import React from 'react';
import { useRouteContext } from '../contexts/RouteContext';


const RLink = ({ to, children }) => {
  const { dispatch } = useRouteContext();

  const handleClick = () => {
    dispatch({ type: 'NAVIGATE', payload: to });
  };

  return (
    <a href={to} onClick={handleClick}>
      {children}
    </a>
  );
};

export default RLink;
