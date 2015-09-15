'use strict';

const React = require('react/addons');

const Patient = React.createClass({

  setupObservations: function(patient) {
    this.setState({ observations: [] });
    patient.observations(null, (observations) => this.setState({ observations: observations }));
  },

  componentWillMount: function() {
    this.setupObservations(this.props.patient);
  },

  componentWillReceiveProps: function(newProps) {
    this.setupObservations(newProps.patient);
  },

  render: function() {
    let patient = this.props.patient;
    let createObservation = (o) => <p>{o.displayType}: {o.value} ({o.date.toDateString()})</p>;
    return (
      <div>
        <h1>{patient.name}</h1>
        {this.state.observations.map(createObservation)}
      </div>
    );
  }
});

module.exports = Patient;
