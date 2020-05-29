BASECOORDS = [1.373333, 32.290276]; //uganda centroid ( Kampala )

//function to initiate map object

function makeMap() {
    var TILE_URL = "https://{s}.tile.openstreetmap.org/{z}/{x}/{y}.png"; // where to fetch baselayer from
    var MB_ATTR = 'Map data &copy; <a href="http://openstreetmap.org">OpenStreetMap</a> contributors'; // text for attribution
    mymap = L.map('llmap').setView(BASECOORDS, 8); // the map object (canvas) we'll append layers to, takes the centroid, zoom level as args
    L.tileLayer(TILE_URL, {attribution: MB_ATTR}).addTo(mymap); // append tiles and attribution to map object ( canvas )
}

makeMap(); // call map it into action

function getColor(d) {

        // switch statement for color of feature sent in

        return d == "33 kV" ? '#800026' :
               d == "11 kV" ? '#ffa500' :
                            '#FFEDA0';
    }

function getFullness(d) {

        // switch statement for fullness of feature
        // n.b. this is tied directly to the nature of this being a "line", 
        //      these will all be tied to the nature of the feature being sent in
        //      what is best way to abstract so it doesn't matter what feature or what project (country)

        return d == "Under constrcution" ? '2' :
               d == "Proposed" ? '5' :
                                '0';
    }   

function style(feature) {

    // style function to gather and distribute our style preferences
    return {
        weight: 2,
        opacity: 1,
        color: getColor(feature.properties.voltage),
        dashArray: getFullness(feature.properties.status),
        fillOpacity: 0.7,
    };
}

// get our json, must expand to `n` layers and `m` categories of layers
//     i.e., multiple administrative boundary layers would belong to a single category
//           and different categories would have different UI implementations for switching between them
$.getJSON("/getdata",  
         function(obj){
            var gjson = L.geoJson(obj, { 
                style:style
            }).bindTooltip(function (layer) { // add a tooltip to display metadata about a feature
                return layer.feature.properties.alignment; // this could be broken out to seperate function
            }
            ).addTo(mymap);
});