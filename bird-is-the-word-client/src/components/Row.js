import React from 'react';
import Square from './Square'
import Tile from './Tile'

const Row = (props) => {
  const squares = props.row.map((square, index)=> {
    return <Square square={square} x={props.x} y={index} key={index} />
  })
  return(
    <tr>
      {squares}
    </tr>
  )
}


export default Row;