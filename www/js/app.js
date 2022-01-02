var token = JSON.parse(localStorage.getItem('token'));
var url = 'http://localhost/scan-and-shop-system/';
// var url = 'https://scan-and-shop-system.000webhostapp.com/';

var logout = function () {

    localStorage.clear('token');
    location.replace('index.html');

};