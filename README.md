<h1 align=center>
  <img src="https://avatars0.githubusercontent.com/u/33183345?s=200&v=4" style="max-width: 100%; min-height: 300px;" original-title="">
  <br>
  Surveying Marmot API
  <br>
</h1>

[![Build Status](https://travis-ci.org/Surveying-Marmot/Node-Surveying-Marmot.svg?branch=master)](https://travis-ci.org/Surveying-Marmot/Node-Surveying-Marmot)

Because calling the rest api yourself is hard, this node module is doing everything for you!

``` js
// First import the module
import SurveyingMarmot from 'SurveyingMarmotAPI'

// The create the Surveying Marmot object
// You need to submit the API url as an option there
var sm = new SurveyingMarmot({url: "https://surveying-marmot.io"})

// Then simply call the entrypoint you want
var req = sm.ValidateToken('validtoken')

// Any call will return you an ES6 promise, easy peasy!
req.then(data => console.log(data)).catch(data => console.log(data))
```

