import React, {useContext, useEffect, useState} from "react";
import {
  BrowserRouter as Router,
  Routes,
  Route,
  // Redirect
} from "react-router-dom";

import Dashboard from '../dashboard/Dashboard';
import PdfDocument from '../Company/PdfDocument'

import FetchPdf from '../Company/FetchPdf'

export default function Navigator({navigation, routeName, props}) {

  return (
    <div>
        {/* A <Switch> looks through its children <Route> and
            renders the first one that matches the current URL. */}

        {/* <Redirect to={routeName} /> */}

        <Routes>
          <Route exact path="/" element={<Dashboard navigation={navigation} />} />
          <Route path="/show-document/" element={<FetchPdf />} />
        </Routes>
      </div>
  );
}
