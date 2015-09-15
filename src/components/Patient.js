'use strict';

const React = require('react/addons');

const Patient = React.createClass({

  contextTypes: {
    router: React.PropTypes.func
  },

  render: function() {
    let currentParams = this.context.router.getCurrentParams();
    return (
      <div>PATIENT {currentParams.id}</div>
    );
  }
});

module.exports = Patient;
