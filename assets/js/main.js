$(document).ready(function () {
    $("i").click(function () {
        $('html, body').animate({
            scrollTop: $(".Content").offset().top
        }, 600);
    });

    $('.Body__WallpaperParticles').particleground({
        dotColor: '#E34C26',
        lineColor: '#1793d0',
        particleRadius: 4,
        density: 8000,
        proximity: 60
    });
});