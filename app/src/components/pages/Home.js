import React from 'react';
import {PropTypes} from 'prop-types';

class Home extends React.PureComponent {
  constructor(props, context) {
    super(props, context);
  }

  render() {
    return (
      <div>Welcome Home!</div>
    );
  }
}

Home.propTypes = {};

export default Home;