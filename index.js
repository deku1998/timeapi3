const express = require('express');
const request = require('request');
const app     = express();
const jsdom = require("jsdom");
const { JSDOM } = jsdom;
const PORT= process.env.PORT || 8080;

app.get('/', function(req, res){
url="https://time.com";
 
request(url, function(error, response, html) {
  
  if (!error) {
    
    const el = new JSDOM(html);  //jsdom for scraping
    console.log(el); 
    pageURLs = [];
    
    var xyz=el.window.document.querySelectorAll('ol.swipe-h a'); //getting all the news articles
    for(var i=0;i<5;++i)
    {
      var articleLink=url+xyz[i].href;   //looping and adding individual news articles to JSON
      var title=xyz[i].innerHTML;

      pageURLs.push({
        title:title,  
        link: articleLink   
      });
    }
    
    res.setHeader('Content-Type', 'application/json');
    res.send(JSON.stringify(pageURLs));  
  }
});
});

app.listen(PORT);
console.log('API is running on http://localhost:8080');
module.exports = app;