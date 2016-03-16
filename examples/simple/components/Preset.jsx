import React, { Component, PropTypes } from 'react';

export default class Preset extends Component {
	render() {
		const { value, onClick } = this.props;

		return (
			<button onClick={ onClick }>{ value }</button>
		);
	}
}

Preset.propTypes = {
	value: PropTypes.string.isRequired,
	onClick: PropTypes.func.isRequired
}

