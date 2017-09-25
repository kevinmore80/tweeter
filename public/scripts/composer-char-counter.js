$(document).ready(function() {

    $('.new-tweet textarea').on('keydown', function() {
        //this points to the textarea DOM object
        var $remainingChars = 140 - $(this).val().length;

        //Print in red if character limit is exceeded
        if($remainingChars < 0) {
            $(this).closest('form').find('.counter').text($remainingChars).addClass('red-text');
        }
        else {
            $(this).closest('form').find('.counter').text($remainingChars).removeClass('red-text');
        }

    });
});