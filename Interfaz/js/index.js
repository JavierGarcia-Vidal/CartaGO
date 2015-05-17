function getLocation() {
        console.log('Getting location...');
        navigator.geolocation.getCurrentPosition(onLocation, onError, options);
}

var options = {
        enableHighAccuracy: true 
};
    
function onError(error) {
        console.log("Getting location failed: " + error);
}

function onLocation (position) {
        console.log("Got it!");
        var lat = position.coords.latitude;
        var lon = position.coords.longitude;
        console.log("The position is :" + lat + "AND" + lon);
//        document.getElementById('location').innerHTML = "Your posititon is " + lat + " latitude and " + lon + " longitude.";
        main(lat, lon);
}

function main(lat, lon) {
    cartodb.createVis('map', 'https://javiergvs.cartodb.com/api/v2/viz/7d345c36-f33c-11e4-b98e-0e8dde98a187/viz.json', {
        shareable: false,
        title: false,
        description: true,
        search: true,
        tiles_loader: true,
        center_lat: 0,
        center_lon: 0,
        zoom: 3
    })
        .done(function(vis, layers) {
        // layer 0 is the base layer, layer 1 is cartodb layer
        // setInteraction is disabled by default
        layers[1].setInteraction(true);
        layers[1].on('featureOver', function(e, latlng, pos, data) {
            cartodb.log.log(e, latlng, pos, data);
        });
        // you can get the native map to work with it
        var map = vis.getNativeMap();
        // now, perform any operations you need
        // map.setZoom(3);
        // map.panTo([50.5, 30.5]);
        map.panTo([lat, lon]);
    })
        .error(function(err) {
        console.log(err);
    });
}
window.onload = getLocation;
//window.onload = main;
