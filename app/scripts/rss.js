// Opens popup window to tweet
var tweet = function (index) {
    var url = [
        'https://twitter.com/intent/tweet?tw_p=tweetbutton',
        '&url=', encodeURI(SOCIAL.urls[index]),
        '&via=', TWITTER_MKB,
        '&text=', SOCIAL.titles[index]
    ].join('');
    window.open(url, 'Tweet', windowFormat());
};

// Opens popup window to share
var facebook = function (index) {
    var url = [
        'http://www.facebook.com/sharer.php?s=100',
        '&p[title]=', SOCIAL.titles[index],
        '&p[summary]=', SOCIAL.descriptions[index],
        '&p[url]=', encodeURI(SOCIAL.urls[index]),
    ].join('');
    window.open(url, 'Share', windowFormat());
}

// Determines screen size for popup location
var windowFormat = function () {
    var winTop = (screen.height / 2) - (WINDOWSIZE.height / 2);
    var winLeft = (screen.width / 2) - (WINDOWSIZE.width / 2);
    return 'top=' + winTop + ',left=' + winLeft + ',toolbar=0,status=0,width=' + WINDOWSIZE.width + ',height=' + WINDOWSIZE.height;
}

// Get filled by the rssreader for the share buttons
var SOCIAL = {
  urls: [],
  titles: [],
  descriptions: []
};

var retrieveRSS = function () {
    $.get(REQUESTURL, function (data) {
        parseRSS(data);
    });
};

var parseRSS = function (rawRSS) {
    var rssContainer = $('#rsscontainer');
    var rssHolder = $('#rssholder');
    var first = true;

    $(rawRSS).find('item').each(function (index) {
        var title = $(this).find('title').text();
        var link = $(this).find('link').text();
        var description = $(this).find('description').text();

        SOCIAL.urls.push(link);
        SOCIAL.titles.push(title);
        SOCIAL.descriptions.push(description);

        if (first) {
            var headRow = $('<div></div>').addClass('row');
            headRow.append(
                '<div class="col-lg-6 col-lg-offset-3">' +
                  '<h2>' +
                    '<a href="' + link + '">' + title + '</a>' +
                  '</h2>' +
                  '<i class="fa fa-twitter tweet" onclick="tweet(' + index + ')"></i>' +
                  '<i class="fa fa-facebook share" onclick="facebook(' + index + ')"></i>' +
                  '<p>' + description + '</p>' +
                '</div>'
            );
            rssContainer.prepend(headRow);

            first = false;
        } else {
            rssHolder.append(
                '<div class="col-lg-3">' +
                  '<h2>' +
                    '<a href="' + link + '">' + title + '</a>' +
                  '</h2>' +
                  '<i class="fa fa-twitter tweet" onclick="tweet(' + index + ')"></i>' +
                  '<i class="fa fa-facebook share" onclick="facebook(' + index + ')"></i>' +
                  '<p>' + description + '</p>' +
                '</div>'
            );
        }
    });
};
