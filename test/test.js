var expect = require('chai').expect,
  getJSON = require('../'),
  sinon = require('sinon');

describe('get-json-data tests: ', function() {
  var server;
  beforeEach(function() {
    global.XMLHttpRequest = sinon.useFakeXMLHttpRequest();
    this.xhr = sinon.useFakeXMLHttpRequest();
    var requests = this.requests = [];

    this.xhr.onCreate = function (xhr) {
      requests.push(xhr);
    };
  });
  afterEach(function() {
    this.xhr.restore();
  });
  
  it('get json data', function() {
    var callback = sinon.spy();
    var xhr = getJSON('/some/json', callback);
    expect(xhr).instanceOf(XMLHttpRequest);
    expect(this.requests.length).to.equal(1);
    expect(this.requests[0].url).to.equal('/some/json')
    expect(this.requests[0].method).to.equal('GET')
    this.requests[0].respond(200,
      {"Content-Type": "application/json"},
      '{"id": 1, "name": "foo"}');
    sinon.assert.calledWith(callback, null, {"id": 1, "name": "foo"});
  });

  it('get request with parameters', function() {
    var callback = sinon.spy();
    getJSON('/some/json', callback, {
      params: {
        type: 'fruit',
        count: 10
      }
    });
    expect(this.requests[0].url).to.equal('/some/json?type=fruit&count=10')
  });
  
  it('server error', function() {
    var callback = sinon.spy();
    getJSON('/some/json', callback);
    expect(this.requests.length).to.equal(1);
    this.requests[0].respond(503,
      {"Content-Type": "application/text"},
      'Service temporarily unavailable');
    sinon.assert.calledWith(callback, 
      new Error('There was a problem with the request'),null);
  });
  it('get raw response', function() {
    var callback = sinon.spy();
    getJSON('/some/json', callback, {raw: true});
    expect(this.requests.length).to.equal(1);
    expect(this.requests[0].url).to.equal('/some/json')
    expect(this.requests[0].method).to.equal('GET')
    this.requests[0].respond(200,
      {"Content-Type": "application/json"},
      '{"id":1,"name":"foo"}');
    sinon.assert.calledWith(callback, null, 
      JSON.stringify({"id": 1, "name": "foo"}));
  });
  it('post json data', function() {
    var callback = sinon.spy();
    getJSON('/some/json', callback,{
      method: 'POST',
      data: {id: 1, name: 'bar'}
    });
    expect(this.requests.length).to.equal(1);
    expect(this.requests[0].url).to.equal('/some/json')
    expect(this.requests[0].method).to.equal('POST')
    expect(this.requests[0].requestBody).to.equal(
      JSON.stringify({"id": 1, "name": "bar"}));
    this.requests[0].respond(200,
      {"Content-Type": "application/json"},
      '{"id": 1, "success": true}');
    sinon.assert.calledWith(callback, null, {"id": 1, "success": true});
  });
});


