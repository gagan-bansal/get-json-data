//code from https://developer.mozilla.org/en-US/docs/AJAX/Getting_Started
(function() {
  var httpRequest;

  var makeRequest = function(url,callback,opt) {
    if (window.XMLHttpRequest) { // Mozilla, Safari, ...
      httpRequest = new XMLHttpRequest();
    } else if (window.ActiveXObject) { // IE
      try {
        httpRequest = new ActiveXObject("Msxml2.XMLHTTP");
      } 
      catch (e) {
        try {
          httpRequest = new ActiveXObject("Microsoft.XMLHTTP");
        } 
        catch (e) {}
      }
    }

    if (!httpRequest) {
      callback.call(this,
        'Giving up :( Cannot create an XMLHTTP instance',
        null);
      return false;
    }
    httpRequest.onreadystatechange = success;
    httpRequest.open('GET', url);
    httpRequest.send();
  }

  function success() {
    if (httpRequest.readyState === 4) {
      if (httpRequest.status === 200) {
        try {
          var data = JSON.parse(httpRequest.responseText);
        } catch (e) {
          callback.call(this, e,null);
          return;
        }
        callback.call(this,null,data);
      } else {
        callback.call(this,
          'There was a problem with the request.',
          null);
      }
    }
  }
  if(window) {
    window.getjson = makeRequest;
  } 
})();
