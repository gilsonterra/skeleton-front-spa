(function () {
    'use strict';

    var headerElement = document.querySelector('header');    

    //After DOM Loaded
    document.addEventListener('DOMContentLoaded', function (event) {
        //On initial load to check connectivity
        if (!navigator.onLine) {
            updateNetworkStatus();
        }

        window.addEventListener('online', updateNetworkStatus, false);
        window.addEventListener('offline', updateNetworkStatus, false);
    });

    //To update network status
    function updateNetworkStatus() {
        if (navigator.onLine) {            
            headerElement.classList.remove('bg-error');
            headerElement.classList.add('bg-gray');
        } else {
            console.log('App is offline');            
            headerElement.classList.add('bg-error')
            headerElement.classList.remove('bg-gray');
        }
    }
})();