$(document).ready(function () {

    var params = new URL(window.location.href);
    var itemID = params.searchParams.get("id");

    $.ajax({
        type: "POST",
        url: url + "api/getItemDetail",
        data: {
            itemID: itemID,
        },
        dataType: 'JSON',
        beforeSend: function () {
            $('#progress-container').show();
        },
        success: function (data) {
            if (data != null) {

                var img;

                if (data.itemImg == null) {
                    img = '<img src="img/placeholder.png" class="img-fluid">';
                } else {
                    img = '<img src="' + url + data.itemImg + '" class="img-fluid">'
                }

                $('#display').append(
                    '  <div class="row g-2 text-center">' +
                    '            <div class="col-12">' +
                    '                <h1 class="fw-light mb-0 text-dark" id="item_name">' + data.itemName + '</h1>' +
                    '            </div>' +
                    '            <div class="col-12">' +
                    '                <p>' + img + '</p>' +
                    '            </div>' +
                    '        </div>' +
                    '        <div class="row g-2">' +
                    '            <div class="col-12">' +
                    '                <p class="mb-0 text-muted">Description</p>' +
                    '                <h4 class="text-success">' + data.itemDesc + '</h4>' +
                    '            </div>' +
                    '            <div class="col-12">' +
                    '                <p class="mb-0 text-muted">Price</p>' +
                    '                <h4 class="text-success">RM ' + data.itemPrice + '</h4>' +
                    '            </div>' +
                    '            <div class="col-12">' +
                    '                <p class="mb-0 text-muted">Status</p>' +
                    '                <h4 class="text-success">' + data.itemStatus + '</h4>' +
                    '            </div>' +
                    '        </div>' +
                    '        <div class="row g-3 text-center">' +
                    '            <div class="col-12">' +
                    '                <button class="btn btn-primary btn-lg btn-add" value="' + data.itemID + '">Add to cart</button>' +
                    '            </div>' +
                    '            <div class="col-12">' +
                    '                <button class="btn btn-outline-danger btn-remove" value="' + data.itemID + '">Remove</button>' +
                    '            </div>' +
                    '        </div>'
                );
            } else {
                location.replace('main.html');
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

});