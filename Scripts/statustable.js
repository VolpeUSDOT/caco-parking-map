var refreshInterval;
const refreshTimeMillis = 300000;

function initializeTable() {
    var data = fetchData();
    var panelStr = "<div class='panel panel-default'><div class='panel-heading npsheader' style='font-weight:bold;'>";
    panelStr += "<img class='npslogo' src='Images/AH_large_flat_4C.gif'/><span class='headertextlarge'>National Park Service</span>";
    panelStr += "<span class='headertext'>Cape Cod National Seashore</span></div>";
    panelStr += "<table class='table'><tr class='columnheader'><td>Park Name</td><td>Lot Status</td></tr>";
    data.forEach(function (lot) {
        panelStr += "<tr><td>" + lot.name + "</td>";
        panelStr += "<td><span id='" + lot.id + "status' class='" + getClassName(lot) + "'>" + lot.status + "</span></td></tr>";
    });
    panelStr += "</table></div>";
    $("#StatusTable").append(panelStr);
    refreshInterval = setInterval(updateTable, refreshTimeMillis);
}

function updateTable() {
    console.log("Update called at " + Date.now().toString());
    var data = fetchData();
    data.forEach(function (lot) {
        var statusSpan = $("#" + lot.id + "status");
        statusSpan.text(lot.status);
        statusSpan.attr('class', getClassName(lot));
    });
}


function fetchData() {
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
            "status": "No Fee",
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
    return data;
}

function getClassName(lot) {
    switch (lot.status) {
        case "Closed":
            return "closed";
        case "No Fee":
            return "nofee";
        default:
            // We don't have the final JSON structure yet
            // TODO update this to change class depending on parking availability
            return "yes";
    }
}