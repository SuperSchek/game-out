


// User Infomation
var currentUserInfo = null;
var users = {};

// Google Maps UI
var map = null;
var infowindow = null;
var refreshTimeout = null;
var placedMarkers = [];
var placedCircles = [];
var lengthMarkerArray = 0;
google.maps.Circle.prototype.contains = function(latLng) {
    return this.getBounds().contains(latLng) && google.maps.geometry.spherical.computeDistanceBetween(this.getCenter(), latLng) <= this.getRadius();
}

    function userLocationUpdate(userInfo) {

        if (!users[userInfo.id]) users[userInfo.id] = {
            id: userInfo.id
        };
        users[userInfo.id].name = userInfo.name;
        users[userInfo.id].latitude = userInfo.latitude;
        users[userInfo.id].longitude = userInfo.longitude;
        users[userInfo.id].markerArray = userInfo.markerArray
        users[userInfo.id].timestamp = new Date()
            .getTime()
        refreshMarkers();
    }


    function refreshMarkers() {

        if (!map) return;
        if (!currentUserInfo.movedMapCenter && currentUserInfo.timestamp) {
            $('#user-name')
                .val(currentUserInfo.name);
            $('#user-name')
                .bind('keyup', function () {
                    currentUserInfo.name = $('#user-name')
                        .val();
                })
            currentUserInfo.movedMapCenter = true;
            map.setCenter(new google.maps.LatLng(
                currentUserInfo.latitude, currentUserInfo.longitude));
        }

        for (var id in users) {
            var userInfos = users[id];


            if (userInfos.marker) {
                // If we havn't received any update from the user
                //  We remove the marker of missing user
                if (userInfos.id != currentUserInfo.id &&
                    userInfos.timestamp + 1000 * 30 < new Date()
                        .getTime()) {
                    userInfos.marker.setMap(null);
                    delete users[id];
                    continue;
                }

            } else {

                // Create a marker for the new user
                var marker = new google.maps.Marker({
                    map: map
                });
                google.maps.event.addListener(marker, 'click', function () {
                    infowindow.setContent(marker.getTitle())
                    infowindow.open(map, marker);
                });

                userInfos.marker = marker;
            }

            if (userInfos.markerArray.length > lengthMarkerArray) {
                for (var i = 0; i < userInfos.markerArray.length; i+=2) {
                    if (getCircle(placedCircles,new google.maps.LatLng(userInfos.markerArray[i],
                            userInfos.markerArray[i + 1])) === false) {
                        placeCircle(new google.maps.LatLng(userInfos.markerArray[i],
                            userInfos.markerArray[i + 1]), 5);
                        placeMarker(new google.maps.LatLng(userInfos.markerArray[i],
                            userInfos.markerArray[i + 1]));
                    }
                }
                lengthMarkerArray = userInfos.markerArray.length;
            }
            //Move the markers

            userInfos.marker.setTitle(userInfo.name);
            userInfos.marker.setPosition(
                new google.maps.LatLng(userInfos.latitude, userInfos.longitude));

            var markerPos;

            if (placedMarkers.length > 0) {
                for (var i = 0; i < placedMarkers.length; i += 1) {
                    markerPos = placedMarkers[i].getPosition();
                    var cirkel = getCircle(placedCircles,markerPos);
                        console.log(cirkel, " de circkel");
                    if (cirkel.contains(userInfos.marker.getPosition())) {
                        placedMarkers[i].setMap(null);
                        placedCircles[i].setMap(null);
                        //console.log("Array marker ", userInfos.markerArray[i], userInfos.markerArray[i+1]);
                        //console.log(" placedmarkers",placedMarkers[i])
                        userInfos.markerArray.splice(i,2);
                        placedMarkers.splice(searchIndexMarker(i, 1));
                        placedCircles.splice(searchIndexCircle(i,1));
                    }
                }
            }
        }

        $('#user-number')
            .text(Math.max(Object.keys(users)
                    .length - 1, 0) + '')

        // Refresh the markers every 1 seconds
        clearTimeout(refreshTimeout)
        refreshTimeout = setTimeout(refreshMarkers, 1000 * 3);
    }

    function mapInitialize() {
        map = new google.maps.Map(document.getElementById("map-canvas"), {
            zoom: 18
        });
        infowindow = new google.maps.InfoWindow({
            content: 'Test'
        });
        google.maps.event.addListener(map, 'click', function () {
            infowindow.close(map);
        });
        refreshMarkers();

        google.maps.event.addListener(map, "click", function (event) {
            placeMarker(event.latLng);
            placeCircle(event.latLng, 5);
            userInfo.vlagLat = event.latLng.lat();
            userInfo.vlagLng = event.latLng.lng();
            userInfo.markerArray.push(event.latLng.lat(), event.latLng.lng());
        });


        if (navigator.geolocation) {
            navigator.geolocation.getCurrentPosition(function (position) {
                var pos = new google.maps.LatLng(position.coords.latitude,
                    position.coords.longitude);

                map.setCenter(pos);
            }, function () {
                handleNoGeolocation(true);
            });
        }
    }



function placeMarker(location) {
    var markert = new google.maps.Marker({
        position: location,
        map: map
    });
    placedMarkers.push(markert);
}

function getMarker(array, position){
    var i;
    for(i = 0; i<array.length; i++){
        if(array[i].getPosition() === position){
            return array[i];
        }
    }
    return false;
}

function getCircle(array, position){
    var i;
    for(var i = 0; i < array.length; i++){
        var center = array[i].getCenter();
        if(center.A === position.A && center.F === center.F){
            return array[i];
        }
    }
    return false;
}


function placeCircle(location, radius) {
    var circleOptions = {
        center: location,
        radius: radius,
        fillOpacity: 0.2,
        strokeColor: '#FF0000',
        strokeOpacity: 0.8,
        map: map
    };
    var circle = new google.maps.Circle(circleOptions);
    placedCircles.push(circle);

}

function searchIndexMarker(position) {
    for(var i = 0; i < placedMarkers; i++){
        if(placedMarkers[i].getPosition() === position){
            return i;
        }
    }
    return false;
}

function searchIndexCircle(position) {
    for(var i = 0; i < placedCircles.length; i++){
        var center = placedCircles[i].getCenter();
        if(center.A === position.A && center.F === center.F){
            return i;
        }
    }
    return false
}

function move_to_otheruser() {
    var ids = Object.keys(users)
    ids.slice(ids.indexOf(currentUserInfo.id), 1);

    var random_user_id = ids[Math.floor(ids.length * Math.random())]
    var userInfo = users[random_user_id];
    map.setCenter(new google.maps.LatLng(
        userInfo.latitude, userInfo.longitude));

    infowindow.setContent(userInfo.name)
    infowindow.open(map, userInfo.marker);
}

function handleNoGeolocation(errorFlag) {
    if (errorFlag) {
        alert("Error: Je valt niet te lokaliseren heb je wel locatie/gps aanstaan?");
    } else {
        alert("Error: je browser ondersteunt niet geolocation");
    }
}



google.maps.event.addDomListener(window, 'load', mapInitialize);
currentUserInfo = initLocationSharing(userLocationUpdate);