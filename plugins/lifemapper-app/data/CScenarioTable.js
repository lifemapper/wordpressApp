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
        switch (dataList[i].epsgcode) {
            case "4326":
                this.Add(dataList[i]);
                break;
        }
    };
    this.each = function (callback) { $(this._list).each(callback); };
}

function CDictionaryItem(k, v) {
    this.key = k;
    this.value = v;

    this.Key = function () { return k; };
    this.Value = function () { return v; };
}

function CDictionary() {
    var _list = new Array();
    var _valueList = new Array();

    this.Add = function (di) {
        _list[_list.length] = di;
        _valueList[_valueList.length] = di.Value();
    }
    this.Item = function (k) {
        for (var i = 0; i < _list.length; i++) {
            if (k == _list[i].Key()) {
                return _list[i].Value();
            }
        }
        return null;
    }
    this.List = function () {
        return _valueList;
    };

    this.sort = function (f) {
        _valueList.sort(f);
    }
    this.each = function (f) {
        $(_valueList).each(f);
    }
}

function ClimateLayerList(list) {
    var cll = this;
    var dataSourceList = new CDictionary();

    this.Add = function (i, d) {
        var parts = d.title.split(",");
        var dataSourceName = parts[0];
        var scenarioName = "Default";
        var timeframeName = "Default";
        if (parts.length > 1) {
            scenarioName = parts[1].trim();
        }
        if (parts.length > 2) {
            timeframeName = parts[2];
        }
        var o = dataSourceList.Item(dataSourceName);
        if (o == null) {
            o = new Object();
            o.name = dataSourceName;
			o.scenarioListLabel = "Choose a Layer";
				  
			switch (dataSourceName) {
				case "CRU":
					o.sortorder = 1;
					o.display = "CRU, Observed, 10-min res";
					break;
				case "WorldClim 1.4":
					o.display = "Worldclim, Observed, 30-sec res";
					o.sortorder = 2;
					break;
				case "Hadley":
					o.display = "Hadley, Predicted for 3rd IPCC Report, 10-min res";
					o.sortorder = 3;
					break;
				case "NIES":
					o.display = "NIES, Predicted for 4th IPCC Report, 30-sec res";
					o.sortorder = 4;
					break;
				default:
					o.display = name;
					o.sortorder=100;
					break;
			}
		  
		  
            o.ScenarioList = new CDictionary();
            dataSourceList.Add(new CDictionaryItem(dataSourceName, o));
        }
        var scenario = o.ScenarioList.Item(scenarioName);
        if (scenario == null)
        {
            scenario = new Object();
            scenario.name = scenarioName;
            scenario.TimeframeList = new CDictionary();
            switch (scenarioName) {
                case "IPCC TAR A2":
                    scenario.sortorder = 3;
                    scenario.display = "A2, 2050, 3rd IPCC Report";
                    break;
                case "IPCC TAR B1":
                    scenario.sortorder = 1;
                    scenario.display = "B1, 2050, 3rd IPCC Report";
                    break;
                case "IPCC TAR A1":
                    scenario.sortorder = 2;
                    scenario.display = "A1B, 2050, 3rd IPCC Report";
                    break;
                case "IPCC AR4 B1":
                    scenario.sortorder = 1;
                    scenario.display = "B1, 4th IPCC Report";
                    break;
                case "IPCC AR4 A1B":
                    scenario.sortorder = 2;
                    scenario.display = "A1B, 4th IPCC Report";
                    break;
                case "IPCC AR4 A2":
                    scenario.sortorder = 3;
                    scenario.display = "A2, 4th IPCC Report";
                    break;
                default:
                    scenario.sortorder = 100;
                    scenario.display = scenarioName;
                    break;
            }
            o.ScenarioList.Add(new CDictionaryItem(scenarioName, scenario));
        }
        var tf = scenario.TimeframeList.Item(timeframeName);
        if (tf == null) {
            tf = new Object();
            tf.name = timeframeName;
            tf.ScenarioList = new Array();
            scenario.TimeframeList.Add(new CDictionaryItem(timeframeName, tf));
        }
        tf.ScenarioList[tf.ScenarioList.length] = d;
    }

    list.each(this.Add);
    dataSourceList.sort(ObjectSorting);
    dataSourceList.each(function (i, ds) {
        ds.ScenarioList.sort(ObjectSorting);
        ds.ScenarioList.each(function (j, scenario) {
            scenario.TimeframeList.sort(ObjectSorting);
        });
    });

    this.each = function (f) { dataSourceList.each(f); };
}

//this is the item that displays the actual map, it's listed as a radio button and displays the associated map when selected
function ScenarioDetailList(scenario, dataList) {
    this.scenario = scenario;
    this._list = new Array();
    this.Count = function () { return this._list.length; };
    dataList.sort(function (a, b) {
        a = GetSortDetail(a.name);
        b = GetSortDetail(b.name);
        return a.compareto(b);
    });
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

db.ScenarioTable = new CScenarioTable();


function ObjectSorting(a, b) {
    if ((a.sortorder == null || b.sortorder == null) || (a.sortorder == b.sortorder)) {
        a = GetSortDetail(a.name);
        b = GetSortDetail(b.name);
        return a.compareto(b);
    }
    else if (a.sortorder < b.sortorder) {
        return -1;
    }
    else {
        return 1;
    }
}



function GetSortDetail(d) {
    var that = this;
    var l = "";
    var n = "";
    for (var i = 0; i < d.length; i++) {
        switch (d[i]) {
            case "0":
            case "1":
            case "2":
            case "3":
            case "4":
            case "5":
            case "6":
            case "7":
            case "8":
            case "9":
                n += d[i];
                break;
            default:
                l += d[i];
                break;
        }
    }
    return { l: l, n: parseInt(n), compareto: function (b) {
        var a = this;
        if (a.l == b.l) {
            if (a.n < b.n) {
                return -1;
            }
            else if (a.n > b.n) {
                return 1;
            }
            else {
                return 0;
            }
        }
        else if (a.l < b.l) {
            return -1;
        }
        else {
            return 1;
        }
    }
    };
};
