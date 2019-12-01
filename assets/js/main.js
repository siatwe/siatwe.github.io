$(document).ready(function () {
    $('a').on('mouseenter', function () {
        var color = $(this).data("color");
        $('.Header__Logo').css('border-color', color);
    });
    $('a').on('mouseleave', function () {
        $('.Header__Logo').css('border-color', 'white');
    });
});
