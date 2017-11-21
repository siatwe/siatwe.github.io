$(document).ready(function () {
    $("i").click(function () {
        $('html, body').animate({
            scrollTop: $(".Content").offset().top
        }, 600);
    });
});