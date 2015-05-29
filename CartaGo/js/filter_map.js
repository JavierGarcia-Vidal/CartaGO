//##############################################################################################################################
//##################################################### MODULE MAP #############################################################
//##############################################################################################################################

CartaGo.Map = (function(){
    var map;
    var sublayers = [];
    var lat;
    var lon;

//%%%%%%%%%%%%%%%%%%%%%%%%%%%%%%%%%%%%%%%%%%%%%%%%%%%%%%%%%%%%%%%%%%%%%%%%%%%%%%%%%%%%%%%%%%%%%%%%%%%%%%%%%%%%%%%%%%%%%%%%%%%%%%
//%%%%%%%%%%%%%%%%%%%%%%%%%%%%%%%%%%%%%%%%%%%%%%%%%% PRIVATE FUNCTIONS %%%%%%%%%%%%%%%%%%%%%%%%%%%%%%%%%%%%%%%%%%%%%%%%%%%%%%%%%  //%%%%%%%%%%%%%%%%%%%%%%%%%%%%%%%%%%%%%%%%%%%%%%%%%%%%%%%%%%%%%%%%%%%%%%%%%%%%%%%%%%%%%%%%%%%%%%%%%%%%%%%%%%%%%%%%%%%%%%%%%%%%%%  

//@@@@@@@@@@@@@@@ HIGH ACCUARACY FOR GPS GEOLOCATION @@@@@@@@@@@@@@@@@@@@@@@@@@@@@@@@@@@@@@@@@@@@@@@@@@@@@@@@@@@@@@@@@@@@@@@@@@@
    
    var options = {
        enableHighAccuracy: true 
    };
    
//@@@@@@@@@@@@@@@ ERROR FOR GPS GEOLOCATION @@@@@@@@@@@@@@@@@@@@@@@@@@@@@@@@@@@@@@@@@@@@@@@@@@@@@@@@@@@@@@@@@@@@@@@@@@@@@@@@@@@@
    
    var _onError = function(error) {
        console.log("Getting location failed: " + error);
    };
    
//@@@@@@@@@@@@@@@ GET GPS GEOLOCATION @@@@@@@@@@@@@@@@@@@@@@@@@@@@@@@@@@@@@@@@@@@@@@@@@@@@@@@@@@@@@@@@@@@@@@@@@@@@@@@@@@@@@@@@@@

    var _onLocation = function(position) {
        lat = position.coords.latitude;
        lon = position.coords.longitude;
        $("#progress-bar").css("width", "75%");
        _main(lat, lon);
    };
    
//@@@@@@@@@@@@@@@ CARTODB MAP AND LAYERS @@@@@@@@@@@@@@@@@@@@@@@@@@@@@@@@@@@@@@@@@@@@@@@@@@@@@@@@@@@@@@@@@@@@@@@@@@@@@@@@@@@@@@@
    
    var _main = function(lat,lon){
//*************** MAP OPTIONS **************************************************************************************************
        map = new L.Map('map', { 
            center_lat: lat,
            center_lon: lon,
            center: [lat,lon],
            zoom: 6,
            https: true,
            mobile_layout: true,
            shareable: false,
            loaderControl: false,
            title: false,
            cartodb_logo: false,
            description: false,
            search: false,
            scrollwheel: true,
            tiles_loader: true,
            detectRetina: true
        });

//*************** CREATE BASEMAP ************************************************************************************************ 
        L.tileLayer('http://{s}.basemaps.cartocdn.com/light_all/{z}/{x}/{y}@2x.png', {
            attribution: '&copy; <a href="http://www.openstreetmap.org/copyright">OpenStreetMap</a> contributors, &copy; <a href="http://cartodb.com/attributions">CartoDB</a>'
        }).addTo(map);

        var layerUrl = 'https://javiergvs.cartodb.com/api/v2/viz/f67b93ba-008f-11e5-a9d7-0e0c41326911/viz.json';

        $("#progress-bar").css("width", "100%");
        
//*************** CREATE MAP LAYER **********************************************************************************************
        cartodb.createLayer(map, layerUrl)
            .addTo(map)
            .on('done', function(layer) {
            var subLayerOptions = {
                sql: "SELECT * FROM map",
                cartocss: "#map {marker-fill-opacity: 0.9;marker-line-color: #555555;marker-line-width: 1.5;marker-line-opacity: 1;marker-placement: point;marker-type: ellipse;marker-width: 10;marker-allow-overlap: true;} #map[type='Arte'] {marker-fill: #8d6e63;} #map[type='Deportivo'] {marker-fill: #229A00;} #map[type='Educativo'] {marker-fill: #FF9900;} #map[type='Infantil'] {marker-fill: #A53ED5;} #map[type='Musica'] {marker-fill: #F84F40;} #map[type='Ocio'] {marker-fill: #3E7BB6;} #map[type=null] {marker-fill: #aaaaaa;}"
            };

            var sublayer = layer.getSubLayer(0);

            sublayer.set(subLayerOptions);

            sublayers.push(sublayer);
        }).on('error', function() {
            //log the error
        });
    };

//%%%%%%%%%%%%%%%%%%%%%%%%%%%%%%%%%%%%%%%%%%%%%%%%%%%%%%%%%%%%%%%%%%%%%%%%%%%%%%%%%%%%%%%%%%%%%%%%%%%%%%%%%%%%%%%%%%%%%%%%%%%%%%%%
//%%%%%%%%%%%%%%%%%%%%%%%%%%%%%%%%%%%%%%%%%%%%%%%%%% PUBLIC FUNCTIONS %%%%%%%%%%%%%%%%%%%%%%%%%%%%%%%%%%%%%%%%%%%%%%%%%%%%%%%%%%%%  //%%%%%%%%%%%%%%%%%%%%%%%%%%%%%%%%%%%%%%%%%%%%%%%%%%%%%%%%%%%%%%%%%%%%%%%%%%%%%%%%%%%%%%%%%%%%%%%%%%%%%%%%%%%%%%%%%%%%%%%%%%%%%%%%
    
    return {
        
//@@@@@@@@@@@@@@@ CARTODB MAP AND LAYERS @@@@@@@@@@@@@@@@@@@@@@@@@@@@@@@@@@@@@@@@@@@@@@@@@@@@@@@@@@@@@@@@@@@@@@@@@@@@@@@@@@@@@@@@@
        
        getLocation : function() {
            $("#progress-bar").css("width", "50%");
            navigator.geolocation.getCurrentPosition(_onLocation, _onError, options);
        },
        
//@@@@@@@@@@@@@@@ GET LONGITUDE @@@@@@@@@@@@@@@@@@@@@@@@@@@@@@@@@@@@@@@@@@@@@@@@@@@@@@@@@@@@@@@@@@@@@@@@@@@@@@@@@@@@@@@@@@@@@@@@@@
        
        getLon : function() {
            return lon;
        },
        
//@@@@@@@@@@@@@@@ GET LATITUDE @@@@@@@@@@@@@@@@@@@@@@@@@@@@@@@@@@@@@@@@@@@@@@@@@@@@@@@@@@@@@@@@@@@@@@@@@@@@@@@@@@@@@@@@@@@@@@@@@@@
        
        getLat : function() {
            return lat;
        },

//@@@@@@@@@@@@@@@ FILTER MAP @@@@@@@@@@@@@@@@@@@@@@@@@@@@@@@@@@@@@@@@@@@@@@@@@@@@@@@@@@@@@@@@@@@@@@@@@@@@@@@@@@@@@@@@@@@@@@@@@@@@@
        
        LayerActions : {
            default: function(){
                sublayers[0].setSQL("SELECT * FROM map");
                return true;
            },
            clean: function(){
                sublayers[0].setSQL("SELECT * FROM map WHERE type IS NOT NULL");
                return true;
            },
            music: function(){
                sublayers[0].setSQL("SELECT * FROM map WHERE type IN ('Musica') AND type IS NOT NULL");
                return true;
            },
            sports: function(){
                sublayers[0].setSQL("SELECT * FROM map WHERE type IN ('Deportivo') AND type IS NOT NULL");
                return true;
            },
            art: function(){
                sublayers[0].setSQL("SELECT * FROM map WHERE type IN ('Arte') AND type IS NOT NULL");
                return true;
            },
            leisure: function(){
                sublayers[0].setSQL("SELECT * FROM map WHERE type IN ('Ocio') AND type IS NOT NULL");
                return true;
            },
            infantile: function(){
                sublayers[0].setSQL("SELECT * FROM map WHERE type IN ('Infantil') AND type IS NOT NULL");
                return true;
            },
            educative: function(){
                sublayers[0].setSQL("SELECT * FROM map WHERE type IN ('Educativo') AND type IS NOT NULL");
                return true;
            },
            tecnology: function(){
                sublayers[0].setSQL("SELECT * FROM map WHERE type IN ('Tecnologia') AND type IS NOT NULL");
                return true;
            },
            games: function(){
                sublayers[0].setSQL("SELECT * FROM map WHERE type IN ('Juegos') AND type IS NOT NULL");
                return true;
            },
            business: function(){
                sublayers[0].setSQL("SELECT * FROM map WHERE type IN ('Empresas') AND type IS NOT NULL");
                return true;
            },
            menus: function(){
                sublayers[0].setSQL("SELECT * FROM map WHERE type IN ('Menus') AND type IS NOT NULL");
                return true;
            },
            sale: function(){
                sublayers[0].setSQL("SELECT * FROM map WHERE type IN ('Ofertas') AND type IS NOT NULL");
                return true;
            },
            popularity: function(){
                sublayers[0].setSQL("SELECT * FROM map WHERE affiliation >= 20000 AND type IS NOT NULL LIMIT 20");
                return true;  
            },
            capacity: function(){
                sublayers[0].setSQL("SELECT * FROM map WHERE capacity >= 20000 AND type IS NOT NULL LIMIT 20");
                return true;  
            },
            date: function(){
                sublayers[0].setSQL("SELECT * FROM map WHERE (date >= ('2014-07-11T16:46:40+00:00')) LIMIT 10");
                return true;  
            },
            search: function(value){
                console.log(value);
                sublayers[0].setSQL("SELECT * FROM map WHERE name ILIKE ('%"+value+"%') OR place ILIKE ('%"+value+"%') OR address ILIKE ('%"+value+"%') AND name IS NOT NULL AND place IS NOT NULL AND address IS NOT NULL");
                return true;  
            },
            location: function(){
                sublayers[0].setSQL("SELECT * FROM map WHERE ST_Distance_Sphere(the_geom," + 
                                    "ST_MakePoint("+lon+","+lat+")) <=30 * 1609.34 AND type IS NOT NULL");
                return true;  
            }
        }
    };
})();

//################################################################################################################################
//################################################################################################################################
//################################################################################################################################