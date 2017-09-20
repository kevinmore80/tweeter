/*
 * Client-side JS logic goes here
 * jQuery is already loaded
 * Reminder: Use (and do all your DOM work in) jQuery's document ready function
 */

$(document).ready(function(){
  var initialTweets = [{
      "user": {
        "name": "Newton",
        "avatars": {
          "small":   "https://vanillicon.com/788e533873e80d2002fa14e1412b4188_50.png",
          "regular": "https://vanillicon.com/788e533873e80d2002fa14e1412b4188.png",
          "large":   "https://vanillicon.com/788e533873e80d2002fa14e1412b4188_200.png"
        },
        "handle": "@SirIsaac"
      },
      "content": {
        "text": "If I have seen further it is by standing on the shoulders of giants"
      },
      "created_at": 1461116232227
    },
    {
      "user": {
        "name": "Descartes",
        "avatars": {
          "small":   "https://vanillicon.com/7b89b0d8280b93e2ba68841436c0bebc_50.png",
          "regular": "https://vanillicon.com/7b89b0d8280b93e2ba68841436c0bebc.png",
          "large":   "https://vanillicon.com/7b89b0d8280b93e2ba68841436c0bebc_200.png"
        },
        "handle": "@rd" },
      "content": {
        "text": "Je pense , donc je suis"
      },
      "created_at": 1461113959088
    },
    {
      "user": {
        "name": "Johann von Goethe",
        "avatars": {
          "small":   "https://vanillicon.com/d55cf8e18b47d4baaf60c006a0de39e1_50.png",
          "regular": "https://vanillicon.com/d55cf8e18b47d4baaf60c006a0de39e1.png",
          "large":   "https://vanillicon.com/d55cf8e18b47d4baaf60c006a0de39e1_200.png"
        },
        "handle": "@johann49"
      },
      "content": {
        "text": "Es ist nichts schrecklicher als eine tätige Unwissenheit."
      },
      "created_at": 1461113796368
    }
  ];

  function createTweetElement(dataObj) {
    var $tweet = $("<article>").addClass("tweet");
    // create header
    var header = $("<header>").addClass("tweet-header");
    header.append($("<h3>").addClass("tweet-name").text(dataObj.user.name));
    header.append($("<p>").addClass("tweet-handle").text(dataObj.user.handle));
    // create main
    var main = $("<main>").addClass("tweet-content");
    main.append($("<p>").addClass("tweet-body").text(dataObj.content.text));
    // create footer
    var footer = $("<footer>").addClass("tweet-footer");
    var date = new Date(dataObj.created_at*1000);
    footer.append($("<p>").addClass("tweet-timestamp").text(date.toUTCString()));
    // append
    $tweet.append(header).append(main).append(footer);
    return $tweet;
  }

  function renderTweets(tweets) {
    tweets.forEach(function(userObj){
      var $tweet = createTweetElement(userObj);
      $('#tweet-container').append($tweet);
    })
  }

  renderTweets(initialTweets);
});