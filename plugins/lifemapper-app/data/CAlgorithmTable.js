function CAlgorithmTable() {
    function NormalizeData(data) {
        data.datatype = "Algorithm";
    }
    this.Load = function (callback) {
        var retVal = cacheManager.GetCache("AL", "");
        if (retVal == null) {
            //var url = urlManager.getAlgorithmUrl();
		    var data = [{"code":"BIOCLIM","name":"Bioclim"},{"code":"GARP_BS","name":"openModeller GARP - Best Subsets"}];
            $(data).each(function (i, d) { NormalizeData(d); });
            retVal = new CAlgorithmList(data);
            cacheManager.SetCache("AL", "", retVal);
            callback(retVal, null);
        }
        else {
            callback(retVal, null);
        }
    }
}

function CAlgorithmList(dataList) {
    var list = new Array();
    this.Count = function () { return this._list.length; };
    this.Add = function (e) {
        list[list.length] = e;
    };
    for (var i = 0; i < dataList.length; i++) {
        switch (dataList[i].code) {
            case "BIOCLIM":
            case "GARP_BS":
                dataList[i].datatype = "Algorithm";
                this.Add(dataList[i]);
                break;
            default:
                break;
        }
    };
    this.each = function (callback) { $(list).each(callback); };
}

db.AlgorithmTable = new CAlgorithmTable();