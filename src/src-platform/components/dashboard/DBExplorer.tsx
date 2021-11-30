import React, {useContext, useState} from 'react';
import { Table, Modal, Form, Input, Button } from "antd";
import { DataStore } from '@aws-amplify/datastore';

import { configureAntdDataTable, TabularEntity } from '../../util/antd/DataTableUtil';

import {generate, sync} from '../../../src-common/data/sampleData'

import { EntityType } from '../../../src-common/data/persistence/DSBaseConfig';
import { getAll, getAllExpanded} from '../../../src-common/data/persistence/DSBase'


import ItcButton from '../base/ItcButton'
import { mylog } from '../../../src-common/util/general/Base';

export default function DBExplorer() {

  const [columns, setColumns] = useState([] as Array<any>);
  const [dataSource, setDataSource] = useState([] as Array<any>);

  const [showTree, setShowTree] = useState<EntityType | null>(null);

  const showEntities = async (entityType: EntityType, tabularEntity: TabularEntity) => {
    const {dataSource: dataSource0, columns: columns0} = await getAntdTableData(entityType, tabularEntity);
    mylog("", "dataSource0, columns0", dataSource0, columns0)
    setColumns([...columns0]);
    setDataSource([...dataSource0]);
  }

  return (
    <>
    <div style={{marginTop: 10, marginBottom: 10}}>
      <ItcButton label={"Generate Data"} action={() => generate()}/>

      <ItcButton label={"Sync Data"} action={() => sync()}/>

      <ItcButton label={"Clear Whole DB"} action={clearDB}/>

      <ItcButton label={"Console-Log DB"} action={consoleLogDB}/>

      <ItcButton label={"Console-Log Expanded DB"} action={consoleLogExpandedDB}/>
    </div>
    <div style={{marginTop: 10, marginBottom: 10}}>

      <ItcButton label={"Show Company"} action={() => showEntities(EntityType.Company, TabularEntity.Company)}/>
      <ItcButton label={"Show EquityInvestment"} action={() => showEntities(EntityType.EquityInvestment, TabularEntity.EquityInvestment)}/>
    </div>

      {dataSource && dataSource.length > 0 && 
        <div style={{marginTop: 10, marginBottom: 10}}>
          <Table dataSource={dataSource} columns={columns}
            onRow={record => ({onClick: () => { console.log(record); }})}
           />
        </div>
      }

    {/* {
      (showTree === EntityType.FoodItem) && <FoodItemTree />
    } */}

    </>
  )
}

async function consoleLogDB() {
  for (var entityType of Object.values(EntityType)) {
    const recs = await getAll(entityType);
    mylog("", "entityType, Records", entityType, recs);
  }
  
}

async function consoleLogExpandedDB() {
  for (var entityType of Object.values(EntityType)) {
    const recs = await getAllExpanded(entityType);
    mylog("", "entityType, Records", entityType, recs);
  } 
}


async function clearDB() {
  await DataStore.clear();  
}

async function getAntdTableData(entityType: EntityType, tabularEntity: TabularEntity) {
  const recs = await getAllExpanded(entityType);

  mylog("", "recs", recs)

  return configureAntdDataTable(tabularEntity, recs)

  // mylog("", "getAntdTableData: recs", recs)

  // switch (entityType) {
  //   case EntityType.FoodItemCategory:
  //     return getTableDataFoodItemCategories(recs);
  //   case EntityType.FoodItemSubCategory:
  //     return getTableDataFoodItemSubCategories(recs);
  //   case EntityType.FoodItem:
  //     return getTableDataFoodItems(recs);
  // }

  // return {dataSource: [], columns: []}

}

// function getTableDataFoodItemCategories(dataSource: any[]) {

//   const columns = getAntdColumnCfgs(dataSource, AntdTableColumsCfg.FoodItemCategories);

//   return {dataSource, columns};
// }

// function getTableDataFoodItemSubCategories(dataSource: any[]) {

//   mylog("", "getTableDataFoodItemSubCategories: dataSource", dataSource)

//   const columns = getAntdColumnCfgs(dataSource, AntdTableColumsCfg.FoodItemSubCategories);

//   // const columns = [
//   //   {
//   //     title: 'Food Item Sub-Categories',
//   //     ...getAntdColumnCfg(ColumnType.text, dataSource, 'name')
//   //   },
//   //   {
//   //     title: 'Food Item Sub-Categories',
//   //     ...getAntdColumnCfg(ColumnType.text, dataSource, 'name')
//   //   }
//   // ]

//   return {dataSource, columns};
// }

// function getTableDataFoodItems(recs: any[]) {

//   mylog("", "recs", recs)

//   const dataSource = recs.map(({name, isBaseSupply, units, subCategory, tags}) => {
//     return({
//       name, 
//       isBaseSupply: isBaseSupply ? "Yes" : "No", 
//       subCategory: subCategory.name
//     })
//   })

//   const columns = getAntdColumnCfgs(dataSource, AntdTableColumsCfg.FoodItems);

//   // const columns = [
//   //   {
//   //     title: 'Name',
//   //     ...getAntdColumnCfg(ColumnType.text, dataSource, 'name')
//   //   },
//   //   {
//   //     title: "Is Base Supply",
//   //     ...getAntdColumnCfg(ColumnType.text, dataSource, 'isBaseSupply')
//   //   },
//   //   {
//   //     title: "Sub-Category",
//   //     ...getAntdColumnCfg(ColumnType.text, dataSource, 'subCategory')
//   //   }
//   // ]

//   return {dataSource, columns};
// }
