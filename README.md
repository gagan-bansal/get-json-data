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
##License
This project is licensed under the terms of the MIT license.

