﻿function CSpeciesTable() {
    function NormalizeData(data) {
        data.datatype = "Projection";
    }
    this.LoadSpecies = function (id, callback) {
        var retVal = cacheManager.GetCache("SI", id);
        if (retVal == null) {
            var url = urlManager.getOccurrenceSetDetailUrl(id);
            var manager = this;
            $.getJSON(url, function (data, textStatus, jqXHR) {
                NormalizeData(data);
                retVal = data;
                cacheManager.SetCache("SI", id, retVal);
                callback(retVal, textStatus, jqXHR);
            }).error(function () {
                retVal = null;
                cacheManager.SetCache("SI", prefix, retVal);
                callback(retVal);
            });
        }
        else {
            callback(retVal, id, null);
        }
    }
    this.Search = function (prefix, callback) {
        var retVal = cacheManager.GetCache("SL", prefix);
        if (retVal == null) {
            var url = urlManager.getSpeciesListByPrefixUrl(prefix);
            var manager = this;
            $.getJSON(url, function (data, textStatus, jqXHR) {
                $(data.columns[0]).each(function (i, d) { NormalizeData(d); });
                retVal = new CSpeciesList(data.columns[0]);
                cacheManager.SetCache("SL", prefix, retVal);
                callback(retVal, prefix, textStatus, jqXHR);
            }).error(function () {
                retVal = new CSpeciesList(new Array());
                cacheManager.SetCache("SL", prefix, retVal);
                callback(retVal, prefix, null);
            });
        }
        else {
            callback(retVal, prefix, null);
        }
    };
}

function CSpeciesList(dataList) {
    this._list = new Array();
    this.Count = function () { return this._list.length; };
    this.Add = function (species) {
        var n = parseInt(species.numPoints);
        if ((n > 1) && (n <= 1000)) {
            this._list[this._list.length] = species;
        }
    };
    for (var i = 0; i < dataList.length; i++) {
        if ((dataList[i].name != null) && (dataList[i].name.length > 0)) {
            dataList[i].datatype = "species";
            this.Add(dataList[i]);
        }
    };
    this.each = function (callback) { $(this._list).each(callback); };
}

db.SpeciesTable = new CSpeciesTable();

