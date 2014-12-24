# getjson
Make ajax request to get the json data.

## usage
can not be more simpler:

include ```index.js``` in your html.

```javascript
getjson(url,callback);
//callback function 
fucntion callback(err, data) {
  if (err) {
    console.log('request failed');
    return;
  }
  // do something with data
}
```
##License
This project is licensed under the terms of the MIT license.

