import { mylog } from "../../../src-common/util/general/Base";
import {getAs, Fmt, countDatesInWeeks} from '../../../src-common/util/general/DateUtilFns'
import {compareAsc, addWeeks, getWeek} from 'date-fns'
import {removeDuplicates} from '../../../src-common/util/general/ListsAndStuff'

export function getCalendarWeekFilters(dates) {
  if (! dates) { return []; }
  const weeks = countDatesInWeeks(dates);
  return weeks.map(({startOfWeek, nbItemsInWeek}) => (
    { 
      text: `Week: ${getWeek(startOfWeek, {startOfWeek: 1})}, starting on ${getAs(startOfWeek, Fmt.dateStr)}`, 
      value: startOfWeek
    }
  ));  
}
export function isInCalendarWeek(date, startOfWeek) {
  return compareAsc(startOfWeek, date) <= 0 && compareAsc(date, addWeeks(startOfWeek,1)) < 0;
}

export function getSimpleTextFilters(texts) {
  if (! texts) { return []; }
  return (removeDuplicates(texts).sort().map(txt => ({text: txt, value: txt})))
}

export function textEqual(txt1, txt2) {
  return txt1 === txt2;
}

export function getDateTimeColumn({dataSource, accessor}) {
  return {
    dataIndex: accessor,
    key: accessor,
    render: (text, ob) => getAs(ob[accessor], Fmt.prettyDateStr),
    sorter: {
      compare: (ob1, ob2) => compareAsc(ob1[accessor], ob2[accessor])
    },
    filters: getCalendarWeekFilters(dataSource.map(ob => ob[accessor])),
    onFilter: (startOfWeek, ob) => isInCalendarWeek(ob[accessor], startOfWeek)
  };
}

export function getDateFromToColumn({dataSource, accessorFrom, accessorTo}) {
  return {
    dataIndex: accessorFrom,
    key: accessorFrom,
    render: (text, ob) => `${getAs(ob[accessorFrom], Fmt.prettyDateTimeStr)} to ${getAs(ob[accessorTo], Fmt.timeStr)}`,
    sorter: {
      compare: (ob1, ob2) => compareAsc(ob1[accessorFrom], ob2[accessorFrom])
    },
    filters: getCalendarWeekFilters(dataSource.map(ob => ob[accessorFrom])),
    onFilter: (startOfWeek, ob) => isInCalendarWeek(ob[accessorFrom], startOfWeek)
  };
}


export function getTextColumn({dataSource, accessor, sortOn: accessorSortField}) {
  const result = {
    dataIndex: accessor,
    key: accessor,
    filters: getSimpleTextFilters(dataSource.map(ob => ob[accessor])),
    onFilter: (text, ob) => textEqual(text, ob[accessor])
  };
  if (accessorSortField) {
    result.sorter = (ob1, ob2) => ob2[accessorSortField] > ob1[accessorSortField];
  }
  return result;
}

export function getUserColumn({dataSource, userAccessor}) {
  const result = {
    dataIndex: userAccessor,
    key: userAccessor,
    render: (text, ob) => ob[userAccessor]['displayName'],
    filters: getSimpleTextFilters(dataSource.map(ob => ob[userAccessor]['displayName'])),
    onFilter: (text, ob) => textEqual(text, ob[userAccessor]['displayName']),
    sorter: (ob1, ob2) => {
      const usr1 = ob1[userAccessor];
      const usr2 = ob2[userAccessor];
      for (var field of ['lastName', 'firstName', 'title']) {
        if (usr2[field] > usr1[field]) { return true; }
        if (usr2[field] < usr1[field]) { return false; }
      }
      return true;
    }
  };
  return result;
}