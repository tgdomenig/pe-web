import React, { useState } from 'react'
import  {Modal } from 'antd'
import ItcButton, {ItcButtonParameters} from '../../base/ItcButton'
import ColorPalettePicker from './ColorPicker'

interface props {
  palette: string[][], 
  onSelect: (arg: string) => void,
  button: ItcButtonParameters
}

export default function ModalPickerButton(props: props) {

  const {palette, onSelect, button} = props;
  
  const [isModalVisible, setVisible] = useState(false);

  const hideModal = (evt: React.MouseEvent) => {
//    evt.stopPropagation();
    setVisible(false);
  }

  const showModal = (evt: React.MouseEvent) => {
//    evt.stopPropagation();
    setVisible(true);
  }

  const selectAction = (color: string) => {
    onSelect(color);
    setVisible(false);
  }

  const popupProps = {
    title: 'Select a color',
    footer: null,
    wrapClassName: 'select-color'   
  }

  console.log("visible: " + isModalVisible)
  return(
    <div>
      <Modal {...popupProps} visible={isModalVisible} onCancel={hideModal} >
        <ColorPalettePicker palette={palette} onSelect={selectAction} />
      </Modal>
      <ItcButton {...button} action={showModal} />
    </div>
  )
}
