var uid = JSON.parse(localStorage.getItem('uid'));
var basket = JSON.parse(localStorage.getItem('basket'));
var url = 'http://localhost/scan-and-shop-system/';
// var url = 'https://scan-and-shop-system.000webhostapp.com/';

var logout = function () {

    localStorage.clear('uid');
    location.replace('index.html');

};

$(document).on('click', '.btn-add', function () {

    var itemID = this.value;

    if (itemID != null) {

        if (basket === null) {

            var cart = {};
            cart[itemID] = 1;
            localStorage.setItem('basket', JSON.stringify(cart));

        } else {
            if (itemID in basket) {
                basket[itemID] += 1;
            } else {
                basket[itemID] = 1;
            }
            localStorage.removeItem('basket');
            localStorage.setItem('basket', JSON.stringify(basket));
        }

        location.replace('cart.html');
    }

});

$(document).on('click', '.btn-remove', function () {

    var itemID = this.value;

    if (itemID != null) {

        if (basket !== null) {
            if (itemID in basket) {
                if (basket[itemID] > 1) {
                    basket[itemID] -= 1;
                } else {
                    delete basket[itemID];
                }
            }
            localStorage.removeItem('basket');
            localStorage.setItem('basket', JSON.stringify(basket));
        }

        location.replace('cart.html');
    }

});

$(document).on('click', '.btn-checkout', function () {

    var totalPrice = this.value;
    console.log(totalPrice);

    $.ajax({
        type: "POST",
        url: url + "api/setPayment",
        data: {
            customerID: uid,
            itemArray: basket,
            paymentTotal: totalPrice
        },
        dataType: "JSON",
        success: function (data) {
            if (data == false) {
                alert('Error occured while making your payment.');
            } else {
                localStorage.removeItem('basket');
                localStorage.removeItem('uid');
                localStorage.setItem('uid', JSON.stringify(data));
                location.replace("cart.html");
            }
        }
    });


});