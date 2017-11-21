$(document).ready(function () {
    $("i").click(function () {
        $('html, body').animate({
            // target class- / id-name
            scrollTop: $(".Content").offset().top
        }, 600);
    });
});