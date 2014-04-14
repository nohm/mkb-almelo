var PROXYURL = 'php/proxy.php'
var RSSURL = 'http://www.mkb.nl/data/blog/7/rssfeed.xml';
var REQUESTURL = PROXYURL + '?url=' + RSSURL;

;(function($) {
    var retrieveRSS = function() {
      $.get(REQUESTURL, function(data) {
        parseRSS(data);
      });
    };

    var parseRSS = function(rawRSS) {
      var rssContainer = $('#rsscontainer');
      var rssHolder = $('#rssholder');
      var first = true;

      $(rawRSS).find('item').each(function() {
        var title = $(this).find('title').text();
        var link = $(this).find('link').text();
        var description = $(this).find('description').text();

        if (first) {
          var headRow = $('<div></div>').addClass('row');
          headRow.append('<div class="col-lg-6 col-lg-offset-3"><h2><a href="' + link + '">' + title + '</a></h2><p>' + description + '</p></div>');
          rssContainer.prepend(headRow);

          first = false;
        } else {
          rssContainer.append('<div class="col-lg-3"><h2><a href="' + link + '">' + title + '</a></h2><p>' + description + '</p></div>');
        }
      });
    };

    var init = function() {
        retrieveRSS();
    };

    $(init);
})(jQuery);
