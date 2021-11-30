import { mylog, formatPercent, formatAmount, formatDate } from "../../../../src-common/util/general/Base";
import {removeDuplicates} from '../../../../src-common/util/general/ListsAndStuff'

import { ColumnType, AlignOptionType } from '../../../../src-common/data/persistence/RenderConfig';

import type { TableColumnConfig } from '../../../../src-common/data/persistence/RenderConfig';

interface AntdTableColumnCfg {
  dataIndex: string,
  key: string,
  filters?: Array<{Text: string, value: string}>,
  onFilter?: Function,
  sorter?: Function
  render?: Function
  align?: AlignOptionType
}

// interface AntdTableColumnInput {
//   title: string,
//   columnType: ColumnType, 
//   accessor: string,
//   sortOn?: string,
//   render?: Function
//   align?: AlignOptionType
// }

export function getAntdColumnCfgs(dataSource: Array<object>, columns: Array<TableColumnConfig>): Array<AntdTableColumnCfg> {
  return columns.map(col => ({
      title: col.title,
      ...getAntdColumnCfg(dataSource, col)
    }
  ));
}

export function getAntdColumnCfg(dataSource: Array<object>, columnInput: TableColumnConfig): AntdTableColumnCfg {
  switch (columnInput.columnType) {
    case ColumnType.text: 
      return getTextColumn(dataSource, columnInput, null);

    case ColumnType.Date:
      return getTextColumn(dataSource, columnInput, (d: string) => { mylog("", "D: ", d); return formatDate(new Date(d))});

    case ColumnType.Amount:
      return getTextColumn(dataSource, columnInput, (amt: number) => formatAmount(amt));

    case ColumnType.Amount_0:
      return getTextColumn(dataSource, columnInput, (amt: number) => formatAmount(amt, 0));

    case ColumnType.Amount_1:
      return getTextColumn(dataSource, columnInput, (amt: number) => formatAmount(amt, 1));

    case ColumnType.Amount_2:
      return getTextColumn(dataSource, columnInput, (amt: number) => formatAmount(amt, 2));

    case ColumnType.userData: 
      return getUserColumn(dataSource as Array<UserDataContainer>, columnInput);

    case ColumnType.arrayWithNames: 
      return getArrayWithNamesColumn(dataSource, columnInput);
  }
  return getDefaultColumn(dataSource, columnInput);
}

function getDefaultColumn(dataSource: Array<object>, columnInput: TableColumnConfig) : AntdTableColumnCfg {
  const {accessor} = columnInput;
  const result : AntdTableColumnCfg = {
    dataIndex: accessor,
    key: accessor
  };

  return result;
}

function getTextColumn(dataSource: Array<object>, columnInput: TableColumnConfig, render: Function | null) : AntdTableColumnCfg {
  const {accessor, sortOn, align} = columnInput;

  const sortField = sortOn || accessor; // sort on target by default

  const result : AntdTableColumnCfg = {
    dataIndex: accessor,
    key: accessor,
    filters: getSimpleTextFilters(dataSource.map((ob: any) => ob[accessor])),
    onFilter: (Text: string, ob: any) => textEqual(Text, ob[accessor]),
    sorter: (ob1: any, ob2: any) => {
      const x=ob1[sortField], y=ob2[sortField];
      return x ? (y ? (y > x ? -1 : 1) : -1) : 1
    }
  };

  if (align) {
    result.align = align;
  }

  if (render) {
    result.render = render
  }

  return result;
}

function getArrayWithNamesColumn(dataSource: Array<object>, columnInput: TableColumnConfig) : AntdTableColumnCfg {
  const {accessor, render} = columnInput;
  const result : AntdTableColumnCfg = {
    dataIndex: accessor,
    key: accessor,
    render: render as Function
  };

  return result;
}

interface UserData {
  firstName: string,
  lastName: string,
  displayName: string,
  title?: string
}

interface UserDataContainer {
  userData: UserData
}

function getUserColumn(dataSource: Array<UserDataContainer>, columnInput: TableColumnConfig): AntdTableColumnCfg {
  const {accessor} = columnInput;

  const result = {
    dataIndex: accessor,
    key: accessor,
    render: (Text: string, ob: any) => ob[accessor]['displayName'],
    filters: getSimpleTextFilters(dataSource.map((ob: any) => ob[accessor]['displayName'])),
    onFilter: (Text: string, ob: any) => textEqual(Text, ob[accessor]['displayName']),
    sorter: (ob1: any, ob2: any) => {
      const usr1 = ob1[accessor];
      const usr2 = ob2[accessor];
      for (var field of ['lastName', 'firstName', 'title']) {
        if (usr2[field] > usr1[field]) { return true; }
        if (usr2[field] < usr1[field]) { return false; }
      }
      return true;
    }
  };
  return result;
}

export function getSimpleTextFilters(texts: Array<string>): Array<{Text: string, value: string}> {
  if (! texts) { return []; }
  return (removeDuplicates(texts).sort().map(txt => ({Text: txt, value: txt})))
}

export function textEqual(txt1: string, txt2: string): boolean {
  return txt1 === txt2;
}

