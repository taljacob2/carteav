(function ($) {
    "use strict";
    console.clear();

    function fetchApples() {
        $.get(`${HOST}/api/items/name/apples/quantity`,
            function (data, status) {
                $('#apples-quantity').text(data.qty)
            }
        );
    }

    fetchApples()
}(jQuery));