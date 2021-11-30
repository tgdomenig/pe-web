import React from 'react';

import { mylog } from '../../../src-common/util/general/Base'

import {Button} from 'antd'

import './buttons.css'

export interface ItcButtonParameters {
  label: string
  action?: React.MouseEventHandler<HTMLElement> | undefined,
  disabled?: boolean,
  className?: string
  transparent?: boolean
}

const ButtonParametersDefaults = {
  disabled: false,
  transparent: false,
  className: ''
}

export default function ItcButton(args: ItcButtonParameters) {
  const {label, action, disabled, className, transparent} = {...ButtonParametersDefaults, ...args};
  let actualClassName = className + ' itc-button';
  if (disabled) { actualClassName += ' disabled'; }
  if (transparent) { actualClassName += ' transparent'; }

  return <Button onClick={action} className={actualClassName} disabled={disabled} >{label}</Button>;
}

