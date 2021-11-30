import React, {useContext, useState, useEffect} from 'react';

import { useLocation } from "react-router-dom";

import { Descriptions, Button } from "antd";

import { mylog } from '../../../src-common/util/general/Base';
import { Company, Note } from '../../../models';

import 'antd/dist/antd.css';


export default function PdfDocument() {

  const location = useLocation()
  mylog("", "LOCATION: ", location)

  const { pdfLink } = location.state
  mylog("", "PDFLINK: ", pdfLink)

  if (pdfLink) {
    window.location.href = pdfLink;

  }


  if (pdfLink) {
    return (
            <div>
              <div>PDF DOCUMENT HERE</div>
            </div>
    )
  }
  else {
    return (<></>)
  }
}


