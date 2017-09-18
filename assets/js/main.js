$(document).ready(function () {
    $(".index-arrow").click(function () {
        $('html, body').animate({
            scrollTop: $(".index").offset().top
        }, 600);
    });
});