const apiUrl = "tobedetermined";

var refreshInterval;
const refreshTimeMillis = 300000;

function initializeTable(data) {
    data.sort(function(a, b) {
        return a.name > b.name;
    });
    var panelStr = "<div class='panel panel-default'><div class='panel-heading npsheader' style='font-weight:bold;'>";
    panelStr += "<img class='npslogo' src='Images/AH_large_flat_4C.gif'/><span class='headertextlarge'>National Park Service</span>";
    panelStr += "<span class='headertext'>Cape Cod National Seashore</span></div>";
    panelStr += "<table class='table'><tr class='columnheader'><td>Park Name</td><td>Lot Status</td></tr>";
    data.forEach(function (lot) {
        panelStr += "<tr><td>" + lot.name + "</td>";
        panelStr += "<td><span id='" + lot.id + "status' class='" + getClassName(lot) + "'>" + lot.freeSpaceStatus + "</span></td>";
    });
    panelStr += "</table></div>";
    $("#StatusTable").append(panelStr);
    refreshInterval = setInterval(refreshData, refreshTimeMillis);
}

function refreshData() {
    console.log("Update called at " + Date.now().toString());
    fetchData(updateTable, function () { console.log("Fetch data failed") });
}

function updateTable(data) {
    data.forEach(function (lot) {
        var statusSpan = $("#" + lot.id + "status");
        statusSpan.text(lot.freeSpaceStatus);
        statusSpan.attr('class', getClassName(lot));
    });
}

function getStatusText(lot) {
    if (lot.status == "Closed")
        return lot.status;
    else {
        // TODO change based off of final JSON
        return "Yes";
    }
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

function getClassName(lot) {
    switch (lot.freeSpaceStatus) {
        case "Open":
            return "yes";
        case "Limited":
            return "limited";
        case "Full":
            return "no";
        case "Closed":          
        default:
            return "closed";
    }
}