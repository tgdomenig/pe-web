// @ts-check
import { initSchema } from '@aws-amplify/datastore';
import { schema } from './schema';

const Currency = {
  "CHF": "CHF",
  "EUR": "EUR",
  "USD": "USD",
  "GBP": "GBP",
  "JPY": "JPY"
};

const Account = {
  "ZKB_CHF": "ZKB_CHF",
  "ZKB_USD": "ZKB_USD",
  "ZKB_EUR": "ZKB_EUR",
  "CS": "CS",
  "OTHER": "Other"
};

const DocumentType = {
  "ANNUAL_STATEMENT": "AnnualStatement",
  "GENERAL_ASSEMBLY": "GeneralAssembly",
  "INVESTMENT_PRESENTATION": "InvestmentPresentation",
  "PROSPECTUS": "Prospectus",
  "EMAIL": "Email",
  "LETTER": "Letter",
  "ARTICLE": "Article"
};

const { EquityInvestment, LoanInvestment, Company, CashFlow, Note, SharesOutstanding } = initSchema(schema);

export {
  EquityInvestment,
  LoanInvestment,
  Company,
  Currency,
  Account,
  DocumentType,
  CashFlow,
  Note,
  SharesOutstanding
};