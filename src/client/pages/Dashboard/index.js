import React, {Component} from 'react';
import Dashboard from "../../containers/Dashboard";
import withLayout from "../../hocs/Layout";
import requiresAuth from "../../hocs/requiresAuth";
export default requiresAuth(withLayout(Dashboard));
