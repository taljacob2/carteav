(function ($) {
    "use strict";
    console.clear();

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

    function insertLog() {

    }

    pageLoader();

    function pageLoader() {
        if ($('.login-page').length) {
            let loginForm = document.getElementById("loginForm");
            loginForm.addEventListener("submit", (e) => {
                e.preventDefault();
              
                let username = document.getElementById("username");
              
                if (username.value == "") {
                    return;
                }
        
                login(username.value);
            });
        } else if ($('.cinemas-page').length) {
                $.get(`${HOST}/api/cinemas`,
                function (data, status) {                
                    if (status === "success") {
                        console.log(data);
                    }
                }
            );
        }
    }

}(jQuery));