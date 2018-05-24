import React from 'react';
import {PropTypes} from 'prop-types';

class About extends React.PureComponent {
  constructor(props, context) {
    super(props, context);
  }

  render() {
    return (
      <div>Welcome About!</div>
    );
  }
}

About.propTypes = {};

export default About;