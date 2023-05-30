(function ($) {
    "use strict";

    let loginForm = document.getElementById("loginForm");
    loginForm.addEventListener("submit", (e) => {
        e.preventDefault();
      
        let username = document.getElementById("username");
      
        if (username.value == "") {
            return;
        }

        login(username.value);
      });

      
    // console.clear();

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
                if (status === "success") {
                    localStorage.setItem("userId", data.id);
                    window.location.replace(`${HOST}/cinemas.html`);
                }
            }
        );
    }

}(jQuery));