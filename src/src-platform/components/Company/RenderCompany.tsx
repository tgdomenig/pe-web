import React, {useContext, useState, useEffect} from 'react';
import { Table, Modal, Form, Input, Button, Tabs, Typography, Card  } from "antd";
import { DataStore } from '@aws-amplify/datastore';

import { configureAntdDataTable } from '../../util/antd/DataTableUtil';
import { TabularEntity } from '../../util/antd/DataTableUtil';


import ItcButton from '../base/ItcButton'
import { mylog } from '../../../src-common/util/general/Base';
import { Company, EquityInvestment, LoanInvestment, SharesOutstanding } from '../../../models';

import CompanyOverview from './CompanyOverview';
import CompanyNotes from './CompanyNotes';

import 'antd/dist/antd.css';
import { missingConfig } from '@aws-amplify/core';
// import './company.css'

import RenderInvestments from './RenderInvestments'

interface props {
  company: Company
}

export default function RenderCompany(props: props) {

  const {company} = props;

  const {equityInvestments, loanInvestments, notes} = company;

  return (
    <div>
  
      {
        company && 
          
        <Card className={'company-container'}>

            <Typography.Title key={company.id}>{company.name}</Typography.Title>
            <Tabs type="card" id={'company-tabs'}>

              <Tabs.TabPane tab="Übersicht" key="1">
                <CompanyOverview company={company} />
              </Tabs.TabPane>

              {equityInvestments && equityInvestments.length > 0 &&
                <Tabs.TabPane tab="Aktientransaktionen" key="4">
                  <RenderInvestments tabularEntity={TabularEntity.EquityInvestment} investments={equityInvestments} />
                </Tabs.TabPane>
              }

              {loanInvestments && loanInvestments.length > 0 &&
                <Tabs.TabPane tab="Darlehen" key="5">
                  <RenderInvestments tabularEntity={TabularEntity.LoanInvestment} investments={loanInvestments} />
                </Tabs.TabPane>
              }
              
              {notes && notes.length > 0 &&
                <Tabs.TabPane tab="Notes" key="3">
                  <CompanyNotes notes={notes} />
                </Tabs.TabPane>
              }

            </Tabs>
          </Card>
      }

    </div>
  )
}

