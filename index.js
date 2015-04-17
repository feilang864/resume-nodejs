var express = require('express');
var app = express();
var phantom = require('phantom');

app.set('port', (process.env.PORT || 8080));
app.use('/', express.static(__dirname + '/public'));

app.get('/pdf', function(request, response) {
  phantom.create(function(ph){
    ph.createPage(function(page) {
      page.set('paperSize', { width: '8.5in', height: '11in' }, function() {
        page.open("http://resume.gfry.io", function(status) {
          console.log("phantom opened resume.gfry.io? ", status);
          page.render('public/resume.pdf', function(){

            console.log('Page Rendered');
            response.statusCode = 302;
            response.setHeader("Location", "/resume.pdf");
            response.end();
            ph.exit();

          });
        });
      });
    });
  });
});

app.listen(app.get('port'), function() {
  console.log("Node app is running at localhost:" + app.get('port'));
});
