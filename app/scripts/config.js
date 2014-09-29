var config = {
  mkb: {
    request_url: 'php/proxy.php?type=xml&url=http://www.mkb.nl/data/blog/7/rssfeed.xml',
    container: '#rsscontainer_mkb',
    holder: '#rssholder_mkb'
  },

  wo: {
    base_url: 'http://www.wijoverijssel.nl',
    request_url: 'php/proxy.php?type=html&url=http://www.wijoverijssel.nl/hotspots/wijoverijssel',
    container: '#rsscontainer_wo',
    holder: '#rssholder_wo'
  },

  twitter_mkb: 'mkbnl',

  windowSize: {
    height: 500,
    width: 700
  }
}
