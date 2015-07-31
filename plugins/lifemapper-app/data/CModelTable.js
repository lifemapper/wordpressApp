function CModelTable() {
    function NormalizeData(data) {
        data.datatype = "Model";
    }
    this.BySpecies = function (species, callback) {
        var retVal = cacheManager.GetCache("ML", species.occurrenceSet);
        if (retVal == null) {
            var url = urlManager.getModelListUrl(species.occurrenceSet);
            var manager = this;
            $.getJSON(url, function (data, textStatus, jqXHR) {
                $(data.items).each(function (i, d) { NormalizeData(d); });
                retVal = new CModelList(data.items);
                cacheManager.SetCache("ML", species.occurrenceSet, retVal);
                callback(retVal, textStatus, jqXHR);
            }).error(function () {
                retVal = new CModelList(new Array());
                cacheManager.SetCache("ML", species.occurrenceSet, retVal);
                callback(retVal, species, null);
            });
        }
        else {
            callback(retVal, species, null);
        }
    }
}

function CModelList(dataList) {
    this._list = new Array();
    this.Count = function () { return this._list.length; };
    this.Add = function (model) {
        this._list[this._list.length] = model;
    };
    for (var i = 0; i < dataList.length; i++) {
        this.Add(dataList[i]);
    };
    this.each = function (callback) { $(this._list).each(callback); };
}

function CModelSelector(resultid, selectionCallback) {
    this.resultContainer = $(resultid);
    this.selectionCallback = selectionCallback;

    var selector = this;

    this.ClearResults = function () {
        selector.resultContainer.html("");
    }

    this.AddModel = function (index, model) {
        var div = document.createElement("div");
        div.model = model;
        div.className = 'r' + (index % 2).toString();
        $(div).html('<span class="n">' + model.title + '</span><span class="d">' + model.summary + '</span>');
        $(div).click(function () {
            if (selector.selectionCallback == null) {
                hm.ShowMessage(model.name);
            }
            else {
                selector.selectionCallback(model);
            }
        });
        selector.resultContainer.append(div);
    }

    this.ProcessSearchResults = function (modelList) {
        var results = selector.resultContainer;
        selector.ClearResults();
        modelList.each(selector.AddModel);
    }

    this.LoadBySpecies = function (species) {
        modelManager.BySpecies(species, selector.ProcessSearchResults);
    }
}
db.ModelTable = new CModelTable();

