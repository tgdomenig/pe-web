import React, {useContext, useState, useEffect} from 'react';
import { Table, Modal, Form, Input, Button } from "antd";
import { DataStore } from '@aws-amplify/datastore';

import { configureAntdDataTable, TabularEntity } from '../../util/antd/DataTableUtil';


import {} from '../../../src-common/data/sampleData'

import ItcButton from '../base/ItcButton'
import { mylog } from '../../../src-common/util/general/Base';
import { EquityInvestment, LoanInvestment } from '../../../models';

interface props {
  tabularEntity: TabularEntity
  investments: Array<LoanInvestment> | Array<EquityInvestment>
}

export default function RenderInvestments(props: props) {

  const {tabularEntity, investments} = props;

  const [tableData, setTableData] = useState([] as Array<any>);
  const [tableColumns, setTableColumns] = useState([] as Array<any>);

  const [cashFlowTableData, setCashFlowTableData] = useState([] as Array<any>);
  const [cashFlowTableColumns, setCashFlowTableColumns] = useState([] as Array<any>);

  useEffect(() => {
    if (investments) {
      const {dataSource: dataSource0, columns: columns0} = configureAntdDataTable(tabularEntity, investments);
      setTableData(dataSource0);
      setTableColumns(columns0);
      clearCashFlowTable();
    }
  }, [investments]);

  const showCashFlowTable = (investment: EquityInvestment | LoanInvestment) => {
    if (investment) {
      const {cashFlows} = investment;
      if (cashFlows) {
        const {dataSource: dataSource0, columns: columns0} = configureAntdDataTable(TabularEntity.CashFlow, cashFlows);
        setCashFlowTableData(dataSource0);
        setCashFlowTableColumns(columns0);
        return;
      }
    }
    clearInvestmentTable();
  }

  const clearInvestmentTable = () => {
    setTableData([]);
    setTableColumns([]);
  }

  const clearCashFlowTable = () => {
    setCashFlowTableData([]);
    setCashFlowTableColumns([]);
  }

  return (
    <div>
      {tableData && tableData.length > 0 && 
        <div style={{marginTop: 10, marginBottom: 10}}>
          <Table dataSource={tableData} columns={tableColumns}
            onRow={record => ({onClick: () => { console.log(record); showCashFlowTable(record)}})}
          />
        </div>
      }

      {cashFlowTableData && cashFlowTableData.length > 0 && 
          <div style={{marginTop: 10, marginBottom: 10}}>
            <Table dataSource={cashFlowTableData} columns={cashFlowTableColumns}
            />
          </div>
      }
    </div>
  )

}