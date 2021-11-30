import { ModelInit, MutableModel, PersistentModelConstructor } from "@aws-amplify/datastore";

export enum Currency {
  CHF = "CHF",
  EUR = "EUR",
  USD = "USD",
  GBP = "GBP",
  JPY = "JPY"
}

export enum Account {
  ZKB_CHF = "ZKB_CHF",
  ZKB_USD = "ZKB_USD",
  ZKB_EUR = "ZKB_EUR",
  CS = "CS",
  OTHER = "Other"
}

export enum DocumentType {
  ANNUAL_STATEMENT = "AnnualStatement",
  GENERAL_ASSEMBLY = "GeneralAssembly",
  INVESTMENT_PRESENTATION = "InvestmentPresentation",
  PROSPECTUS = "Prospectus",
  EMAIL = "Email",
  LETTER = "Letter",
  ARTICLE = "Article"
}

export declare class CashFlow {
  readonly date?: string;
  readonly amount?: number;
  readonly account?: Account | keyof typeof Account;
  readonly fx?: number;
  constructor(init: ModelInit<CashFlow>);
}

export declare class Note {
  readonly id: string;
  readonly date?: string;
  readonly note?: string;
  readonly pdfLink?: string;
  readonly documentType?: DocumentType | keyof typeof DocumentType;
  constructor(init: ModelInit<Note>);
}

export declare class SharesOutstanding {
  readonly id: string;
  readonly date?: string;
  readonly nbShares?: number;
  readonly companyId: string;
  constructor(init: ModelInit<SharesOutstanding>);
}

type EquityInvestmentMetaData = {
  readOnlyFields: 'createdAt' | 'updatedAt';
}

type LoanInvestmentMetaData = {
  readOnlyFields: 'createdAt' | 'updatedAt';
}

type CompanyMetaData = {
  readOnlyFields: 'createdAt' | 'updatedAt';
}

export declare class EquityInvestment {
  readonly id: string;
  readonly companyId: string;
  readonly date?: string;
  readonly investedAmount?: number;
  readonly currency?: Currency | keyof typeof Currency;
  readonly cashFlows?: CashFlow[];
  readonly nbShares?: number;
  readonly note?: Note;
  readonly createdAt?: string;
  readonly updatedAt?: string;
  constructor(init: ModelInit<EquityInvestment, EquityInvestmentMetaData>);
  static copyOf(source: EquityInvestment, mutator: (draft: MutableModel<EquityInvestment, EquityInvestmentMetaData>) => MutableModel<EquityInvestment, EquityInvestmentMetaData> | void): EquityInvestment;
}

export declare class LoanInvestment {
  readonly id: string;
  readonly companyId: string;
  readonly date?: string;
  readonly investedAmount?: number;
  readonly currency?: Currency | keyof typeof Currency;
  readonly cashFlows?: CashFlow[];
  readonly maturity?: string;
  readonly interestRateInPercent?: number;
  readonly interestPayments?: CashFlow[];
  readonly repayments?: CashFlow[];
  readonly note?: Note;
  readonly createdAt?: string;
  readonly updatedAt?: string;
  constructor(init: ModelInit<LoanInvestment, LoanInvestmentMetaData>);
  static copyOf(source: LoanInvestment, mutator: (draft: MutableModel<LoanInvestment, LoanInvestmentMetaData>) => MutableModel<LoanInvestment, LoanInvestmentMetaData> | void): LoanInvestment;
}

export declare class Company {
  readonly id: string;
  readonly name?: string;
  readonly equityInvestments?: EquityInvestment[];
  readonly loanInvestments?: LoanInvestment[];
  readonly sharesOutstanding?: SharesOutstanding[];
  readonly notes?: Note[];
  readonly createdAt?: string;
  readonly updatedAt?: string;
  constructor(init: ModelInit<Company, CompanyMetaData>);
  static copyOf(source: Company, mutator: (draft: MutableModel<Company, CompanyMetaData>) => MutableModel<Company, CompanyMetaData> | void): Company;
}