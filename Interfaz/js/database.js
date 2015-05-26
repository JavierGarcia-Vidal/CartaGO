var db;

$(document).ready(function(){
    $.getJSON("https://javiergvs.cartodb.com/api/v2/sql?q=SELECT * FROM map WHERE type IS NOT NULL", function(data) {
        console.log('REQUEST DONE',data);
        db = data;
        var num = 0;
        var picture = 0;
        var picture_route = ['city','nightlife','technics','fashion','business','transport','sports',
                             'people','abstract','animals','cats','food','nature'];
        $.each(data.rows, function(id, event) 
        {
            
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
                '<button data-target="#modal'+id+'" class="btn waves-effect waves-light modal-trigger">Read more</button></p></span>',
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
    });
});

