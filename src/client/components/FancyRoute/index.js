import React from 'react';
import { Route } from 'react-router-dom';
import nprogress from 'nprogress';
import 'nprogress/nprogress.css';
import './index.scss';

class Routes extends React.Component {
  UNSAFE_componentWillMount () {
    nprogress.start();
  }

  componentDidMount () {
    nprogress.done();
  }

  render () {
    return (
      <Route {...this.props} />
    );
  }
}

export default Routes;
