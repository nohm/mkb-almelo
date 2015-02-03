function mkbRSS(conf) {
  // Get filled by the rssreader for the share buttons
  var social = {
    urls: [],
    titles: [],
    descriptions: []
  };

  // Get the data
  $.get(conf.request_url, function (data) {
    var rssContainer = $(conf.container);
    var rssHolder = $(conf.holder);
    var first = true;

    $(data).find('item').each(function (index) {
      var title = $(this).find('title').text();
      var link = $(this).find('link').text();
      var description = $(this).find('description').text();

      social.urls.push(link);
      social.titles.push(title);
      social.descriptions.push(description);

      if (first) {
        var headRow = $('<div></div>').addClass('row');
        var innerDiv = $('<div></div>').addClass('col-lg-6 col-lg-offset-3');
        innerDiv.append(rssLink(link, title, index, description));
        headRow.append(innerDiv);
        rssContainer.prepend(headRow);

        first = false;
      } else {
        var innerDiv = $('<div></div>').addClass('col-lg-3');
        innerDiv.append(rssLink(link, title, index, description));
        rssHolder.append(innerDiv);
      }
    });
  });

  // Helper functions

  // Generates RSS content
  var rssLink = function(link, title, index, description) {
    return  '<h2>' +
              '<a href="' + link + '">' + title + '</a>' +
            '</h2>' +
            //'<i class="fa fa-twitter tweet" title="Deel dit op Twitter!" onclick="tweet(' + index + ')"></i>' +
            //'<i class="fa fa-facebook share" title="Deel dit op Facebook!" onclick="facebook(' + index + ')"></i>' +
            '<p>' + description + '</p>';
  }

  // Opens popup window to tweet
  var tweet = function (index) {
      var url = [
          'https://twitter.com/intent/tweet?tw_p=tweetbutton',
          '&url=', encodeURI(social.urls[index]),
          '&via=', config.twitter_mkb,
          '&text=', social.titles[index]
      ].join('');
      window.open(url, 'Tweet', windowFormat());
  };

  // Opens popup window to share
  var facebook = function (index) {
      var url = [
          'http://www.facebook.com/sharer.php?s=100',
          '&p[title]=', social.titles[index],
          '&p[summary]=', social.descriptions[index],
          '&p[url]=', encodeURI(social.urls[index]),
      ].join('');
      window.open(url, 'Share', windowFormat());
  }

  // Determines screen size for popup location
  var windowFormat = function () {
      var winTop = (screen.height / 2) - (config.windowsize.height / 2);
      var winLeft = (screen.width / 2) - (config.windowsize.width / 2);
      return 'top=' + winTop + ',left=' + winLeft + ',toolbar=0,status=0,width=' + config.windowsize.width + ',height=' + config.windowsize.height;
  }
}

function woRSS(conf) {
  // Get filled by the rssreader for the share buttons
  var social = {
    urls: [],
    descriptions: []
  };

  $.get(conf.request_url, function (data) {
    var rssContainer = $(conf.container);
    var rssHolder = $(conf.holder);

    data = data.replace(/<img\b[^>]*\/>/ig,''); // remove links
    data = $(data); // parse it to elements

    data.find('.nieuwsoverzicht-artikelkop').each(function(index, item) {
      var itemData = $(item).find('a')[0];
      var link = conf.base_url + itemData.href.replace(/^.*\/\/[^\/]+/, '');
      var description = itemData.innerHTML;

      social.urls.push(link);
      social.descriptions.push(description);

      var innerDiv = $('<div></div>').addClass('col-lg-3');
      innerDiv.append(rssLink(link, description));
      rssHolder.append(innerDiv);
    });
  });

  // Helper functions

  // Generates RSS content
  var rssLink = function(link, description) {
    return  '<h2>' +
              '<a href="' + link + '">' + description + '</a>' +
            '</h2>';
  }
}
