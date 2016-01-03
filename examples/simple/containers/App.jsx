import React, { Component, PropTypes } from 'react';
import { connect } from 'react-redux';

class App extends Component {
  constructor( props ) {
    super( props );
  }

  render() {
    return (
      <div>
        <h1>redux-trigger simple example</h1>
      </div>
    );
  }
}

App.propTypes = {
  dispatch: PropTypes.func.isRequired
};

function mapStateToProps( state ) {
  return { };
}

export default connect( mapStateToProps )( App );

