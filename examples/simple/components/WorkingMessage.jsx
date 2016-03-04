import React, { Component, PropTypes } from 'react';

export default class WorkingMessage extends Component {
	render() {
		const { count, itemType } = this.props;

		return (
			<span>
				Working on { count } { itemType }(s).
			</span>
		);
	}
}

WorkingMessage.propTypes = {
	count: PropTypes.number.isRequired,
	itemType: PropTypes.string.isRequired
};

