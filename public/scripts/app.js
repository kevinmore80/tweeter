 /*
 * Client-side JS logic goes here
 * jQuery is already loaded
 * Reminder: Use (and do all your DOM work in) jQuery's document ready function
 */
$( ".compose-button" ).click(function() {
    $( ".container" ).slideToggle( "slow", function() {
    });
  });

function createTweetElement(tweetData) {
    var tweet = `
    <article class = "tweet-holder">
        <header>
            <img src=${replaceStr(tweetData.user.avatars.regular)} alt="User_Pic">
            <span id="full-name">${replaceStr(tweetData.user.name)}
            </span>
            <section id="user-name">${replaceStr(tweetData.user.handle)}
            </section>
        </header>
        <section id="tweet-content">
        ${replaceStr(tweetData.content.text)}
        </section>
        <footer>
            <section class="tweet-time">
            ${replaceStr(timeCreated(tweetData.created_at))}
            </section>
            <section class="footer-icons">
            <a href="#" class="footer-icon"><i class="fa fa-heart"></i></a>
            <a href="#" class="footer-icon"><i class="fa fa-retweet" aria-hidden="true"></i></a>
            <a href="#" class="footer-icon"><i class="fa fa-flag"></i></a>
        </section>
        </footer>
    </article>
    `;

    //Returns the $tweet object
    return tweet;
}
function renderTweets(tweetData){
    $("#tweets-container").html("");
    for(var i = 0; i < tweetData.length; i++){
        $("#tweets-container").prepend(createTweetElement(tweetData[i]));
    }
  }

//The escape function to prevent XSS
function replaceStr(str) {
    var toReplace = document.createElement('div');
    toReplace.appendChild(document.createTextNode(str));
    return toReplace.innerHTML;
  }

function timeCreated(givenTime) {
    var timeSinceThen = Date.now()-givenTime;
    if(timeSinceThen < 10000000){
      return "Created " + Math.floor((timeSinceThen / 100000)) + " mins ago";
    } else {
      return "Created a while ago";
    }
}

function loadTweets() {
    $.ajax({
      url: "/tweets",
      method: "GET",
      dataType: 'JSON',
      success: function (data){
        renderTweets(data);
      }
    })
  }

//To intially load all previous tweets, so that you're not looking at an empty page
loadTweets();

//Creating a POST request using Ajax
$(document).ready(function () {
    var newTweet = document.getElementById("submit-tweet");
    newTweet.addEventListener('click', function(){

        var helloTweet = document.getElementById("tweet-text");
        var tweetText = helloTweet.value;
        var errorMsg = document.getElementById("error-msg");
        var noOfChars = document.getElementById("no-of-chars");

        event.preventDefault();

        var path = this.parentElement.parentElement;
        var str = $(path).serialize();
        console.log(str);

    // Form Validation
        if(tweetText === "") {
            errorMsg.innerText = "Don't you want to tweet something!";
        } else if(tweetText.length > 140) {
            errorMsg.innerText = "Tweet exceeded 140 characters";
        } else {
                noOfChars.innerText = "140";
                helloTweet.value = "";
                errorMsg.innerText = "";

                $.ajax({
                url: "/tweets",
                method: 'POST',
                data: str,
                success: loadTweets(),
                });
            }
    });
});