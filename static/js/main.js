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


    
    let currentCinemaIdSelection;
    let cinemas;
    function getCinemaSelection() {
        $("option.cinema").remove()

        const select = $('#select-cinema');
        cinemas.forEach(cinema => {
            select.append(`<option class="cinema" value="${cinema.id}">${cinema.time}</option>`);
        });
    }


    let selectedSeatNumber;
    function insertLog(e) {
        selectedSeatNumber = e.target.innerText;
        const userId = localStorage.getItem("userId");

        $.ajax({
            type: "PUT",
            url: `${HOST}/api/cinemas/updateSeat`,
            data: JSON.stringify({cinemaId: currentCinemaIdSelection, seatNumber: selectedSeatNumber, userId: userId}),
            headers: {
                'Content-Type': 'application/json'
            },
            success: function (data) {
                $.get(`${HOST}/api/cinemas`,
                function (data, status) {
                    if (status === "success") {
                        cinemas = data;
                        getCinemaSelection();
                    }
                });
            },
            error: function (data) {
                
            }
        })
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

            $(`#seat${index + 1}`)[0].addEventListener("click", insertLog);
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
                });
        }
    }    

}(jQuery));