'use strict';

const React = require('react/addons');

const Patient = React.createClass({

  setupObservations: function(patient) {
    this.setState({ observations: [] });
    if (patient) {
      patient.observations(null, (observations) => this.setState({ observations: observations }));
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

    let createObservation = (o) => <li>{o.displayType}: {o.value} ({o.date.toDateString()})</li>;

    let noObservationsMessage = this.state.observations.length === 0 ? <p>No observations</p> : '';

    return (
      <div className="col-xs-9">
        <h1>{patient.name}</h1>
        {noObservationsMessage}
        <ul>{this.state.observations.map(createObservation)}</ul>
      </div>
    );
  }
});

module.exports = Patient;
