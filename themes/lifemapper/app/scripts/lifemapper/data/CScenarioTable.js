function CScenarioTable() {
    function NormalizeData(data) {
        data.datatype = "Scenario";
    }
    this.LoadMatching = function (environmentalset) {
        if (environmentalset == null) {
            environmentalset = "";
        }
        var callback = function (list) {
            lifemapper.LoadScenarioListStart();
            list.each(function (i, d) { lifemapper.AddScenario(d); });
            lifemapper.LoadScenarioListEnd();
        };
        var retVal = cacheManager.GetCache("SCM", environmentalset);
        if (retVal == null) {
            var url = urlManager.getScenarioByEnvironmentalSetUrl(environmentalset);
            $.getJSON(url, function (data) {
                $(data.items).each(function (i, d) { NormalizeData(d); });
                retVal = new ScenarioList(data.items);
                cacheManager.SetCache("SCM", environmentalset, retVal);
                callback(retVal);
            }).error(function () {
                retVal = new ScenarioList(new Array());
                cacheManager.SetCache("SCM", environmentalset, retVal);
                callback(retVal);
            }); ;
        }
        else {
            callback(retVal);
        }
    }

    this.Load = function (callback, keyword) {
        if (keyword == null) {
            keyword = "";
        }
        var retVal = cacheManager.GetCache("SCN", keyword);
        if (retVal == null) {
            var url = urlManager.getScenarioListByKeywordUrl(keyword);
            $.getJSON(url, function (data, textStatus, jqXHR) {
                retVal = new ScenarioList(data.items);
                cacheManager.SetCache("SCN", "", retVal);
                callback(retVal);
            }).error(function () {
                retVal = new ScenarioList(new Array());
                cacheManager.SetCache("SCN", "", retVal);
                callback(retVal);
            });
        }
        else {
            callback(retVal);
        }
    }
    this.LoadLayers = function (scenario, callback) {
        var retVal = cacheManager.GetCache("SCN", scenario.id);
        if (retVal == null) {
            var url = urlManager.getScenarioUrl(scenario.id);
            $.getJSON(url, function (data, textStatus, jqXHR) {
                retVal = new ScenarioDetailList(scenario, data.layers.layers);
                cacheManager.SetCache("SCN", scenario.id, retVal);
                callback(retVal);
            }).error(function () {
                retVal = new ScenarioList(scenario, new Array());
                cacheManager.SetCache("SCN", scenario.id, retVal);
                callback(retVal);
            });
        }
        else {
            callback(retVal);
        }
    }
    this.LoadDetail = function (scenario, callback) {
        var retVal = cacheManager.GetCache("SCD", scenario.id);
        if (retVal == null) {
            var url = urlManager.getScenarioUrl(scenario.id);
            $.getJSON(url, function (data, textStatus, jqXHR) {
                retVal = data;
                cacheManager.SetCache("SCN", scenario.id, retVal);
                callback(retVal);
            }).error(function () {
                retVal = new Object();
                cacheManager.SetCache("SCN", scenario.id, retVal);
                callback(retVal);
            });
        }
        else {
            callback(retVal);
        }
    }
}

function ScenarioList(dataList) {
    this._list = new Array();
    this.Count = function () { return this._list.length; };
    this.Add = function (d) {
        this._list[this._list.length] = d;
    };
    for (var i = 0; i < dataList.length; i++) {
        dataList[i].datatype = "scenario";
        switch (dataList[i].code) {
            
        }
        this.Add(dataList[i]);
    };
    this.each = function (callback) { $(this._list).each(callback); };
}

function ScenarioDetailList(scenario, dataList) {
    this.scenario = scenario;
    this._list = new Array();
    this.Count = function () { return this._list.length; };
    this.Add = function (d) {
        this._list[this._list.length] = d;
    };
    for (var i = 0; i < dataList.length; i++) {
        dataList[i].datatype = "scenariodetail";
        this.Add(dataList[i]);
    };
    this.each = function (callback) {
        $(this._list).each(callback); 
    };
}

function ClimateLayerList(list) {
    var cll = this;
    var climateDataList = new Array();

    this.Item = function (name) {
        for (var i = 0; i < climateDataList.length; i++) {
            if (climateDataList[i].name == name) {
                return climateDataList[i];
            }
        }
        return null;
    }

    this.Add = function (i, d) {
        var parts = d.title.split(",");
        var climateDataName = parts[0];
        var scenarioName = "Default";
        if (parts.length > 1) {
            scenarioName = parts[1];
        }
        var o = cll.Item(climateDataName);
        if (o == null) {
            o = new Object();
            o.name = climateDataName;
            o.ScenarioList = new Array();
            climateDataList[climateDataList.length] = o;
        }
        d.name = scenarioName;
        o.ScenarioList[o.ScenarioList.length] = d;
    }

    list.each(this.Add);

    this.each = function (f) { $(climateDataList).each(f); };
}

db.ScenarioTable = new CScenarioTable();