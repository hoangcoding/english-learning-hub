import React, {Component} from 'react';
import Translation from "../../containers/Translation";
import withLayout from "../../hocs/Layout";
import requiresAuth from "../../hocs/requiresAuth";
export default requiresAuth(withLayout(Translation));