'use strict';

const ReactBmiApp = require('./ReactBmiApp');
const About = require('./About');
const Patient = require('./Patient');
const Patients = require('./Patients');
const React = require('react');
const Router = require('react-router');
const Route = Router.Route;

const content = document.getElementById('content');

const Routes = (
  <Route handler={ReactBmiApp}>
    <Route name="/" handler={Patients}>
      <Route path="/patient/:id" handler={Patient}/>
    </Route>
    <Route name="about" handler={About}/>
  </Route>
);

Router.run(Routes, function (Handler) {
  React.render(<Handler/>, content);
});
