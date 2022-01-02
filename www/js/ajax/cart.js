$(document).ready(function () {

    if (basket != null) {
        $.ajax({
            type: 'POST',
            url: url + "api/getCartInfo",
            data: {
                itemArray: basket
            },
            dataType: 'JSON',
            beforeSend: function () {
                $('#loadGif').show();
            },
            success: function (data) {

                var subtotal = 0;

                for (var i = 0; i < data.length; i++) {

                    $('#display').append(
                        ' <div class="row m-1 bg-white shadow rounded-3 p-1">' +
                        '            <div class="col-6 m-auto">' +
                        '                <div class="ms-md-4">' +
                        '                    <p class="mb-0 fw-bold text-capitalize">' + data[i].itemName + '</p>' +
                        '                </div>' +
                        '            </div>' +
                        '            <div class="col-3 m-auto text-center">' +
                        '<ul class="pagination pagination-sm mb-0">' +
                        '                        <li class="page-item">' +
                        '                            <button class="page-link text-primary btn-remove" value="' + data[i].itemID + '">' +
                        '                                <i class="fas fa-minus fa-xs"></i>' +
                        '                            </button>' +
                        '                        </li>' +
                        '                        <li class="page-item disabled">' +
                        '                            <a class="page-link" href="#">' + basket[data[i].itemID] + '</a>' +
                        '                        </li>' +
                        '                        <li class="page-item">' +
                        '                            <button class="page-link text-primary btn-add" value="' + data[i].itemID + '">' +
                        '                                <i class="fas fa-plus fa-xs"></i>' +
                        '                            </button>' +
                        '                        </li>' +
                        '                    </ul>' +
                        '</div>' +
                        '            <div class="col-3 m-auto text-center">' +
                        '                <p class="mb-0">' + data[i].itemPrice + '</p>' +
                        '            </div>' +
                        '        </div>'
                    );

                    subtotal += (data[i].itemPrice * basket[data[i].itemID]);
                }

                var service_charge = (subtotal * (10 / 100));
                var total_price = subtotal + (subtotal * (10 / 100));

                $('#display').append(
                    ' <div class="row m-1 my-3">' +
                    '            <div class="col-7 col-md-3 offset-md-7 ">' +
                    '                <p class="mb-0">Subtotal</p>' +
                    '                <p class="mb-0">Service Charge (10%)</p>' +
                    '                <p class="mb-0">Total</p>' +
                    '            </div>' +
                    '            <div class="col text-end text-md-center">' +
                    '                <p class="mb-0 text-muted">RM ' + subtotal + '</p>' +
                    '                <p class="mb-0 text-muted">RM ' + service_charge.toFixed(2) + '</p>' +
                    '                <h4 class="fw-bold">RM ' + total_price.toFixed(2) + ' </h4>' +
                    '            </div>' +
                    '        </div>' +
                    '       <div class="row m-1 my-3 g-2">' +
                    '            <div class="col-6 ">' +
                    '                   <input type="radio" class="btn-check" name="btnradio" id="btnradio1" autocomplete="off" onclick="return confirm(\'No online banking option yet.\');" checked>' +
                    '                   <label class="btn btn-outline-primary" for="btnradio1"><i class="fas fa-credit-card fa-fw"></i> Online Banking</label>' +
                    '            </div>' +
                    '            <div class="col-6 ">' +
                    '                   <input type="radio" class="btn-check btn-checkout" value="' + total_price.toFixed(2) + '" name="btnradio" id="btnradio2" autocomplete="off" onclick="return confirm(\'Show this cart to cahier to continue payment before clicking pay at counter.\');">' +
                    '                   <label class="btn btn-outline-primary" for="btnradio2"><i class="fas fa-cash-register fa-fw"></i> Pay at Counter</label>' +
                    '            </div>' +
                    '        </div>' +
                    '       <div class="row m-1 my-3 pb-5">' +
                    '            <div class="col  text-center ">' +
                    '                <a href="main.html" class="btn btn-outline-info">' +
                    '                    <i class="fas fa-chevron-left fa-fw fa-sm"></i>' +
                    '                    Continue Shopping' +
                    '                </a>' +
                    '            </div>' +
                    '        </div>'
                );

            },
            error: function () {
                $('#display').html('<div class="row"><div class="col"><p class="my-3 text-muted">Internal server error, please reload.</p></div></div>');
            },
            complete: function () {
                $('#loadGif').hide();
            }
        });

    } else {

        $('#display').append(
            '        <div class="row my-3">' +
            '            <div class="col">' +
            '                <div class="p-4 bg-white rounded-3 shadow-sm text-dark">' +
            '                    <p class="mb-0">Your have no items in your cart</p>' +
            '                </div>' +
            '            </div>' +
            '        </div>'
        );

    }

});