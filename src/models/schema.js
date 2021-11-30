export const schema = {
    "models": {
        "EquityInvestment": {
            "name": "EquityInvestment",
            "fields": {
                "id": {
                    "name": "id",
                    "isArray": false,
                    "type": "ID",
                    "isRequired": true,
                    "attributes": []
                },
                "companyId": {
                    "name": "companyId",
                    "isArray": false,
                    "type": "ID",
                    "isRequired": true,
                    "attributes": []
                },
                "date": {
                    "name": "date",
                    "isArray": false,
                    "type": "String",
                    "isRequired": false,
                    "attributes": []
                },
                "investedAmount": {
                    "name": "investedAmount",
                    "isArray": false,
                    "type": "Int",
                    "isRequired": false,
                    "attributes": []
                },
                "currency": {
                    "name": "currency",
                    "isArray": false,
                    "type": {
                        "enum": "Currency"
                    },
                    "isRequired": false,
                    "attributes": []
                },
                "cashFlows": {
                    "name": "cashFlows",
                    "isArray": true,
                    "type": {
                        "nonModel": "CashFlow"
                    },
                    "isRequired": true,
                    "attributes": [],
                    "isArrayNullable": true
                },
                "nbShares": {
                    "name": "nbShares",
                    "isArray": false,
                    "type": "Int",
                    "isRequired": false,
                    "attributes": []
                },
                "note": {
                    "name": "note",
                    "isArray": false,
                    "type": {
                        "nonModel": "Note"
                    },
                    "isRequired": false,
                    "attributes": []
                },
                "createdAt": {
                    "name": "createdAt",
                    "isArray": false,
                    "type": "AWSDateTime",
                    "isRequired": false,
                    "attributes": [],
                    "isReadOnly": true
                },
                "updatedAt": {
                    "name": "updatedAt",
                    "isArray": false,
                    "type": "AWSDateTime",
                    "isRequired": false,
                    "attributes": [],
                    "isReadOnly": true
                }
            },
            "syncable": true,
            "pluralName": "EquityInvestments",
            "attributes": [
                {
                    "type": "model",
                    "properties": {}
                },
                {
                    "type": "key",
                    "properties": {
                        "name": "byCompany",
                        "fields": [
                            "companyId"
                        ]
                    }
                }
            ]
        },
        "LoanInvestment": {
            "name": "LoanInvestment",
            "fields": {
                "id": {
                    "name": "id",
                    "isArray": false,
                    "type": "ID",
                    "isRequired": true,
                    "attributes": []
                },
                "companyId": {
                    "name": "companyId",
                    "isArray": false,
                    "type": "ID",
                    "isRequired": true,
                    "attributes": []
                },
                "date": {
                    "name": "date",
                    "isArray": false,
                    "type": "String",
                    "isRequired": false,
                    "attributes": []
                },
                "investedAmount": {
                    "name": "investedAmount",
                    "isArray": false,
                    "type": "Int",
                    "isRequired": false,
                    "attributes": []
                },
                "currency": {
                    "name": "currency",
                    "isArray": false,
                    "type": {
                        "enum": "Currency"
                    },
                    "isRequired": false,
                    "attributes": []
                },
                "cashFlows": {
                    "name": "cashFlows",
                    "isArray": true,
                    "type": {
                        "nonModel": "CashFlow"
                    },
                    "isRequired": true,
                    "attributes": [],
                    "isArrayNullable": true
                },
                "maturity": {
                    "name": "maturity",
                    "isArray": false,
                    "type": "String",
                    "isRequired": false,
                    "attributes": []
                },
                "interestRateInPercent": {
                    "name": "interestRateInPercent",
                    "isArray": false,
                    "type": "Float",
                    "isRequired": false,
                    "attributes": []
                },
                "interestPayments": {
                    "name": "interestPayments",
                    "isArray": true,
                    "type": {
                        "nonModel": "CashFlow"
                    },
                    "isRequired": true,
                    "attributes": [],
                    "isArrayNullable": true
                },
                "repayments": {
                    "name": "repayments",
                    "isArray": true,
                    "type": {
                        "nonModel": "CashFlow"
                    },
                    "isRequired": true,
                    "attributes": [],
                    "isArrayNullable": true
                },
                "note": {
                    "name": "note",
                    "isArray": false,
                    "type": {
                        "nonModel": "Note"
                    },
                    "isRequired": false,
                    "attributes": []
                },
                "createdAt": {
                    "name": "createdAt",
                    "isArray": false,
                    "type": "AWSDateTime",
                    "isRequired": false,
                    "attributes": [],
                    "isReadOnly": true
                },
                "updatedAt": {
                    "name": "updatedAt",
                    "isArray": false,
                    "type": "AWSDateTime",
                    "isRequired": false,
                    "attributes": [],
                    "isReadOnly": true
                }
            },
            "syncable": true,
            "pluralName": "LoanInvestments",
            "attributes": [
                {
                    "type": "model",
                    "properties": {}
                },
                {
                    "type": "key",
                    "properties": {
                        "name": "byCompany",
                        "fields": [
                            "companyId"
                        ]
                    }
                }
            ]
        },
        "Company": {
            "name": "Company",
            "fields": {
                "id": {
                    "name": "id",
                    "isArray": false,
                    "type": "ID",
                    "isRequired": true,
                    "attributes": []
                },
                "name": {
                    "name": "name",
                    "isArray": false,
                    "type": "String",
                    "isRequired": false,
                    "attributes": []
                },
                "equityInvestments": {
                    "name": "equityInvestments",
                    "isArray": true,
                    "type": {
                        "model": "EquityInvestment"
                    },
                    "isRequired": true,
                    "attributes": [],
                    "isArrayNullable": true,
                    "association": {
                        "connectionType": "HAS_MANY",
                        "associatedWith": "companyId"
                    }
                },
                "loanInvestments": {
                    "name": "loanInvestments",
                    "isArray": true,
                    "type": {
                        "model": "LoanInvestment"
                    },
                    "isRequired": true,
                    "attributes": [],
                    "isArrayNullable": true,
                    "association": {
                        "connectionType": "HAS_MANY",
                        "associatedWith": "companyId"
                    }
                },
                "sharesOutstanding": {
                    "name": "sharesOutstanding",
                    "isArray": true,
                    "type": {
                        "nonModel": "SharesOutstanding"
                    },
                    "isRequired": true,
                    "attributes": [],
                    "isArrayNullable": true
                },
                "notes": {
                    "name": "notes",
                    "isArray": true,
                    "type": {
                        "nonModel": "Note"
                    },
                    "isRequired": true,
                    "attributes": [],
                    "isArrayNullable": true
                },
                "createdAt": {
                    "name": "createdAt",
                    "isArray": false,
                    "type": "AWSDateTime",
                    "isRequired": false,
                    "attributes": [],
                    "isReadOnly": true
                },
                "updatedAt": {
                    "name": "updatedAt",
                    "isArray": false,
                    "type": "AWSDateTime",
                    "isRequired": false,
                    "attributes": [],
                    "isReadOnly": true
                }
            },
            "syncable": true,
            "pluralName": "Companies",
            "attributes": [
                {
                    "type": "model",
                    "properties": {}
                }
            ]
        }
    },
    "enums": {
        "Currency": {
            "name": "Currency",
            "values": [
                "CHF",
                "EUR",
                "USD",
                "GBP",
                "JPY"
            ]
        },
        "Account": {
            "name": "Account",
            "values": [
                "ZKB_CHF",
                "ZKB_USD",
                "ZKB_EUR",
                "CS",
                "Other"
            ]
        },
        "DocumentType": {
            "name": "DocumentType",
            "values": [
                "AnnualStatement",
                "GeneralAssembly",
                "InvestmentPresentation",
                "Prospectus",
                "Email",
                "Letter",
                "Article"
            ]
        }
    },
    "nonModels": {
        "CashFlow": {
            "name": "CashFlow",
            "fields": {
                "date": {
                    "name": "date",
                    "isArray": false,
                    "type": "String",
                    "isRequired": false,
                    "attributes": []
                },
                "amount": {
                    "name": "amount",
                    "isArray": false,
                    "type": "Int",
                    "isRequired": false,
                    "attributes": []
                },
                "account": {
                    "name": "account",
                    "isArray": false,
                    "type": {
                        "enum": "Account"
                    },
                    "isRequired": false,
                    "attributes": []
                },
                "fx": {
                    "name": "fx",
                    "isArray": false,
                    "type": "Float",
                    "isRequired": false,
                    "attributes": []
                }
            }
        },
        "Note": {
            "name": "Note",
            "fields": {
                "id": {
                    "name": "id",
                    "isArray": false,
                    "type": "ID",
                    "isRequired": true,
                    "attributes": []
                },
                "date": {
                    "name": "date",
                    "isArray": false,
                    "type": "String",
                    "isRequired": false,
                    "attributes": []
                },
                "note": {
                    "name": "note",
                    "isArray": false,
                    "type": "String",
                    "isRequired": false,
                    "attributes": []
                },
                "pdfLink": {
                    "name": "pdfLink",
                    "isArray": false,
                    "type": "String",
                    "isRequired": false,
                    "attributes": []
                },
                "documentType": {
                    "name": "documentType",
                    "isArray": false,
                    "type": {
                        "enum": "DocumentType"
                    },
                    "isRequired": false,
                    "attributes": []
                }
            }
        },
        "SharesOutstanding": {
            "name": "SharesOutstanding",
            "fields": {
                "id": {
                    "name": "id",
                    "isArray": false,
                    "type": "ID",
                    "isRequired": true,
                    "attributes": []
                },
                "date": {
                    "name": "date",
                    "isArray": false,
                    "type": "String",
                    "isRequired": false,
                    "attributes": []
                },
                "nbShares": {
                    "name": "nbShares",
                    "isArray": false,
                    "type": "Int",
                    "isRequired": false,
                    "attributes": []
                },
                "companyId": {
                    "name": "companyId",
                    "isArray": false,
                    "type": "ID",
                    "isRequired": true,
                    "attributes": []
                }
            }
        }
    },
    "version": "ef7a06ed9221bb1d120d7dff687358bf"
};