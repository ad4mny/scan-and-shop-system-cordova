$(document).ready(function () {

    if (uid != null) {

        $.ajax({
            type: "POST",
            url: url + "api/getHistory",
            data: {
                customerID: uid,
            },
            dataType: 'JSON',
            beforeSend: function () {
                $('#progress-container').show();
            },
            success: function (data) {

                if (
                    Array.isArray(data) &&
                    data.length !== 0
                ) {
                    for (var i = 0; i < data.length; i++) {
                        $('#display').append(
                            ' <div class="row m-1 bg-white shadow rounded-3 p-1 position-relative">' +
                            '            <div class="col-12 m-auto">' +
                            '               <p class="mb-0 fw-bold text-capitalize text-success">' +
                            '                   <small class="mb-0 fw-light text-muted text-capitalize me-2">PAYMENT ID</small>' +
                            data[i].paymentID +
                            '               </p>' +
                            '               <div class="position-absolute end-0 top-0 m-1 mx-2">' +
                            '                   <small class="text-secondary text-uppercase"><i class="fas fa-receipt fa-fw"></i>' + data[i].paymentStatus + '</small>' +
                            '                </div>' +
                            '            </div>' +
                            '            <div class="col-12  m-auto">' +
                            '                <div class="ms-md-4">' +
                            '               <p class="mb-0 fw-bold text-capitalize text-success">' +
                            '                   <small class="mb-0 fw-light text-muted text-capitalize me-2">CART ID</small>' +
                            data[i].cartID +
                            '</p>' +
                            '                </div>' +
                            '            </div>' +
                            '            <div class="col-12  m-auto">' +
                            '               <p class="mb-0 fw-bold text-capitalize text-success">' +
                            '                   <small class="mb-0 fw-light text-muted text-capitalize me-2">INVOICE</small>RM' +
                            data[i].paymentTotal + '</p>' +
                            '            </div>' +
                            '        </div>'
                        );
                    }
                } else {
                    $('#display').append(
                        '        <div class="row my-3">' +
                        '            <div class="col">' +
                        '                <div class="p-4 bg-white rounded-3 shadow-sm text-dark">' +
                        '                    <p class="mb-0">Your have no shopping history.</p>' +
                        '                </div>' +
                        '            </div>' +
                        '        </div>'
                    );
                }
            },
            error: function () {
                $('#notice-container').html(
                    '<small class="text-danger">' +
                    '<i class="fas fa-exclamation-triangle me-1 fa-fw"></i>500: Internal Server Error.' +
                    '</small>'
                );
            },
            complete: function () {
                $('#progress-container').hide();
            }
        });

    } else {
        
        $('#display').append(
            '        <div class="row my-3">' +
            '            <div class="col">' +
            '                <div class="p-4 bg-white rounded-3 shadow-sm text-dark">' +
            '                    <p class="mb-0">Your have no shopping history.</p>' +
            '                </div>' +
            '            </div>' +
            '        </div>'
        );
    }

});