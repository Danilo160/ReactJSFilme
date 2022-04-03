import React from 'react';

function Busca(props) {
  return (
    <div className="searchbox-wrap">
      <input type="search" 
      placeholder="Busque por um filme..." 
      className="searchbox" 
      onChange={props.handleInput}
      onKeyPress={props.handleKeyPress}
      />
    </div>
    
  );

}

export default Busca;