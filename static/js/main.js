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

    function logout() {
        localStorage.removeItem("userId");
        window.location.replace(`${HOST}`);
    }    

    function register(username) {
        $.ajax({
            type: "POST",
            url: `${HOST}/api/users`,
            data: JSON.stringify({username: username}),
            headers: {
                'Content-Type': 'application/json'
            },
            success: function (data) {
                localStorage.setItem("userId", data.id);
                window.location.replace(`${HOST}/cinemas.html`);
            },
            error: function (data) {
                $('span.error-message').text(data.responseText);
            }
        })
    }

    function fetchSeatLogs() {
        $.get(`${HOST}/api/users/logs/${localStorage.getItem("userId")}`)
        .done(function(data, textStatus, jqXHR) {
            const logs = data;

            $("#seat-logs-content").text(`${JSON.stringify(logs, null, 4)}`);
        })
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

        fetchSeatLogs();
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

        fetchSeatLogs();
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

        fetchSeatLogs();
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

            if (logId) {

                // Get log by id.
                $.get(`${HOST}/api/logs/${logId}`)
                .done(function(data, textStatus, jqXHR) {
                    const log = data;

                    if (isAdminUser && !log.approved) {
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
                        <div class="seat-logs-container seat${index + 1}"></div>
                    `);

                    $(`.seat-logs-container.seat${index + 1}`).append(`
                        <span class="log-value">${log.value}</span>
                    `);

                    if (log.userId == localStorage.getItem("userId")) {
                        $(`.seat-logs-container.seat${index + 1}`).append(`
                            <span class="log-value you-purchased-this">you made this purchase</span>
                        `);
                    }
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
        } else if ($('.register-page').length) {
            let registerForm = document.getElementById("registerForm");
            registerForm.addEventListener("submit", (e) => {
                e.preventDefault();
              
                let username = document.getElementById("username");
              
                if (username.value == "") {
                    return;
                }
        
                register(username.value);
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

                $("div.logout-button")[0].addEventListener("click", logout);

                fetchSeatLogs();
        }
    }    

}(jQuery));