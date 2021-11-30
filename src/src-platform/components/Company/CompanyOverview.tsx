import React, {useContext, useState, useEffect} from 'react';
import { Descriptions } from "antd";

import { mylog, formatPercent, formatAmount, formatDate } from '../../../src-common/util/general/Base';
import { Company, EquityInvestment } from '../../../models';

import 'antd/dist/antd.css';

import { missingConfig } from '@aws-amplify/core';
// import './company.css'

interface props {
  company: Company
}

export default function CompanyOverview(props: props) {

  const {company} = props;

  const [totalInvestment, setTotalInvestment] = useState(0);
  const [sharesOutstanding, setSharesOutstanding] = useState(0);  
  const [totalNbShares, setTotalNbShares] = useState(0);  
  const [investedSince, setInvestedSince] = useState('');
  const [shareInPercent, setShareInPercent] = useState(0);

  useEffect(() => {
    if (company) {
      const {equityInvestments} = company;
      if (equityInvestments) {

        const {totalInvestment: totalInvestment0, investedSince: investedSince0, shareInPercent: shareInPercent0, sharesOutstanding: sharesOutstanding0, totalNbShares: totalNbShares0} = getInvestmentOverview(company);
        setTotalInvestment(totalInvestment0);
        setSharesOutstanding(sharesOutstanding0);
        setTotalNbShares(totalNbShares0);
        setInvestedSince(investedSince0);
        setShareInPercent(shareInPercent0);
      }

    }
  }, [company])

  if (company) {
    return (
            <div className={'company-overview-container'}>
              <Descriptions labelStyle={{width: 300}} bordered column={1} contentStyle={{textAlign: 'end'}}>
                <Descriptions.Item label="Investition">{formatAmount(totalInvestment)}</Descriptions.Item>
                <Descriptions.Item label="Investiert seit">{formatDate(new Date(investedSince))}</Descriptions.Item>
                <Descriptions.Item label="Beteiligung (%)">{formatPercent(shareInPercent)}</Descriptions.Item>
                <Descriptions.Item label="Anzahl Aktien">{formatAmount(totalNbShares)}</Descriptions.Item>
                <Descriptions.Item label="Aktien gesamt">{formatAmount(sharesOutstanding)}</Descriptions.Item>
              </Descriptions>
            </div>
    )
  }
  else {
    return (<></>)
  }
}

function getInvestmentOverview(company: Company) {
  let totalInvestment = 0, investedSince = '', totalNbShares = 0, sharesOutstanding = 0;
  const {equityInvestments} = company;
  if (equityInvestments && equityInvestments.length > 0) {
    for (let {date, investedAmount, nbShares} of equityInvestments) {
      if (date) {
        if (investedSince === '' || date < investedSince) {
          investedSince = date;
        }
      }
      if (investedAmount) {
        totalInvestment += totalInvestment;
      }
      if (nbShares) {
        totalNbShares += nbShares;
      }
    }
    investedSince = equityInvestments[0].date || 'unknown';
    mylog("", "equityInvestments", equityInvestments)
    totalInvestment = equityInvestments.reduce((total, investment: EquityInvestment) => total + (investment.investedAmount || 0), 0);
  }

  let shareInPercent = 0;

  if (company.sharesOutstanding) {
    let mostRecentDate = '';
    for (let {date, nbShares} of company.sharesOutstanding) {

      if (date && date > mostRecentDate) {
        mostRecentDate = date;
        sharesOutstanding = nbShares || 0;
      }
    }
    if (totalNbShares && sharesOutstanding > 0) {
      shareInPercent = 100*totalNbShares/sharesOutstanding;
    }
  }

  return ({totalInvestment, investedSince, totalNbShares, shareInPercent, sharesOutstanding});
}