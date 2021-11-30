import React from 'react';

import { mylog } from '../../../src-common/util/general/Base'

import ItcButton, {ItcButtonParameters} from './ItcButton'

export interface ItcButtonPairParameters {
  transparent?: boolean,
  leftButton: ItcButtonParameters, 
  rightButton: ItcButtonParameters,
  className?: string
}

/*
Note: the parameters 'transparent' and 'className' can be provided either for the pair of buttons or for 
each individual button. However, the parameters on pair-level are only applied if both parameters on the
individual level are missing.
*/
export default function ItcButtonPair(args: ItcButtonPairParameters) {

  const {transparent, leftButton, rightButton, className} = args;

  const leftButtonClone = {...leftButton}
  const rightButtonClone = {...rightButton}

  if (! leftButton.className && ! rightButton.className) {
    leftButtonClone.className = 'left ' + (className || '');
    rightButtonClone.className = 'right ' + (className || '');
  }

  if (transparent && ! ('transparent' in leftButton || 'transparent' in rightButton)) {
    leftButtonClone.transparent = true;
    rightButtonClone.transparent = true;
  }

  return (
    <div className={'button-pair'}>
      <ItcButton {...leftButtonClone} />
      <ItcButton {...rightButtonClone} />
    </div>
  );
}
