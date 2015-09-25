'use strict';

const React = require('react/addons');
const TestUtils = React.addons.TestUtils;
const Patient = require('components/Patient.js');

require('babel/polyfill');

describe('Patient', () => {

  let observation = { id: 1, displayType: 'BMI', value: '18', unit: '', date: new Date() };
  let observations = (callback) => { callback([observation]); };

  let patient = { familyName: 'Smith', givenName: 'Joe', name: 'Joe Smith', id: 1, derivedBMIObservations: observations };
  let component;

  beforeEach(() => {
    component = <Patient patient={patient} />;
  });

  it('should create a new instance of Patient', () => {
    expect(component).toBeDefined();
  });

  it('should render patient', () => {
    let rendered = TestUtils.renderIntoDocument(component);
    let text = rendered.getDOMNode().textContent;
    expect(text).toMatch(new RegExp(patient.name));
    expect(text).toMatch(new RegExp(observation.displayType));
    expect(text).toMatch(new RegExp(observation.value));
    expect(text).toMatch(new RegExp(observation.date.toDateString()));
  });

});
