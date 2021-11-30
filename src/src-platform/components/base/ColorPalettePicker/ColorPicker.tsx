import React from 'react'
import './ColorPalettePicker.css'

interface props {
  palette: string[][], 
  onSelect: (arg: string) => void
}

export default function ColarPicker(props: props) {
  const {palette, onSelect} = props;
  return(
    <div>
      {palette.map((row, i) => (
        <div key={"row=" + i} style={{display: 'flex', flexDirection: 'row'}}>
          {row.map((cell, j) => {
            return (
              <div key={"row=" + i + " col=" + j} className={'color-cell'} style={{backgroundColor: cell}}
                onClick={() => onSelect(cell)}>
              </div>
            )
          }
          )}
        </div>
      ))}
    </div>
  )
}
