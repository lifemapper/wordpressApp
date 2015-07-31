function CUserExperimentDetail(selector, dialogGroup) {
    var t = this;
    var dialog = new CDialog(selector, { minWidth: 500, minHeight: 350 });
    var nameDiv = $(selector + " .name");
    var algorithmDiv = $(selector + " .algorithm");
    var environmentalSetDiv = $(selector + " .environmentalSet");
    var statusImage = $(selector + " .statusImage");
    var lastCheckedDiv = $(selector + " .lastChecked");
    var currentExperiment = null;
    var currentProjection = null;
    var projectionList = $(selector + " .projection-list");
    var projections = new Array();

    this.ShowUserExperiment = function (e) {
        projections = new Array();
        currentExperiment = e;
        nameDiv.text(e.model.occurrenceSet.displayName);
        algorithmDiv.text(e.algorithm.code);
        environmentalSetDiv.text(getDisplay(e.model.scenarioCode));
        projectionList.html("");
        $(e.projections.projections).each(function (i, d) {
            var div = $(document.createElement("div"));
            div.text(getDisplay(d.scenarioCode));
            div.data = d;
            projectionList.append(div);
            projections[projections.length] = { div: div, data: d };
        });

        t.UpdateUserExperiment(e);
        dialogGroup.Show(dialog);
    }

    function findDiv(p)
    {
        for (var i = 0; i < projections.length; i++) {
            if (projections[i].data.scenarioCode == p.scenarioCode) {
                return projections[i];
            }
        }
    }

    this.UpdateUserExperiment = function (e) {
        if ((currentExperiment != null) && (e.id == currentExperiment.id)) {
            lastCheckedDiv.text(getTimeString(new Date()));
            var status = db.ExperimentTable.getExperimentStatus(e);
            statusImage.attr("src", "./images/" + status + "_monitor.png?v=3.9");

            $(e.projections.projections).each(function (i, d) {
                var o = findDiv(d);
                var div = o.div;
                if (div.lastStatus != "completed") {
                    if (div.lastClass != null) {
                        div.removeClass(div.lastClass);
                    }
                    var status = db.ExperimentTable.getStatus(d.status);
                    div.lastStatus = status;
                    if (status == "completed") {
                        div.lastClass = "unselected";
                        div.click(function () {
                            if (o != currentProjection) {
                                if (currentProjection != null) {
                                    currentProjection.div.removeClass("selected");
                                }
                                currentProjection = o;
                                currentProjection.div.addClass("selected");
                                lifemapper.AddProjection(e.species, e, d);
                                lifemapper.ShowProjection(d);
                            }
                        });
                    }
                    else {
                        div.lastClass = status;
                    }
                    div.addClass(div.lastClass);
                }
            });
        }
    }

    lifemapper.InstallComponent(this);
}