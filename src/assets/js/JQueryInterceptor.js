$.ajaxSetup({
    beforeSend: function (request) {
        request.setRequestHeader("Authorization", localStorage.getItem('tokenPrimeAdmin'));
    }
});