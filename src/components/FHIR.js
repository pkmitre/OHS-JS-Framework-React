'use strict';

const $ = require('webpack-dev-server/client/web_modules/jquery');

//const endpoint = 'http://argonaut.healthintersections.com.au/open';
const endpoint = 'http://spark.furore.com/fhir';

class Observation {

  constructor(resource) {
    this.resource = resource;
  }

  get value() {
    if (this.resource.content.valueQuantity) {
      return this.resource.content.valueQuantity.value;
    } else {
      return '???';
    }
  }

  get date() {
    return new Date(this.resource.content.issued);
  }

  get displayType() {
    //return this.resource.content.name.text;
    return this.resource.content.name.coding[0].display;
  }

}

class Patient {

  constructor(resource) {
    this.resource = resource;
  }

  get name() {
    //return `${this.resource.name[0].given[0]} ${this.resource.name[0].family[0]}`;
    let names = [];
    if (this.resource.content.name && this.resource.content.name[0].given) {
      names.push(this.resource.content.name[0].given[0]);
    }
    if (this.resource.content.name && this.resource.content.name[0].family) {
      names.push(this.resource.content.name[0].family[0]);
    }
    if (names.length > 0) {
      return names.join(' ');
    } else {
      return 'UNKNOWN';
    }
  }

  get id() {
    // For some reason the furore endpoint IDs need to be pruned
    return this.resource.id.replace(`${endpoint}/Patient/`, '');
  }

  observations(code, callback) {
    let codeQuery = code ? `&name=${code}` : '';
    // Some of the pruned ID needs to be tacked back on...
    $.getJSON(`${endpoint}/Observation?subject=Patient/${this.id}${codeQuery}`, (data) => {
      callback(data.entry.map((o) => new Observation(o)));
    });
  }

  bmiObservations(callback) { this.observations('39156-5', callback); }

  weightObservations(callback) { this.observations('3141-9', callback); }

}

class FHIR {

  static patients(callback) {
    $.getJSON(`${endpoint}/Patient`, (data) => {
      // Eventually can add paging; total is in data.meta.total
      callback(data.entry.map((p) => new Patient(p)));
    });
  }

}

module.exports = FHIR;
