var userInfo = {
}

function initLocationSharing(location_callback, error_callback){

    //For generating a random unique ID
    function guid() {
        function s4() { return Math.floor((1 + Math.random()) * 0x10000)
            .toString(16).substring(1);
        };

        return s4() + s4() + '-' + s4() + '-' + s4() + s4();
    }

    userInfo.id = guid();
    userInfo.name = prompt("Geef username") + "is online op een" + (navigator.platform ? ' (' + navigator.platform + ')' : '');
    userInfo.markerArray = [];
    // ================================
    // Setup Socket IO
    // ================================
    var socket = io.connect('server3.tezzt.nl:3002');
    socket.on('connect', function () {
        socket.on('information', function(information){
            if(information.id != userInfo.id) {
                location_callback(information);
            }
        })
    });

    // ================================
    // Setup Geolocation
    // ================================
    if (!navigator.geolocation) {
        return userInfo;
    }

    function geo_success(position) {
        userInfo.latitude  = position.coords.latitude;
        userInfo.longitude = position.coords.longitude;
        location_callback(userInfo);
        sendInformation();
    }

    function geo_error() {
        error_callback();
    }

    var sendInformationTimeout = null;
    function sendInformation(){
        socket.emit('information', userInfo);
        clearTimeout(sendInformationTimeout);
        sendInformationTimeout = setTimeout(sendInformation, 1000*5);
    }

    var geo_options = { enableHighAccuracy: true};
    navigator.geolocation.watchPosition(geo_success, geo_error, geo_options);
    navigator.geolocation.getCurrentPosition(geo_success, geo_error, geo_options);


    return userInfo;
}

