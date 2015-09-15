'use strict';

const React = require('react/addons');
const Router = require('react-router');
const { RouteHandler, Link } = Router;

const Patients = React.createClass({

  render: function() {

    let selectedPatient = this.props.patients.find((p) => p.id === this.props.params.id);

    let createPatient = (patient) => {
      let navClass = React.addons.classSet({ 'nav-item': true, 'active': patient.id === this.props.params.id });
      return (
        <li className={navClass}>
          <Link className="nav-link" to="patient" params={patient}>{patient.name}</Link>
        </li>
      );
    };

    return (
      <div className="row">
        <div className="col-lg-3">
          <h4>Patients <small>(sorted alphabetically)</small></h4>
          <ul className="nav nav-pills nav-stacked">
            {this.props.patients.map(createPatient)}
          </ul>
        </div>
        <RouteHandler patient={selectedPatient}/>
      </div>
    );

  }

});

module.exports = Patients;
