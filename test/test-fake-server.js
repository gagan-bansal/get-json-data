var expect = require('chai').expect,
  getJSON = require('../'),
  sinon = require('sinon');

describe('get-json-data test the request', function() {
  var server;
  beforeEach(function() {
    server = sinon.fakeServer.create();
  });
  afterEach(function() {
    server.restore();
  });
  
  it('get json data', function() {
    debugger;
    server.respondWith('GET', '/some/json',
      [200,{ "Content-Type": "application/json"},
        '{"id": 1, "name": "foo"}']);
    var myobj = {"call": getJSON};
    var callback = sinon.stub(myobj,'call');
    myobj.call('/some/json', callback);
    server.respond();
    sinon.assert.calledWith(callback, {"id": 1, "name": "foo"});
  });

});


