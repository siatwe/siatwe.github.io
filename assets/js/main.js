$(document).ready(function () {
    $(".index-arrow").click(function () {
        $('html, body').animate({
            scrollTop: $(".index").offset().top
        }, 600);
    });

    var markInstance = new Mark(document.querySelector(".context"));
    var keywordInput = document.querySelector("input[name='keyword']");
    var optionInputs = document.querySelectorAll("input[name='opt[]']");

    function performMark() {

        var keyword = keywordInput.value;

        var options = {};
        [].forEach.call(optionInputs, function (opt) {
            options[opt.value] = opt.checked;
        });
        markInstance.unmark({
            done: function () {
                markInstance.mark(keyword, options);
            }
        });
    }

    keywordInput.addEventListener("input", performMark);
    for (var i = 0; i < optionInputs.length; i++) {
        optionInputs[i].addEventListener("change", performMark);
    }
});