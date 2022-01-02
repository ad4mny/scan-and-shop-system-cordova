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
                    '<div class="row m-1 my-3 pb-5">' +
                    '            <div class="col offset-md-10 text-center ">' +
                    '                <button class="btn btn-primary btn-checkout" value="' + total_price.toFixed(2) + '">' +
                    '                    <i class="fas fa-shopping-basket fa-fw fa-sm"></i>' +
                    '                    Checkout' +
                    '                </button>' +
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