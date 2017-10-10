const apiUrl = "http://52.204.93.216/api/distributor/caco";

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

function fetchData(successFun, errorFun) {
    $.ajax({
        url : apiUrl,
        success: successFun,
        error: errorFun
    });
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