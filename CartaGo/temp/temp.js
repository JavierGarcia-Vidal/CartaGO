
function exploreFilter (filter) {

    $("#print-event-explore > *").remove();

    var request = $.get("https://javiergvs.cartodb.com/api/v2/sql?q=SELECT * FROM map WHERE type IN ('"+ filter +"') AND type IS NOT NULL");

    function filterEvents (events) {
        console.log('REQUEST DONE',events);
        var num = 0;
        var picture = 0;
        var picture_route = ['city','nightlife','technics','fashion','business','transport','sports',
                             'people','abstract','animals','cats','food','nature'];
        $.each(events.rows, function(id, event) 
               {
            console.log(event);
            function isUnlimited(value) {
                if(event.affiliation < 0){
                    return 'Unlimited';
                }else {
                    return event.affiliation;
                }
            }

            if (num >= 10) 
            {
                num = 0;
                picture++;
            } else {
                num++;
            }

            var html = [
                '<div class="col l3 m6 s12">',
                '<div class="card small z-depth-2">',
                '<div class="card-image position-center waves-effect waves-block waves-light">',
                '<img class="activator responsive-img" src="http://lorempixel.com/400/200/' + picture_route[picture] + '/' + num + '">',
                '</div>',
                '<div class="card-content truncate">',
                '<span class="card-title activator grey-text text-darken-4">' + event.name + '<p>',
                '<button data-target="modal'+ id +'" class="btn waves-effect waves-light modal-trigger">Read more</button></p></span>',
                '</div>',
                '<div class="card-reveal">',
                '<span class="card-title grey-text text-darken-4">' + event.name + '<i class="mdi-navigation-close right">',
                '</i></span>',
                '<p><i class="mdi-action-home prefix fix-prefix-position"></i>Place : <b>'+ event.place +'</b></p>',
                '<p><i class="mdi-action-grade prefix fix-prefix-position"></i>Affilation : <b>'+ isUnlimited(event.affilation) +'</b>',
                '</p>',
                '<p><i class="mdi-device-access-time prefix fix-prefix-position"></i>Date : <b>'+ event.date +'</b></p>',
                '<p><i class="mdi-social-public prefix fix-prefix-position"></i>Type : <b>'+ event.type +'</b></p>',
                '<blockquote class="text-justify">'+ event.description +'</blockquote>',
                '</div>',
                '</div>',
                '</div>',
                '<div id="modal'+id+'" class="modal modal-fixed-footer">',//Begins modal
                '<div class="modal-content">',
                '<img class="activator materialboxed responsive-img" src="http://lorempixel.com/400/200/' + picture_route[picture] + '/' + num + '">',
                '<h4>' + event.name + '</h4>',
                '<p><b>Date : </b>' + event.date + '</p>',
                '<p><b>Address : </b>' + event.address + '</p>',
                '<p><b>Place : </b>' + event.place + '</p>',
                '<p><b>Type : </b>' + event.type + '</p>',
                '<p><b>Edition : </b>' + event.edition + '</p>',
                '<p><b>Affiliation - Capacity : </b>' + isUnlimited(event.affilation)+ '<-->' + isUnlimited(event.capacity) +'</p>',
                '<p><b>Description : </b>' + event.description + '</p>',
                '</div>',
                '<div class="modal-footer">',
                '<a href="#" class="modal-action modal-close waves-effect waves-green btn-flat ">Vote</a>',
                '<a href="#" class="modal-action modal-close waves-effect waves-red btn-flat ">Report</a>',
                '</div>',
                '</div>'
            ].join('\n');

            $('#print-event-explore').append(html);
        });
    }

    function filterError (err1, err2, err3) {
        console.error('Error!!', err1, err2, err3);
    }

    request.done(filterEvents);
    request.fail(filterError);
}

$(document).ready(function(){
    $('.explore-music').click(exploreFilter('Musica'));
    $('.explore-sports').click(exploreFilter('Deportivo'));
    $('.explore-art').click(exploreFilter('Arte'));
    $('.explore-leisure').click(exploreFilter('Ocio'));
    $('.explore-infantile').click(exploreFilter('Infantil'));
    $('.explore-educative').click(exploreFilter('Educativo'));
});



function getEvent(query, callback){
    $.when($.ajax({
        type: 'GET',
        url: "https://javiergvs.cartodb.com/api/v2/sql?q=" + query,
        success: function(data) {
            area = data.rows[0].sa;
        },
        error: function() {
            console.log("Error al obtener datos");
        }
    })).done(function(data) {
        console.log("View data before callback: " + area);
        callback(area);
    });
}

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


"#map {marker-fill-opacity: 0.9;marker-line-color: #555555;marker-line-width: 1.5;marker-line-opacity: 1;marker-placement: point;marker-type: ellipse;marker-width: 10;marker-allow-overlap: true;} #map[type='Arte'] {marker-fill: #8d6e63;} #map[type='Deportivo'] {marker-fill: #229A00;} #map[type='Educativo'] {marker-fill: #FF9900;} #map[type='Infantil'] {marker-fill: #A53ED5;} #map[type='Musica'] {marker-fill: #F84F40;} #map[type='Ocio'] {marker-fill: #3E7BB6;} #map[type=null] {marker-fill: #aaaaaa;}"