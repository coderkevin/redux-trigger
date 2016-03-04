import React, { Component, PropTypes } from 'react';

export default class NumberPicker extends Component {
  render() {
    const { submitText, value, onChange, onSubmit } = this.props;

    return (
      <span>
        <form onSubmit={ onSubmit }>
          <label>
            Number:
            <input type="text" value={ value } onChange={ onChange } />
          </label>
          <button type="submit" value="Submit">{ submitText }</button>
        </form>
      </span>
    );
  }
}

NumberPicker.propTypes = {
  submitText: PropTypes.string.isRequired,
  value: PropTypes.string.isRequired,
  onChange: PropTypes.func.isRequired,
  onSubmit: PropTypes.func.isRequired
};

