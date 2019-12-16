import React, {Component} from 'react';
import Game from "../../containers/Game";
import withLayout from "../../hocs/Layout";
import requiresAuth from "../../hocs/requiresAuth";
export default requiresAuth(withLayout(Game));
