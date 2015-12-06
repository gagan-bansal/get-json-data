// get-json-data
//code from https://developer.mozilla.org/en-US/docs/AJAX/Getting_Started
(function() {
  var makeRequest = function(url,callback,opt) {
    var xhr;
    if (XMLHttpRequest) { // Mozilla, Safari, ...
      xhr = new XMLHttpRequest();
    } else if (ActiveXObject) { // IE
      try {
        xhr = new ActiveXObject("Msxml2.XMLHTTP");
      } 
      catch (e) {
        try {
          xhr = new ActiveXObject("Microsoft.XMLHTTP");
        } 
        catch (e) {}
      }
    }

    if (!xhr) {
      callback.call(this,
        'Giving up :( Cannot create an XMLHTTP instance',
        null);
      return false;
    }
    xhr.onreadystatechange = function() {
      if (xhr.readyState === 4) {
        if (xhr.status === 200) {
          var data = xhr.responseText,
            raw = opt && opt.hasOwnProperty('raw') ? opt.raw : false;  
          if(!raw) {
            try {
              data = JSON.parse(data);
            } catch (e) {
              callback.call(this, e,null);
              return;
            }
          }
          callback.call(this,null,data);
        } else {
          callback.call(this,
            new Error('There was a problem with the request'),
            null);
        }
      }
    };
    var params = [];
    if (opt && opt.params && typeof(opt.params) == 'object') {
      for( var key in opt.params) {
        params.push(key +'='+ encodeURIComponent(opt.params[key]));
      }
    }
    var method = opt && opt.method ? opt.method : 'GET';
    if (method == 'GET') { 
      url = params.length > 0 ? url+'?'+params.join('&') : url;
      xhr.open('GET', url);
      xhr.send();
    } else if (method == 'POST') {
      var data = opt && opt.data ? opt.data : params.join('&');
      xhr.open('POST', url);
      xhr.send(JSON.stringify(data));
    }
    return xhr;
  }

  if(typeof module !== 'undefined' && module.exports) {
    module.exports = makeRequest;
  }
  if(typeof window!== 'undefined') {
    window.getJSONData = makeRequest;
  } 
})();
