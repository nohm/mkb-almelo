var tweet = function(url, via, text){
  var url = [
  	'https://twitter.com/intent/tweet?tw_p=tweetbutton',
  	'&url=', encodeURI(url),
  	'&via=', via,
  	'&text=', text
  ].join('');
  window.open(url, 'Tweet', 'height=500,width=700');
};
