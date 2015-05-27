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
                '<button data-target="modal'+id+'" class="btn waves-effect waves-light modal-trigger">Read more</button></p></span>',
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
                '</div>'
            ].join('\n');
            
            $('#print-event-explore').append(html);
            
            var html = [
            '<div id="modal'+id+'" class="modal modal-fixed-footer">',//Begins modal
                '<div class="cyan darken-4 modal-header center">',
                '<h5>' + event.name + '</h5>',
                '</div>',
                '<div class="modal-content center">',
                '<img class="activator responsive-img" src="http://lorempixel.com/400/200/' + picture_route[picture] + '/' + num + '">',
                '<h6><b>Date</b></h6>',
                '<p>' + event.date + '</p>',
                '<h6><b>Address</b></h6>',
                '<p>' + event.address + '</p>',
                '<h6><b>Place</b></h6>',
                '<p>' + event.place + '</p>',
                '<h6><b>Type</b></h6>',
                '<p>' + event.type + '</p>',
                '<h6><b>Edition</b></h6>',
                '<p>' + event.edition + '</p>',
                '<h6><b>Affiliation - Capacity</b></h6>',
                '<p>' + isUnlimited(event.affilation)+ '<-->' + isUnlimited(event.capacity) +'</p>',
                '<h6><b>Description</b></h6>',
                '<p>' + event.description + '</p>',
                '</div>',
                '<div class="cyan darken-4 modal-footer center">',
                '<a href="#" class="modal-action modal-close waves-effect waves-green btn-flat ">Vote</a>',
                '<a href="#" class="modal-action modal-close waves-effect waves-red btn-flat ">Report</a>',
                '</div>',
                '</div>'
            ].join('\n');
            
            $('body').append(html);
            
        });
        
        $('.modal-trigger').leanModal({
            dismissible: true, // Modal can be dismissed by clicking outside of the modal
            opacity: .5, // Opacity of modal background
            in_duration: 300, // Transition in duration
            out_duration: 200, // Transition out duration
        });
    });
});

