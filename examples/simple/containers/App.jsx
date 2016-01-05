import React, { Component, PropTypes } from 'react';
import { connect } from 'react-redux';
import NumberPicker from '../components/NumberPicker';
import NumberList from '../components/NumberList';
import { setNumberEntry } from '../actions/numberentry';
import { addNumber } from '../actions/primes';

class App extends Component {
	constructor( props ) {
		super( props );
		this.handleNumberEntryChange = this.handleNumberEntryChange.bind( this );
		this.handleNumberEntrySubmit = this.handleNumberEntrySubmit.bind( this );
	}

	handleNumberEntryChange( e ) {
		this.props.dispatch( setNumberEntry( e.target.value ) );
	}

	handleNumberEntrySubmit( e ) {
		e.preventDefault();

		const { numberEntry } = this.props;
		this.props.dispatch( setNumberEntry( '' ) );
		this.props.dispatch( addNumber( numberEntry ) );
	}

	render() {
		const submitText = "Add Number";
		const { numberEntry, primes, nonPrimes } = this.props;

		return (
			<div>
				<NumberPicker submitText={ submitText }
				              value={ numberEntry }
				              onChange={ this.handleNumberEntryChange }
											onSubmit={ this.handleNumberEntrySubmit } />
				<h2>Primes</h2>
				<NumberList numbers={ primes } />
				<h2>Non-Primes</h2>
				<NumberList numbers={ nonPrimes } />
			</div>
		);
	}
}

App.propTypes = {
	numberEntry: PropTypes.string.isRequired,
	primes: PropTypes.array.isRequired,
	nonPrimes: PropTypes.array.isRequired,
	dispatch: PropTypes.func.isRequired
};

function mapStateToProps( state ) {
	const { numberEntry, primeState } = state;
	const { primes, nonPrimes } = primeState;

	return {
		numberEntry,
		primes,
		nonPrimes
	};
}

export default connect( mapStateToProps )( App );

