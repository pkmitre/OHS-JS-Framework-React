'use strict';

const Chart = require('chart.js/Chart.js');
const React = require('react/addons');

const BmiChart = React.createClass({

  getInitialState: function() { return {}; },

  renderChart: function(props) {
    // Parse out data from observations
    let labels = [], values = [];
    for (let observation of props.observations) {
      labels.push(observation.date.toLocaleDateString());
      values.push(observation.value);
    }

    // Graph auto-scaling looks weird here, so use custom scaling, but set max dynamically
    let maxBMI = Math.max.apply(null, values);
    let scaleSteps = Math.ceil(maxBMI / 10);

    // Build the graph, destroying old one if necessary
    if (this.state.chart) { this.state.chart.destroy(); }
    let domNode = this.getDOMNode();
    let chart = new Chart(domNode.getContext('2d'));
    let lineMethod = chart.Line.bind(chart); // Linter complains about capital function names
    this.state.chart = lineMethod({
      labels: labels,
      datasets: [
        {
          fillColor: 'rgba(151,187,205,0.2)',
          strokeColor: 'rgba(151,187,205,1)',
          pointColor: 'rgba(151,187,205,1)',
          pointStrokeColor: '#fff',
          pointHighlightFill: '#fff',
          pointHighlightStroke: 'rgba(151,187,205,1)',
          data: values
        }
      ]
    }, {
      scaleOverride: true,
      scaleSteps: scaleSteps,
      scaleStepWidth: 10,
      scaleStartValue: 0
    });
  },

  componentDidMount: function() { this.renderChart(this.props); },

  componentWillReceiveProps: function(newProps) { this.renderChart(newProps); },

  render: function() {
    return <canvas width="400" height="400"></canvas>;
  }

});

module.exports = BmiChart;
