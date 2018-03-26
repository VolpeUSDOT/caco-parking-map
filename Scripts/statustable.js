const apiUrl = "https://chc78z04rj.execute-api.us-east-1.amazonaws.com/beta/%7Bcaco+%7D";

$(document).ready(function() {
    fetchData(initializeTable, function () { window.alert("Unable to load parking information.  Please try again."); });
});

var refreshInterval;
const refreshTimeMillis = 300000;

function fetchData(successFun, errorFun) {
    $.ajax({
        url: apiUrl,
        success: successFun,
        error: errorFun
    });
}

function initializeTable(data) {
    data.sort(function (a, b) {
        return a.name > b.name;
    });
    var panelStr = "<div class='panel panel-default'><div class='panel-heading npsheader' style='font-weight:bold;'>";
    panelStr += "</div>";
    panelStr += "<table class='table'><tr class='columnheader'><td>Lot Name</td><td>Lot Status</td><td>Parking Availability</td><td>Additional Information</td></tr>";
    data.forEach(function (lot) {
        panelStr += "<tr><td>" + lot.name + "</td>";
        if (lot.status == "Closed") {
            panelStr += "<td><span id='" + lot.id + "status' class='no'>" + lot.status + "</span></td>";
            panelStr += "<td><span id='" + lot.id + "available'> </span></td>";
        } else {
            panelStr += "<td><span id='" + lot.id + "status' class='yes'>" + lot.status + "</span></td>";
            panelStr += "<td><span id='" + lot.id + "available' class='" + getAvailabilityClassName(lot) + "'>" + lot.freeSpaceStatus + "</span></td>";
        }
        if (lot.note == null) {
            lot.note = " ";
        }
        panelStr += "<td><span id='" + lot.id + "note'>" + lot.note + "</span></td>";
    });
    panelStr += "</table></div>";
    $("#StatusTable").append(panelStr);
    // Reload our data at the specified frequency
    refreshInterval = setInterval(refreshData, refreshTimeMillis);
}

function refreshData() {
    fetchData(updateTable, function () {
        console.log("Fetch data failed")
    });
}

// Update lot statuses
function updateTable(data) {
    data.forEach(function (lot) {
        var statusSpan = $("#" + lot.id + "status");
        var availableSpan = $("#" + lot.id + "available");
        var noteSpan = $("#" + lot.id + "note");
        statusSpan.text(lot.status);
        if (lot.status == 'Closed') {
            statusSpan.attr('class', 'closed');
            availableSpan.text(" ");
        } else {
            statusSpan.attr('class', 'yes');
            availableSpan.text(lot.freeSpaceStatus);
            availableSpan.attr('class', getAvailabilityClassName(lot));
        }
        if (lot.note != null)
            noteSpan.text(lot.note);
        else
            noteSpan.text(" ");
    });
}

// Determine styling for lot status
function getAvailabilityClassName(lot) {
    if (lot.status == "Closed")
        return "closed";
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