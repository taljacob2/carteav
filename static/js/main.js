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

    
    let currentCinemaIdSelection;
    let cinemas;
    function getCinemaSelection() {
        const select = $('#select-cinema');
        cinemas.forEach(cinema => {
            select.append(`<option value="${cinema.id}">${cinema.time}</option>`);
        });
    }

    let selectedCinema;
    function getSeats(e) {
        $(".seat").remove();
        let seats = $("#seat-list");

        currentCinemaIdSelection = +e.target.value;
        selectedCinema = cinemas.find(cinema => cinema.id === currentCinemaIdSelection);
        
        for (let index = 0; index < 4; index++) {
            const logId = selectedCinema[`seat${index + 1}`];
            seats.append(`<div class="seat" id="seat${index + 1}"><div>seat${index + 1}</div></div>`);
            if (logId) {
                $(`#seat${index + 1}`).addClass("taken");
            }
        }
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
                const select = $('#select-cinema');
                select[0].addEventListener("change", getSeats);

                $.get(`${HOST}/api/cinemas`,
                function (data, status) {                
                    if (status === "success") {
                        cinemas = data;
                        getCinemaSelection();
                    }
                }
            );
        }
    }    

}(jQuery));