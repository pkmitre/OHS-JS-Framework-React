'use strict';

const React = require('react/addons');
const BmiChart = require('./BmiChart.js');

const Patient = React.createClass({

  setupObservations: function(patient) {
    this.setState({ observations: [] });
    if (patient) {
      patient.derivedBMIObservations((observations) => this.setState({ observations: observations }));
    }
  },

  componentWillMount: function() {
    this.setupObservations(this.props.patient);
  },

  componentWillReceiveProps: function(newProps) {
    this.setupObservations(newProps.patient);
  },

  render: function() {

    let patient = this.props.patient;
    if (!patient) {
      return <div/>;
    }

    let createObservation = (o) => <li key={o.id}>{o.displayType}: {o.value} {o.unit} ({o.date.toDateString()})</li>;

    let noObservationsMessage = this.state.observations.length === 0 ? <p>No observations</p> : '';

    return (
      <div className="col-xs-9">
        <h1>{patient.name}</h1>
        {noObservationsMessage}
        <ul>{this.state.observations.map(createObservation)}</ul>
        <BmiChart observations={this.state.observations}/>
      </div>
    );
  }
});

module.exports = Patient;
