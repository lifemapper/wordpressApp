function CProjectionTable() {
    function NormalizeData(data) {
        data.datatype = "Projection";
    }
    this.BySpecies = function (species, callback) {
        var retVal = cacheManager.GetCache("P_S", species.occurrenceSet);
        if (retVal == null) {
            var url = urlManager.getOccurrenceSetDetailUrl(species.occurrenceSet);
            var manager = this;
            $.getJSON(url, function (data, textStatus, jqXHR) {
                $(data.items).each(function (i, d) { NormalizeData(d); });
                retVal = new ProjectionList(data.items);
                cacheManager.SetCache("P_S", species.occurrenceSet, retVal);
                callback(retVal, textStatus, jqXHR);
            }).error(function (a, b, c) {
                retVal = new ProjectionList(new Array());
                cacheManager.SetCache("P_S", species.occurrenceSet, retVal);
                callback(retVal, species);
            });
        }
        else {
            callback(retVal, species);
        }
    };
}

function ProjectionList(dataList) {
    this._list = new Array();
    this.Count = function () { return this._list.length; };
    this.Add = function (projection) {
        this._list[this._list.length] = projection;
    };
    for (var i = 0; i < dataList.length; i++) {
        this.Add(dataList[i]);
    };
    this.each = function (callback) { $(this._list).each(callback); };
}

function ProjectionSelector(resultid, selectionCallback) {
    this.resultContainer = $(resultid);
    this.selectionCallback = selectionCallback;

    var selector = this;

    this.ClearResults = function () {
        selector.resultContainer.html("");
    }

    this.AddProjection = function (index, projection) {
        var div = document.createElement("div");
        div.projection = projection;
        div.className = 'r' + (index % 2).toString();
        $(div).html('<span class="n">' + projection.title + '</span><span class="d">' + projection.summary + '</span>');
        $(div).click(function () {
            if (selector.selectionCallback == null) {
                hm.ShowMessage(projection.name);
            }
            else {
                selector.selectionCallback(projection);
            }
        });
        selector.resultContainer.append(div);
    }

    this.ProcessSearchResults = function (projectionList) {
        var results = selector.resultContainer;
        selector.ClearResults();
        projectionList.each(selector.AddProjection);
    }

    this.LoadBySpecies = function (species) {
        db.ProjectionTable.BySpecies(species, selector.ProcessSearchResults);
    }

}

db.ProjectionTable = new CProjectionTable();
