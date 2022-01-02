$(document).ready(function () {

    $('#user-id').html(uid);
});

$(document).on('click', '.scan-btn', function () {

    cordova.plugins.barcodeScanner.scan(
        function (result) {

            var data = result["text"];

            if (data != null) {
                location.replace('items.html?id=' + data);
            } else {
                alert('Error! Please scan the QR Code again.');
                location.reload();
            }
        },
        function (error) {
            alert('Error!');
        }, {
            showFlipCameraButton: true, // iOS and Android
            showTorchButton: true, // iOS and Android
            prompt: "Place a barcode inside the scan area", // Android
            resultDisplayDuration: 500, // Android, display scanned text for X ms. 0 suppresses it entirely, default 1500
            formats: "QR_CODE,PDF_417", // default: all but PDF_417 and RSS_EXPANDED
            orientation: "landscape", // Android only (portrait|landscape), default unset so it rotates with the device
            disableAnimations: true, // iOS
            disableSuccessBeep: false // iOS and Android
        }
    );

});