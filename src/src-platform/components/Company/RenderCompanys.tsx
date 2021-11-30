import React, {useContext, useState, useEffect} from 'react';
import { Table, Modal, Form, Input, Button, Space } from "antd";
import { DataStore } from '@aws-amplify/datastore';

import { configureAntdDataTable } from '../../util/antd/DataTableUtil';

import {generate} from '../../../src-common/data/sampleData'

import { EntityType } from '../../../src-common/data/persistence/DSBaseConfig';
import { getAll, getAllExpanded} from '../../../src-common/data/persistence/DSBase'

import ItcButton from '../base/ItcButton'
import { mylog } from '../../../src-common/util/general/Base';
import { Company, EquityInvestment } from '../../../models';
import RenderCompany from './RenderCompany';

import { Link } from "react-router-dom";

interface props {
  navigation: any
}



export default function RenderCompanys(props: props) {

  const {navigation} = props;

  const [companys, setCompanys] = useState([] as Array<Company>);

  const [company, setCompany] = useState(null as Company | null);

  const loadCompanys = async () => {
    const recs = await getAllExpanded(EntityType.Company);
//    const {dataSource: dataSource0, columns: columns0} = configureAntdDataTable(EntityType.Company, recs);

mylog("", "RECS: ", recs);
    setCompanys(recs);
  }

  useEffect(() => {

    loadCompanys();

  }, [])

  return (
    <div>

      <Space style={{marginTop: 20, marginBottom: 20}}>{
        companys && companys.length > 0 &&
        companys.map(cmpny => {
          return <Button className={cmpny === company ? "active" : "" } type="text" onClick={() => { setCompany(cmpny); }}>{cmpny.name}</Button>
          })
        }
      </Space>

      {company && <RenderCompany company={company} />}

    </div>
  )

}