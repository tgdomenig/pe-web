import React, {useContext, useState, useEffect} from 'react';

import Amplify from '@aws-amplify/core'
import Auth from '@aws-amplify/auth'
import API from '@aws-amplify/api'

// import { Storage } from 'aws-amplify';
import Storage from '@aws-amplify/storage';
import awsconfig from '../../../aws-exports';

import { useLocation } from "react-router-dom";

import { Descriptions, Button } from "antd";

import { mylog } from '../../../src-common/util/general/Base';
import { Company, Note } from '../../../models';

import 'antd/dist/antd.css';

import { Document, Page, pdfjs } from 'react-pdf';
pdfjs.GlobalWorkerOptions.workerSrc = `//cdnjs.cloudflare.com/ajax/libs/pdf.js/${pdfjs.version}/pdf.worker.min.js`;

Amplify.configure(awsconfig);
API.configure(awsconfig);
Storage.configure(awsconfig);
Auth.configure(awsconfig);


export default function FetchPdf() {

  const location = useLocation()
  mylog("", "LOCATION: ", location)

  const { pdfLink } = location.state

//  const pdfLink = "s3://pe-web5c44226f99ce4601acb3eb040fb7c9e9peenv-peenv/public/20170829_Informationen_Gaudenz.pdf";
  
  mylog("", "PDFLINK: ", pdfLink)

  const [signedURL, setSignedURL] = useState(undefined as string|undefined);

  async function fetchURL(key: string) {
    console.log("SIGNING IN");

    const newSignedURL = await Storage.get(key);
    console.log(newSignedURL);
    if (newSignedURL) {
      mylog("", "SIGNED URL: ", newSignedURL);
      setSignedURL(newSignedURL);
    }

//    try {
//      const user = await Auth.signIn("thomas", "&s2R2KS5eZpn&wAs0");
//      const user = await Auth.signIn("tdomenig@it-couture.ch", "*2jZRxy4x8!@Bay");
    //   const user = await Auth.signIn("tdomenig@it-couture.ch", "fHWjVCK_");

    //   console.log("SIGNED IN")
    //   console.log(user);

    //   const user2 = await Auth.currentAuthenticatedUser();
    //   mylog("", "Auth.currentAuthenticatedUser()", user2);

    //   const result = await Auth.currentCredentials();
    //   mylog("", "Auth.currentCredentials()", result);

    //   const result2 = await Auth.currentSession();
    //   mylog("", "Auth.currentSession()", result2);

    // } catch (error) {
    //   console.log("error");
    //   console.log(error);
    // }

  }

  useEffect(() => {
    if (pdfLink) {
      fetchURL(pdfLink);
    }
  },
  [pdfLink]);

  // if (pdfLink) {
  //   window.location.href = pdfLink;

  // }


  if (pdfLink) {
    if (signedURL) {
      return <a href={signedURL} target="_blank">Open PDF</a>
    }
    else {
      return (<div>PDF NOT FOUND</div>)
    }
  }
  else {
    return (<>NO PDF LINK</>)
  }
}


