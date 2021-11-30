
import { Company, EquityInvestment, SharesOutstanding } from '../../../../models';
import { mylog } from '../../../../src-common/util/general/Base';
import {ColumnType, AlignOptionType} from './ColumnsUtilDEP';


interface NamedObject {
  name: string,
  [key: string]: any // expand type dynamically; can hold several additional keys
}

interface CompanyReferencingOb {
  company: NamedObject,
  [key: string]: any // expand type dynamically; can hold several additional keys
}

function substituteCompanyName (ob: CompanyReferencingOb) {
  if ('company' in ob) {
    const {company, ...rest} = ob;
    return {companyName: company.name, ...rest};
  }
  else {
    return {companyName: '', ...ob};
  }
}

function stageCompany (company: Company) {
  const {equityInvestments} = company;
  const totalInvestedAmount = equityInvestments ? equityInvestments.reduce((total, {investedAmount}) => total + (investedAmount || 0), 0) : 0;

  return {...company, totalInvestedAmount};
}

function stageEquityInvestment(ob: EquityInvestment) {
  const {investedAmount, nbShares} = ob;
  const pricePerShare = (investedAmount && nbShares) ? investedAmount / nbShares : undefined;
  return {pricePerShare, ...ob};
}


export const Preprocessors = { // keys must correspond to EntityType
  Company: stageCompany,
  SharesOutstanding: substituteCompanyName,
  EquityInvestment: stageEquityInvestment,
  LoanInvestment: substituteCompanyName,
  CashFlow: null,
  Note: null,
}

export const ColumsCfg = { // keys must correspond to EntityType
  Company: [
    {
      title: 'Name',
      columnType: ColumnType.text,
      accessor: 'name'
    },
    {
      title: 'Total Investment',
      columnType: ColumnType.Amount,
      accessor: 'totalInvestedAmount'
    }
  ],
  SharesOutstanding: [
    {
      title: 'Company',
      columnType: ColumnType.text,
      accessor: 'companyName'
    },
    {
      title: 'Number of Shares Outstanding',
      columnType: ColumnType.Amount,
      accessor: 'nbShares'
    }
  ],
  EquityInvestment: [
    {
      title: 'Date',
      columnType: ColumnType.Date,
      accessor: 'date'
    },
    {
      title: 'Invested Amount',
      columnType: ColumnType.Amount,
      accessor: 'investedAmount',
      align: "right" as AlignOptionType
    },
    {
      title: 'Currency',
      columnType: ColumnType.text,
      accessor: 'currency'
    },
    {
      title: 'Number of Shares',
      columnType: ColumnType.Amount,
      accessor: 'nbShares'
    },
    {
      title: 'Price per Share',
      columnType: ColumnType.Amount,
      accessor: 'pricePerShare'
    },
    {
      title: 'Note',
      columnType: ColumnType.text,
      accessor: 'note'
    },
  ],
  LoanInvestment: [
    {
      title: 'Date',
      columnType: ColumnType.Date,
      accessor: 'date'
    },
    {
      title: 'Invested Amount',
      columnType: ColumnType.Amount,
      accessor: 'investedAmount',
      align: "right" as AlignOptionType
    },
    {
      title: 'Currency',
      columnType: ColumnType.text,
      accessor: 'currency'
    },
    {
      title: 'Maturity',
      columnType: ColumnType.Date,
      accessor: 'maturity'
    },
    {
      title: 'Note',
      columnType: ColumnType.text,
      accessor: 'note'
    },
  ],
  CashFlow: [
    {
      title: 'Date',
      columnType: ColumnType.Date,
      accessor: 'date'
    },
    {
      title: 'Amount',
      columnType: ColumnType.Amount,
      accessor: 'amount'
    },
    {
      title: 'Account',
      columnType: ColumnType.text,
      accessor: 'account'
    },
    {
      title: 'FX',
      columnType: ColumnType.text,
      accessor: 'fx'
    }
  ],
  Note: [
    {
      title: 'Date',
      columnType: ColumnType.Date,
      accessor: 'date'
    },
    {
      title: 'Note',
      columnType: ColumnType.text,
      accessor: 'note'
    },
    {
      title: 'PDF-Link',
      columnType: ColumnType.text,
      accessor: 'pdfLink'
    },
  ],
}
