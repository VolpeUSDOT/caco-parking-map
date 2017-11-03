const apiUrl = "https://chc78z04rj.execute-api.us-east-1.amazonaws.com/beta/%7Bcaco+%7D";

var refreshInterval;
const refreshTimeMillis = 300000;

function fetchData(successFun, errorFun) {
    $.ajax({
        url : apiUrl,
        success: successFun,
        error: errorFun
    });
}

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
    // Reload our data at the specified frequency
    refreshInterval = setInterval(refreshData, refreshTimeMillis);
}

function refreshData() {
    fetchData(updateTable, function () { console.log("Fetch data failed") });
}

// Update lot statuses
function updateTable(data) {
    data.forEach(function (lot) {
        var statusSpan = $("#" + lot.id + "status");
        statusSpan.text(lot.freeSpaceStatus);
        statusSpan.attr('class', getClassName(lot));
    });
}

// Determine styling for lot status
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