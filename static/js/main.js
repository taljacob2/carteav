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

    function login(username) {
        $.get(`${HOST}/api/users/login/${username}`,
            function (data, status) {
                localStorage.setItem("userId", data.id);
            }
        );
    }

}(jQuery));