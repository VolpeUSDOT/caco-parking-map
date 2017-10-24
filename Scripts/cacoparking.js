const fullThreshold = 0.15;
const limitedThreshold = 0.40;
const apiUrl = "https://chc78z04rj.execute-api.us-east-1.amazonaws.com/beta/%7Bcaco+%7D";

function showData(data) {
    data.forEach(function (element) {
        createMarker(element);
    });
}

function createMarker(lot) {

    var lotCrowded, lastUpdated, popupContent;
    var markerColor = "#A9A9A9";
    lotCrowded = "<p>Parking Available: ";
    switch (lot.freeSpaceStatus) {
        case "Closed":
            lotCrowded = "<span class='closedstatus'>Lot Closed</span></p>";
            break;
        case "Open":
            lotCrowded += "<span class='openstatus'>Yes</span></p>";
            markerColor = "#009933";
            break;
        case "Limited":
            lotCrowded += "<span class='crowdedstatus'>Limited</span></p>";
            markerColor = "#cc6600";
            break;
        case "Full":
            lotCrowded += "<span class='closedstatus'>None</span></p>";
            markerColor = "#e60000";
            break;
        default:
            lotCrowded += "<span class='closedstatus'>" + lot.freeSpaceStatus + "</span></p>";
            markerColor = "#e60000";
            break;
    }

    lastUpdated = "<p class='lastupdated'>Last updated: " + moment(lot.freeSpaceTimeStamp, moment.ISO_8601).format("MMM D, h:m") + "</p>";

    popupContent = "<h1>" + lot.name + "</h1>" + lotCrowded + lastUpdated;

    var geojson = {
        "type": "FeatureCollection",
        "features": [{
            "type": "Feature",
            "geometry": {
                "type": "Point",
                "coordinates": [lot.longitude, lot.lattitude]
            },
            "properties": {}
        }]
    };
    var style = {
        point: {
            'marker-color': markerColor,
            'marker-size': 'large',
            'marker-library': 'npmapsymbollibrary',
            'marker-symbol': 'beach-access-white'
        }
    };

    var marker = L.npmap.layer.geojson({
        data: geojson,
        styles: style,
        popup: {
            description: popupContent
        }
    }).addTo(map);
}

function lotIsFull(lot) {
    return lot.freeSpace <= lot.capacity * fullThreshold;
}

function lotIsLimited(lot) {
    return lot.freeSpace <= lot.capacity * limitedThreshold;
}

function fetchData(successFun, errorFun) {
    $.ajax({
        url : apiUrl,
        success: successFun,
        error: errorFun
    });
}
