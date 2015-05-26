
function getLocation() {
        $("#progress-bar").css("width", "50%");
        navigator.geolocation.getCurrentPosition(onLocation, onError, options);
}

var options = {
        enableHighAccuracy: true 
};
    
function onError(error) {
        console.log("Getting location failed: " + error);
}

function onLocation (position) {
        var lat = position.coords.latitude;
        var lon = position.coords.longitude;
        $("#progress-bar").css("width", "75%");
        main(lat, lon);
}

function main(lat, lon) {
    cartodb.createVis('map', 'https://javiergvs.cartodb.com/api/v2/viz/f67b93ba-008f-11e5-a9d7-0e0c41326911/viz.json', {
        shareable: false,
        loaderControl: false,
        https: true,
        title: false,
        description: false,
        search: false,
        scrollwheel: true,
        tiles_loader: true,
        detectRetina: true,
        center_lat: lat,
        center_lon: lon,
        zoom: true
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
        $("#progress-bar").css("width", "100%");
        // now, perform any operations you need
        // map.setZoom(3);
        // map.panTo([50.5, 30.5]);
        //map.panTo([lat, lon]);
    })
        .error(function(err) {
        console.log(err);
    });
}
window.onload = getLocation;
//window.onload = main;

//####### GET EVENTS & POST EVENT ###################################################################################################
$(document).ready(function(){
    function onSubmit (event) {
        event.preventDefault();
        console.debug('SUBMITTED');
        var newCharacter = {
            name: $('#name').val(),
            occupation: $('#occupation').val(),
            weapon: $('#weapon').val()
            // Build a new character from the values in the form
        }

        // Send a post request with the data for the new character
        var request = $.post('https://ironhack-characters.herokuapp.com/characters', newCharacter);

        function onSaveSuccess (response) {
            console.debug('BOOM', response);
        }

        function onSaveFailure (err) {
            console.error(err.responseJSON);
        }

        request.done(onSaveSuccess);
        request.fail(onSaveFailure);
    }

    $('.js-submit').on('click', onSubmit);

    
    function getEventExplore () {
        var request = $.get("https://javiergvs.cartodb.com/api/v2/sql?q=SELECT * FROM map WHERE type IS NOT NULL");

        function getEvents (explore_events) {
            console.log('REQUEST DONE',explore_events);
            var num = 0;
            var picture = 0;
            var picture_route = ['city','nightlife','technics','fashion','business','transport','sports',
                                 'people','abstract','animals','cats','food','nature'];
            $.each(explore_events.rows, function(id, event) {
                
                if (num >= 10) {
                    num = 0;
                    picture++;
                } else
                    num++;

                var html = [
                    '<div class="col l3 m6 s12">',
                        '<div class="card small z-depth-2">',
                            '<div class="card-image position-center waves-effect waves-block waves-light">',
                    '<img class="activator" src="http://lorempixel.com/400/200/' + picture_route[picture] + '/' + num + '">',
                            '</div>',
                            '<div class="card-content truncate">',
                                '<span class="card-title activator grey-text text-darken-4">' + event.name + '<p>',
                                '<a href="#">Leer mas</a></p></span>',
                            '</div>',
                            '<div class="card-reveal">',
                                '<span class="card-title grey-text text-darken-4">' + event.name + '<i class="mdi-navigation-close right">',
                                '</i></span>',
                                '<p><i class="mdi-action-home prefix fix-prefix-position"></i>Place : <b>'+ event.place +'</b></p>',
                            '<p><i class="mdi-action-grade prefix fix-prefix-position"></i>Affilation : <b>'+  event.affiliation +'</b>',
                                '</p>',
                                '<p><i class="mdi-device-access-time prefix fix-prefix-position"></i>Date : <b>'+ event.date +'</b></p>',
                                '<p><i class="mdi-social-public prefix fix-prefix-position"></i>Type : <b>'+ event.type +'</b></p>',
                                '<blockquote class="text-justify">'+ event.description +'</blockquote>',
                            '</div>',
                        '</div>',
                    '</div>'
                    ].join('\n');

                $('#print-event-explore').append(html);
            });
        }

        function eventError (err1, err2, err3) {
            console.error('Error!!', err1, err2, err3);
        }

        request.done(getEvents);
        request.fail(eventError);
    }

    $('#explore-button').on('click', getEventExplore);
});

