(function ($) {
    "use strict";
    console.clear();

    function login(username) {        
        $.get(`${HOST}/api/users/login/${username}`)
        .done(function(data, textStatus, jqXHR) {
            localStorage.setItem("userId", data.id);
            window.location.replace(`${HOST}/cinemas.html`);
        })
        .fail(function(jqXHR, textStatus, errorThrown) {
            $('span.error-message').text(jqXHR.responseText);
        });
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
                cinemas[currentCinemaIdSelection - 1] = data;
                getSeats();
            },
            error: function (data) {
                
            }
        })
    }

    let isAdminUser;
    function isAdmin() {
        $.get(`${HOST}/api/users/isAdmin/${localStorage.getItem("userId")}`)
        .done(function(data, textStatus, jqXHR) {
            isAdminUser = data;
        })

        return isAdminUser;
    }

    function updateLogValueForApproval(logId) {
        $.ajax({
            type: "PUT",
            url: `${HOST}/api/logs/updateLogValue/approved/${logId}`,
            data: JSON.stringify({}),
            headers: {
                'Content-Type': 'application/json'
            },
            success: function (data) {                
                $.get(`${HOST}/api/cinemas/${currentCinemaIdSelection}`)
                .done(function(data, textStatus, jqXHR) {
                    cinemas[currentCinemaIdSelection - 1] = data;
                    getSeats();
                })
            },
            error: function (data) {
                
            }
        })
    }

    function updateLogValueForDecline(logId) {
        $.ajax({
            type: "PUT",
            url: `${HOST}/api/logs/updateLogValue/declined/${logId}`,
            data: JSON.stringify({}),
            headers: {
                'Content-Type': 'application/json'
            },
            success: function (data) {
                $.get(`${HOST}/api/cinemas/${currentCinemaIdSelection}`)
                .done(function(data, textStatus, jqXHR) {
                    cinemas[currentCinemaIdSelection - 1] = data;
                    getSeats();
                })
            },
            error: function (data) {
                
            }
        })
    }

    let selectedCinema;
    function getSeats(e) {
        $(".all-buttons").remove();
        let seats = $("#seat-list");

        currentCinemaIdSelection = +e?.target?.value ? +e?.target?.value : currentCinemaIdSelection;
        selectedCinema = cinemas[currentCinemaIdSelection - 1];
        
        for (let index = 0; index < 4; index++) {
            const logId = selectedCinema[`seat${index + 1}`];

            seats.append(`
                            <div class="all-buttons">
                                <div class="seat" id="seat${index + 1}">
                                    <div>seat${index + 1}</div>
                                </div>
                            </div>
                        `);

            if (!logId) {
                $(`#seat${index + 1}`)[0].addEventListener("click", insertLog);
            } else {
                $(`#seat${index + 1}`).addClass("taken");
            }

            if (isAdminUser && logId) {

                // Get log by id.
                $.get(`${HOST}/api/logs/${logId}`)
                .done(function(data, textStatus, jqXHR) {
                    const log = data;

                    if (!log.approved) {
                        $(`#seat${index + 1}`).after(`
                            <div class="admin-buttons">
                                <div class="approve-seat seat${index + 1} admin-button">approve</div>
                                <div class="decline-seat seat${index + 1} admin-button">decline</div>
                            </div>
                        `);
    
                        $(`.approve-seat.seat${index + 1}`)[0].addEventListener("click", () => updateLogValueForApproval(logId));
                        $(`.decline-seat.seat${index + 1}`)[0].addEventListener("click", () => updateLogValueForDecline(logId));
                    }

                    $(`#seat${index + 1}`).after(`
                        <span class="log-value">${log.value}</span>
                    `);
                })
                .fail(function(jqXHR, textStatus, errorThrown) {
                    console.error("error fetching log by id");
                });
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
                isAdmin();
                const select = $('#select-cinema');
                select[0].addEventListener("change", getSeats);

                $.get(`${HOST}/api/cinemas`)
                .done(function(data, textStatus, jqXHR) {
                    cinemas = data;
                    getCinemaSelection();
                })
        }
    }    

}(jQuery));