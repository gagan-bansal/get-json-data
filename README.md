# get-json-data
Make ajax request to get the json data from browser. Not for nodejs, use [request](https://www.npmjs.com/package/request) module instead. 


## usage
can not be more simpler:

include ```index.js``` in your html.

```javascript
getJSONData(url,callback);
//callback function 
fucntion callback(err, data) {
  if (err) {
    console.log('request failed');
    return;
  }
  // do something with data
}
```
### note
This module does not support jsonp. For jsonp request you may use [jsonp](https://www.npmjs.com/package/jsonp) module.
### similar
Here is list of other popular and stable projects
* [superagent](https://github.com/visionmedia/superagent)
* [axios](https://github.com/mzabriskie/axios)
* [qwest](https://github.com/pyrsmk/qwest)
* [A Comparison of JavaScript HTTP Libraries for the Browser](http://www.sitepoint.com/comparison-javascript-http-libraries/)
* [when](https://github.com/cujojs/when)
* [promise](https://github.com/then/promise)
* [async](https://github.com/caolan/async)
* [Loading JSON-formatted data with Ajax and xhr.responseType='json'](https://mathiasbynens.be/notes/xhr-responsetype-json#comments)
* [Cross-Origin Resource Sharing (CORS) AJAX Requests Between jQuery And Node.js](http://www.bennadel.com/blog/2327-cross-origin-resource-sharing-cors-ajax-requests-between-jquery-and-node-js.htm)

##License
This project is licensed under the terms of the MIT license.

