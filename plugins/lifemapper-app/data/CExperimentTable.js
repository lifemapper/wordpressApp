function CExperimentTable() {
    var t = this;
    function NormalizeData(data) {
        data.datatype = "Experiment";
        if (data.model != null) {
            data.species = new Object();
            var o = data.model.occurrenceSet;
            data.species.name = o.displayName;
            data.species.numPoints = o.queryCount;
            data.species.occurrenceSet = o.id;
        }
    }
    this.NormalizeData = NormalizeData;
    this.ByOccurrenceSet = function (o) {
        var retVal = cacheManager.GetCache("EL", o.occurrenceSet);
        var callback = function (l) {
            l.each(function (i, e) {
                lifemapper.AddExperiment(o, e);
            });
        };
        if (retVal == null) {
            var url = urlManager.getExperimentDataUrl(o.occurrenceSet);
            var manager = this;
            $.getJSON(url, function (data, textStatus, jqXHR) {
                $(data.items).each(function (i, d) { NormalizeData(d); });
                retVal = new CExperimentList(data.items);
                cacheManager.SetCache("ML", o.occurrenceSet, retVal);
                callback(retVal);
            });
        }
        else {
            callback(retVal);
        }
    }
    this.getExperiment = function (id, callback) {
        var url = urlManager.getExperimentDetailUrl(id);
        $.getJSON(url, function (data) {
            NormalizeData(data);
            t.getExperimentDetail(data.species, data);
            callback(data);
        }).error(function (a, b, c, d, e) {
            callback(null);
        });
    };

    this.getExperimentDetail = function (o, e) {
        if (e.detail == null) {
            var url = urlManager.getExperimentDetailUrl(e.id);
            $.getJSON(url, function (data) {
                e.detail = data;
                ShowProjections(o, e, data);
            });
        }
        else {
            alert("Already Loaded");
            return false;
        }
    }

    this.CheckExperiment = function (occurenceSet, experiment, runAgain) {
        var url = urlManager.getExperimentDetailUrl(experiment.id);
        $.getJSON(url, function (data) {
            lifemapper.UpdateUserExperiment(data);
            var status = t.getExperimentStatus(data);
            if ((status == "initialized") || (status == "running")) {
                window.setTimeout(function () { t.CheckExperiment(occurenceSet, experiment, runAgain); }, 15000);
            }
        });
    };

    function ShowProjections(occurrenceSet, experiment, data) {
        var e = experiment;
        var o = occurrenceSet;
        var runAgain = false;
        var minStatus = 50000;
        var lastUpdated = "";
        var status = "";
        e.detail = data;
        $(data.projections.projections).each(function (i, d) {
            lastUpdated = getTimeString(new Date());
            d.status = parseInt(d.status);
            minStatus = Math.min(minStatus, d.status);
            status = getStatus(d.status);
            runAgain = ((status == "initialized") || (status == "running"));
            if (e.species == null) {
                e.species = o;
            }
            lifemapper.AddProjection(e.species, e, d);
            lifemapper.UpdateExperiment(e.species, e, d, status, lastUpdated);
        });
        status = getStatus(minStatus);
        lifemapper.UpdateExperiment(o, e, null, status, lastUpdated, data.projections.projections);
        return runAgain;
    }

    this.getExperimentStatus = function (e) {
        var minStatus = 50000;
        if (e.projections == null) {
            minStatus = 1000;
        }
        else {
            $(e.projections.projections).each(function (i, d) {
                minStatus = Math.min(minStatus, parseInt(d.status));
            });
        }
        return getStatus(minStatus);
    }

    this.getStatus = function (status) {
        return getStatus(parseInt(status));
    }

    function getStatus(statusID) {
        switch (statusID) {
            case 1:
                return "initialized";
                break;
            case 300:
                return "completed";
                break;
            default:
                if (statusID >= 1000) {
                    return "error";
                }
                else {
                    return "running";
                }
                break;
        }
    }
}

function CExperimentList(dataList) {
    var list = new Array();
    this.Count = function () { return list.length; };
    this.Add = function (e) {
        list[list.length] = e;
    };
    for (var i = 0; i < dataList.length; i++) {
        this.Add(dataList[i]);
    };
    this.each = function (callback) { $(list).each(callback); };
}

db.ExperimentTable = new CExperimentTable();
