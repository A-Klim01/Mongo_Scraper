// Require axios and cheerio. This makes the scraping possible
var axios = require("axios");
var cheerio = require("cheerio");

var scrap = function() {
    // Make a request via axios for the news section of `ycombinator`
    return axios.get("https://www.chicagotribune.com").then(function(response) {
      // Load the html body from axios into cheerio
      var $ = cheerio.load(response.data);
      var articles = [];
      // For each element with a "title" class
      $(".title").each(function(i, element) {
        // Save the text and href of each link enclosed in the current element
        var title = $(element).find("h1").text().trim();
        var link = $(element).find("a").attr("href");
        var sum = $(element).find("p").text().trim();
  
        // If this found element had both a title and a link
        if (title && link && sum) {
          // Insert the data in the scrapedData db
     var data ={
            title: title,
            link: "https://www.chicagotribune.com" + link,
            sum: sum
          },
          function(err, inserted) {
            if (err) {
              // Log the error if one is encountered during the query
              console.log(err);
            }
            else {
              // Otherwise, log the inserted data
              console.log(inserted);
            }
          };
          articles.push(data)
        }
      });
      return articles;
    });
};

module.export = scrap;