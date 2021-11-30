import React, {useContext, useState, useEffect} from 'react';

import { Descriptions, Button } from "antd";

import { mylog } from '../../../src-common/util/general/Base';
import { Company, Note } from '../../../models';

import { Link } from "react-router-dom";

import 'antd/dist/antd.css';

// import './company.css'

const PdfDir = '../../../assets/pdf'

interface props {
  notes: Note[] | undefined
}

export default function CompanyNotes(props: props) {

  const {notes} = props;

  if (notes) {
    return (
      <div className={'company-overview-container'}>
        <Descriptions labelStyle={{width: 300}} bordered column={1}>
          {notes.map(({date, note, pdfLink}, i) => (
              <Descriptions.Item key={i} label={date}>
                {note && <div>{note}</div>}
                {/* {pdfLink && <div>{PdfDir + pdfLink}</div>} */}
                {pdfLink && 
                  <Link to={'/show-document/'} state={{pdfLink}}>PDF</Link>
                }
                
              </Descriptions.Item>
            )
          )}
        </Descriptions>
      </div>
    )
  }
  else {
    return (<></>)
  }
}


