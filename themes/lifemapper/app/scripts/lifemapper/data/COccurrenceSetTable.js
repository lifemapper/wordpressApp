function COccurrenceSetTable() {
    function NormalizeData(data) {
        data.datatype = "OccurrenceSet";
    }
    this.BySpecies = function (species, callback) {
        var retVal = cacheManager.GetCache("OL", species.occurrenceSet);
        if (retVal == null) {
            var url = urlManager.getOccurrenceSetDetailUrl(species.occurrenceSet);
            var manager = this;
            $.getJSON(url, function (data, textStatus, jqXHR) {
                $(data.feature).each(function (i, d) { NormalizeData(d); });
                retVal = new OccurrenceList(data.feature);
                cacheManager.SetCache("OL", species.occurrenceSet, retVal);
                callback(retVal, textStatus, jqXHR, species);
            }).error(function () {
                retVal = new OccurrenceList(new Array());
                cacheManager.SetCache("OL", species.occurrenceSet, retVal);
                callback(retVal, species, null, species);
            });
        }
        else {
            callback(retVal, species, null, species);
        }
    };

    this.AddOccurrenceSet = function (result, callback) {
        this.BySpecies(result, callback);
    };
    this.KMLBySpecies = function (species) {
        return urlManager.getSpeciesKMLUrl(species.occurrenceSet);
    };
}

function COccurrenceList(dataList) {
    this._list = new Array();
    this.Count = function () { return this._list.length; };
    this.Add = function (occurrence) {
        if (occurrence.lat == null) { occurrence.lat = occurrence.latitude; }
        if (occurrence.lon == null) { occurrence.lon = occurrence.longitude; }
        this._list[this._list.length] = occurrence;
    };
    for (var i = 0; i < dataList.length; i++) {
        dataList[i].datatype = "occurrenceset";
        this.Add(dataList[i]);
    };
    this.each = function (callback) { $(this._list).each(callback); };
}


function COccurrenceMap(map, canvas, selectionCallback) {
    this.map = map;
    this.selectionCallback = selectionCallback;
    this.markerImage = new google.maps.MarkerImage('images/marker01.png', new google.maps.Size(9, 9), new google.maps.Point(0, 0), new google.maps.Point(5, 5));
    this.markerList = new Array();
    this.kmlList = new Array();
    this.overlayList = new Array();
    this.handlerList = new Array();
    this.canvas = canvas;

    var selector = this;

    this.AddOccurrenceSetHandler = function (handler) {
        this.handlerList[this.handlerList.length] = handler;
    }

    this.ClearResults = function () {
        $(this.markerList).each(function (i, m) { m.setMap(null); });
        $(this.kmlList).each(function (i, k) { k.setMap(null); });
        $(selector.overlayList).each(function (i, o) { o.clear(); });
        selector.overlayList = new Array();
        selector.markerList = new Array();
        selector.kmlList = new Array();
    }
    this.AddOccurrence = function (index, occurrence) {
        var location = new google.maps.LatLng(occurrence.lat, occurrence.lon);
        var marker = new google.maps.Marker({
            position: location,
            icon:selector.markerImage,
            map: selector.map
        });
        selector.markerList[selector.markerList.length] = marker;
    }

    this.AddOccurrenceSet = function (occurrenceList, s, j, o) {
        $(selector.handlerList).each(function (i, h) {
            h(o);
        });
        occurrenceList.each(selector.AddOccurrence);
    }

    this.ProcessSearchResults = function (occurrenceList) {
        selector.ClearResults();
        occurrenceList.each(selector.AddOccurrence);
    }

    this.LoadBySpecies = function (species) {
        selector.ClearResults();
        var speciesLayer = new SpeciesLayer(species, selector.canvas, selector.map);
        selector.overlayList[selector.overlayList.length] = speciesLayer;
    }
}

db.OccurrenceSetTable = new COccurrenceSetTable();

