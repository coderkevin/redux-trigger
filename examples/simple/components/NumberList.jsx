import React, { Component, PropTypes } from 'react';

export default class NumberList extends Component {
	render() {
		const { numbers } = this.props;

		return (
			<div>
				<ul>
					{
						numbers.map( ( value ) => {
							return <li>{ value }</li>;
						} )
					}
				</ul>
			</div>
		);
	}
}

NumberList.propTypes = {
	numbers: PropTypes.array.isRequired
};

