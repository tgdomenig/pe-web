import React, {useContext, useState} from 'react';
import { mylog } from '../../../src-common/util/general/Base';

// import Companys from '../Company/Companys'
import RenderCompanys from '../Company/RenderCompanys'

import DBExplorer from './DBExplorer'

interface props {
  navigation: any
}

export default function Dashboard(props: props) {

  return (
    <div>
      <DBExplorer />

      {/* <Companys /> */}
      <RenderCompanys navigation={props.navigation} />
    </div>
  )
}