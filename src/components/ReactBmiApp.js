'use strict';

const React = require('react/addons');
const Router = require('react-router');
const { RouteHandler, Link } = Router;

// CSS
require('normalize.css');
require('../styles/main.css');

var ReactBmiApp = React.createClass({
  render: function() {
    return (
      <div class="container">
        <nav class="navbar navbar-light bg-faded">
          <Link class="navbar-brand" to="/">OHS JS Bakeoff</Link>
          <ul class="nav navbar-nav">
            <li class="nav-item">
              <Link class="nav-link" to="/">Home</Link>
            </li>
            <li class="nav-item active">
              <Link class="nav-link" to="about">About<span class="sr-only">(current)</span></Link>
            </li>
          </ul>
        </nav>
        <RouteHandler/>
      </div>
    );
  }
});

module.exports = ReactBmiApp;
