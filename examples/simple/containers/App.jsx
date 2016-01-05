import React, { Component, PropTypes } from 'react';
import { connect } from 'react-redux';
import NumberPicker from '../components/NumberPicker';
import NumberList from '../components/NumberList';
import WorkingMessage from '../components/WorkingMessage';
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
		const { numberEntry, primes, nonPrimes, queue } = this.props;
		let workMessage = <span> &nbsp; </span>;

		if ( queue.length > 0 ) {
			workMessage = <WorkingMessage count={ queue.length } itemType="number" />;
		}

		return (
			<div>
				<h1>Calculate Prime Numbers</h1>
				<NumberPicker submitText={ submitText }
				              value={ numberEntry }
				              onChange={ this.handleNumberEntryChange }
				              onSubmit={ this.handleNumberEntrySubmit } />

				<em>{ workMessage }</em>

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
	queue: PropTypes.array.isRequired,
	dispatch: PropTypes.func.isRequired
};

function mapStateToProps( state ) {
	const { numberEntry, primeState } = state;
	const { primes, nonPrimes, queue } = primeState;

	return {
		numberEntry,
		primes,
		nonPrimes,
		queue
	};
}

export default connect( mapStateToProps )( App );

