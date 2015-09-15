'use strict';

const React = require('react/addons');
const Router = require('react-router');
const { RouteHandler, Link } = Router;

const Patients = React.createClass({

  contextTypes: {
    router: React.PropTypes.func
  },

  render: function() {
    let patients = [ { name: 'Smith, Bob', id: 'sx-155' }, { name: 'Zoo, Keep', id: 'sx-156' } ];
    let currentParams = this.context.router.getCurrentParams();
    let createPatient = (patient) => {
      let navClass = React.addons.classSet({ 'nav-item': true, 'active': currentParams.id === patient.id });
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
            {patients.map(createPatient)}
          </ul>
        </div>
        <RouteHandler/>
      </div>
    );
  }

});

module.exports = Patients;
