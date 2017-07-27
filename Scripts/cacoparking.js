const fullThreshold = 0.15;
const limitedThreshold = 0.40;
const apiUrl = "Insert URL Here";

function requestData() {
    showData(data);
};

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
            "note": "",
            "status": "Open",
            "statusTimeStamp": "2017-06-26T13:26:58.543886",
            "freeSpace": 0,
            "freeSpaceTimeStamp": "2017-06-26T13:26:58.5453916"
        },
        {
            "id": 20,
            "parkAbbrevId": "CACO",
            "abbrevId": "LITTLECREEK",
            "name": "Little Creek Parking (for Coast Guard Beach)",
            "lattitude": 41.846383,
            "longitude": -69.959873,
            "capacity": 422,
            "note": null,
            "status": "Open",
            "statusTimeStamp": "2017-06-26T13:26:58.545",
            "freeSpace": 150,
            "freeSpaceTimeStamp": "2017-06-26T13:26:58.545"
        },
        {
            "id": 21,
            "parkAbbrevId": "CACO",
            "abbrevId": "MARCONI",
            "name": "Marconi",
            "lattitude": 41.891549,
            "longitude": -69.963428,
            "capacity": 530,
            "note": "",
            "status": "Open",
            "statusTimeStamp": "2017-06-26T13:26:58.5453916",
            "freeSpace": 500,
            "freeSpaceTimeStamp": "2017-06-26T13:26:58.5453916"
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
            "status": "Closed",
            "statusTimeStamp": "2017-06-26T13:26:58.545",
            "freeSpace": 0,
            "freeSpaceTimeStamp": "2017-06-26T13:26:58.545"
        },
        {
            "id": 23,
            "parkAbbrevId": "CACO",
            "abbrevId": "RACEPOINT",
            "name": "Race Point",
            "lattitude": 42.079271,
            "longitude": -70.218091,
            "capacity": 292,
            "note": "",
            "status": "Closed",
            "statusTimeStamp": "2017-06-26T13:26:58.5453916",
            "freeSpace": 0,
            "freeSpaceTimeStamp": "2017-06-26T13:26:58.5453916"
        },
        {
            "id": 24,
            "parkAbbrevId": "CACO",
            "abbrevId": "HERRINGCOVE",
            "name": "Herring Cove",
            "lattitude": 42.044123,
            "longitude": -70.216109,
            "capacity": 602,
            "note": "",
            "status": "Closed",
            "statusTimeStamp": "2017-06-26T13:26:58.5453916",
            "freeSpace": 0,
            "freeSpaceTimeStamp": "2017-06-26T13:26:58.5453916"
        }
    ];
    successFun(data);
    /*$.ajax({
        url : dataUrl,
        success: successFun,
        error: errorFun
    });*/
}

function showData(data) {
    data.forEach(function (element) {
        createMarker(element);
    });
}

function createMarker(lot) {

    var lotStatus, lotCrowded, lastUpdated, popupContent;
    var markerColor = "#A9A9A9";

    if (lot.status == "Closed") {
        lotStatus = "<p class='closedstatus'>Closed</p>";
        lotCrowded = "";
        lastUpdated = "<p class='lastupdated'>Last updated: " + moment(lot.statusTimeStamp, moment.ISO_8601).format("MMM D, h:m") + "</p>";
    } else {
        if (lot.status == "No Fee") {
            lotStatus = "<p>" + lot.status + "</p>";
        } else {
            lotStatus = "<p class='openstatus'>" + lot.status + "</p>";
        }
        lotCrowded = "<p>Available Space: ";
        if (lotIsFull(lot)) {
            lotCrowded += "<span class='closedstatus'>None</span></p>";
            markerColor = "#e60000";

        } else if (lotIsLimited(lot)) {
            lotCrowded += "<span class='crowdedstatus'>Limited</span></p>";
            markerColor = "#cc6600";
        } else {
            lotCrowded += "<span class='openstatus'>Yes</span></p>";
            markerColor = "#009933";
        }
        lastUpdated = "<p class='lastupdated'>Last updated: " + moment(lot.freeSpaceTimeStamp, moment.ISO_8601).format("MMM D, h:m") + "</p>";
    }

    popupContent = "<h1>" + lot.name + "</h1>" + lotStatus + lotCrowded + lastUpdated;

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