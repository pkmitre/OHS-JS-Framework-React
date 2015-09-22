'use strict';

const $ = require('webpack-dev-server/client/web_modules/jquery');

//const endpoint = 'http://argonaut.healthintersections.com.au/open';
//const endpoint = 'http://spark.furore.com/fhir';
const endpoint = 'http://mm181308-pc:3001';

class Observation {

  constructor(resource) {
    this.resource = resource;
  }

  get id() {
    return this.resource.id;
  }

  get value() {
    return this.resource.valueQuantity.value;
  }

  get unit() {
    return this.resource.valueQuantity.unit;
  }

  get date() {
    return new Date(this.resource.effectiveDateTime);
  }

  get displayType() {
    return this.resource.code.text;
  }

  get code() {
    return this.resource.code.coding[0].code;
  }

}

class Patient {

  constructor(resource) {
    this.resource = resource;
  }

  get name() {
    //return `${this.resource.name[0].given[0]} ${this.resource.name[0].family[0]}`;
    let names = [];
    if (this.resource.name) {
      if (this.resource.name[0].given) {
        names.push(this.resource.name[0].given[0]);
      }
      if (this.resource.name[0].family) {
        names.push(this.resource.name[0].family[0]);
      }
    }
    if (names.length > 0) {
      return names.join(' ');
    } else {
      return 'UNKNOWN';
    }
  }

  get familyName() {
    return this.resource.name[0].family[0];
  }

  get id() {
    // For some reason the furore endpoint IDs need to be pruned for Ewut's server
    //return this.resource.id.replace(`${endpoint}/Patient/`, '');
    return this.resource.id;
  }

  observations(code, callback) {
    let codeQuery = code ? `&code=${code}` : '';
    // Some of the pruned ID needs to be tacked back on...
    $.getJSON(`${endpoint}/Observation?subject=Patient/${this.id}${codeQuery}`, (data) => {
      callback(data.entry.map((o) => new Observation(o.resource)));
    });
  }

  heightObservations(callback) { this.observations('8302-2', callback); }

  weightObservations(callback) { this.observations('29463-7', callback); }

  heightAndWeightObservations(callback) { this.observations('8302-2,29463-7', callback); }

  derivedBMIObservations(callback) {
    this.heightAndWeightObservations((observations) => {
      // Index the observations by date and type, take the first observation of each type on a given date (if present),
      // and calculate the derived BMI value; we assume that if there are multiple observations on a date that it
      // doesn't matter which one we choose
      var indexedObservations = {};
      for (let observation of observations ) {
        indexedObservations[observation.date] = indexedObservations[observation.date] || {};
        indexedObservations[observation.date][observation.code] = observation;
      }
      var results = [];
      for (let date of Object.keys(indexedObservations).sort(function(a, b) { return new Date(a) - new Date(b); })) {
        let height = indexedObservations[date]['8302-2'];
        let weight = indexedObservations[date]['29463-7'];
        if (height && weight) {
          let bmi = Math.round((weight.value * 0.45) / (Math.pow(height.value * 0.025, 2)));
          let bmiObservation = new Observation({ id: date, valueQuantity: { value: bmi, unit: '' }, code: { text: 'BMI' }, effectiveDateTime: date });
          results.push(bmiObservation);
        }
      }
      callback(results);
    });
  }
}

class FHIR {

  static patients(callback) {
    $.getJSON(`${endpoint}/Patient`, (data) => {
      let patients = data.entry.map((p) => new Patient(p.resource));
      // Sort by name; underscore would make this easier...
      patients = patients.sort((a, b) => {
        if (a.familyName < b.familyName) {
          return -1;
        } else if (a.familyName > b.familyName) {
          return 1;
        } else {
          if (a.givenName < b.givenName) {
            return -1;
          } else if (a.givenName > b.givenName) {
            return 1;
          } else {
            return 0;
          }
        }
      });
      callback(patients);
    });
  }

}

module.exports = FHIR;
