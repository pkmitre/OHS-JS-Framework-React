'use strict';

const React = require('react/addons');
const Router = require('react-router');
const { RouteHandler, Link } = Router;

// We could use a more React-y form of bootstrap
//const ReactBootstrap = require('react-bootstrap');
//const { Nav } = ReactBootstrap;

// CSS
require('normalize.css');
require('../styles/main.css');
require('bootstrap/dist/css/bootstrap.min.css');

var ReactBmiApp = React.createClass({

  contextTypes: {
    router: React.PropTypes.func
  },

  render: function() {
    let currentPath = this.context.router.getCurrentPath();
    let homeClass = React.addons.classSet({ 'nav-item': true, 'active': currentPath === '/' });
    let aboutClass = React.addons.classSet({ 'nav-item': true, 'active': currentPath === '/about' });
    return (
      <div className="container">
        <nav className="navbar navbar-light bg-faded">
          <Link className="navbar-brand" to="/">OHS JS Bakeoff</Link>
          <ul className="nav nav-pills">
            <li className={homeClass}>
              <Link className="nav-link" to="/">Home</Link>
            </li>
            <li className={aboutClass}>
              <Link className="nav-link" to="about">About</Link>
            </li>
          </ul>
        </nav>
        <RouteHandler/>
      </div>
    );
  }

});

module.exports = ReactBmiApp;
