'use strict';

const React = require('react/addons');
const Router = require('react-router');
const RouteHandler = Router.RouteHandler;

const Patients = React.createClass({
  render: function() {
    return (
      <div>
        PATIENTS
        <RouteHandler/>
      </div>
    );
  }
});

module.exports = Patients;
