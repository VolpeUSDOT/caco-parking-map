const fullThreshold = 0.15;
const limitedThreshold = 0.40;
const apiUrl = "Insert URL Here";

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
    // We use dummy data for now
    var data = [
        {
            "id": 19,
            "parkAbbrevId": "CACO",
            "abbrevId": "NAUSETLIGHT",
            "name": "Nauset Light",
            "lattitude": 41.858862,
            "longitude": -69.951859,
            "capacity": 167,
            "note": null,
            "status": "Open",
            "statusTimeStamp": "2017-06-26T13:26:58.543",
            "freeSpace": 10,
            "freeSpaceTimeStamp": "2017-06-26T13:26:58.545",
            "freeSpaceStatus": "Open"
        },
        {
            "id": 20,
            "parkAbbrevId": "CACO",
            "abbrevId": "LITTLECREEK",
            "name": "Coast Guard - Satellite Parking",
            "lattitude": 41.846383,
            "longitude": -69.959873,
            "capacity": 422,
            "note": null,
            "status": "Closed",
            "statusTimeStamp": "2017-06-26T13:26:58.545",
            "freeSpace": 0,
            "freeSpaceTimeStamp": "2017-06-26T13:26:58.545",
            "freeSpaceStatus": "Closed"
        },
        {
            "id": 21,
            "parkAbbrevId": "CACO",
            "abbrevId": "MARCONI",
            "name": "Marconi",
            "lattitude": 41.891549,
            "longitude": -69.963428,
            "capacity": 530,
            "note": null,
            "status": "Open",
            "statusTimeStamp": "2017-06-26T13:26:58.545",
            "freeSpace": 0,
            "freeSpaceTimeStamp": "2017-06-26T13:26:58.545",
            "freeSpaceStatus": "Full"
        },
        {
            "id": 22,
            "parkAbbrevId": "CACO",
            "abbrevId": "HEADOFTHEMEADOW",
            "name": "Head of the Meadow",
            "lattitude": 42.051927,
            "longitude": -70.082019,
            "capacity": 285,
            "note": "As of June 19, HEADMEADOW fee booth was still closed.",
            "status": "Open",
            "statusTimeStamp": "2017-06-26T13:26:58.545",
            "freeSpace": 0,
            "freeSpaceTimeStamp": "2017-06-26T13:26:58.545",
            "freeSpaceStatus": "Limited"
        },
        {
            "id": 23,
            "parkAbbrevId": "CACO",
            "abbrevId": "RACEPOINT",
            "name": "Race Point",
            "lattitude": 42.079271,
            "longitude": -70.218091,
            "capacity": 292,
            "note": null,
            "status": "Open",
            "statusTimeStamp": "2017-06-26T13:26:58.545",
            "freeSpace": 0,
            "freeSpaceTimeStamp": "2017-06-26T13:26:58.545",
            "freeSpaceStatus": "Open"
        },
        {
            "id": 24,
            "parkAbbrevId": "CACO",
            "abbrevId": "HERRINGCOVE",
            "name": "Herring Cove",
            "lattitude": 42.044123,
            "longitude": -70.216109,
            "capacity": 602,
            "note": null,
            "status": "Open",
            "statusTimeStamp": "2017-06-26T13:26:58.545",
            "freeSpace": 0,
            "freeSpaceTimeStamp": "2017-06-26T13:26:58.545",
            "freeSpaceStatus": "Full"
        },
        {
            "id": 26,
            "parkAbbrevId": "CACO",
            "abbrevId": "COASTGUARD",
            "name": "Coast Guard",
            "lattitude": 2.0,
            "longitude": 2.0,
            "capacity": 400,
            "note": null,
            "status": "Open",
            "statusTimeStamp": "2017-06-26T10:00:00",
            "freeSpace": 20,
            "freeSpaceTimeStamp": "2017-06-26T00:00:00",
            "freeSpaceStatus": "Limited"
        }
    ];
    successFun(data);
    /*$.ajax({
        url : dataUrl,
        success: successFun,
        error: errorFun
    });*/
}