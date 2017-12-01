$(document).ready(function () {
    $("i").click(function () {
        $('html, body').animate({
            scrollTop: $(".Content").offset().top
        }, 600);
    });

    $('.Body__WallpaperParticles').particleground({
        dotColor: 'rgba(227, 76, 38, .7)',
        lineColor: 'rgba(23, 147, 208, .7)',
        particleRadius: 4,
        density: 8000,
        proximity: 60
    });
});