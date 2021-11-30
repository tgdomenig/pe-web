
import {getAntdColumnCfgs} from './AntdTableUtil';

import { Preprocessors, AttributeConfig } from '../../../../src-common/data/persistence/RenderConfig'

export enum TabularEntity {
  EquityInvestment="EquityInvestment",
  LoanInvestment="LoanInvestment",
  Company="Company",
  SharesOutstanding="SharesOutstanding",
  CashFlow="CashFlow",
  Note="Note"
}

export function configureAntdDataTable(entity: TabularEntity, dbRecords: any[]) {

  const preprocessor = Preprocessors[entity];

  const dataSource = preprocessor ? dbRecords.map((ob, i) => preprocessor(ob)) : dbRecords;

  // configure the columns
  let columns = getAntdColumnCfgs(dataSource, AttributeConfig[entity]);

  return {dataSource, columns}
}

