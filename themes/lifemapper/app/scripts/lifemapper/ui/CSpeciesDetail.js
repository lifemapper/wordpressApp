function CSpeciesDetail(containerID) {
    var dv = this;
    var speciesList = $(containerID + " .species_list");
    var rootList = new Array();
    var helpDialog = new CDialog("#existing-models-message", { width: 550, height: 600, dialogClass: "help-dialog" });
    var species = null;
    var modelsLoaded = false;

    this.AddSpecies = function (d) {
        if (species != null) {
            dv.RemoveSpecies(species);
        }
        species = d;
        modelsLoaded = false;
        $(speciesList).children(".title").show(false);
        var div = document.createElement('div');
        var display = d.name + " (" + d.numPoints.toString() + " Distribution Points)";
        var jdiv = $(div);
        var nameSpan = document.createElement('span');
        var checkbox = document.createElement('input');
        checkbox.type = "checkbox";
        checkbox.checked = true;
        checkbox.data = d;
        $(checkbox).change(function () {
            if (checkbox.checked) {
                lifemapper.ShowSpecies(d);
            }
            else {
                lifemapper.HideSpecies(d);
            }
        });

        $(nameSpan).addClass("n");
        $(nameSpan).text(display);

        var nameDiv = document.createElement('div');
        $(nameDiv).append(checkbox);
        $(nameDiv).append(nameSpan);

        jdiv.append(nameDiv);

        div.data = d;
        div.experimentList = new Array();
        speciesList.append(div);

        rootList[rootList.length] = div;
    }

    function createExperimentDetail(div) {
        var jdiv = $(div);
        var titleDiv = $(document.createElement("div"));
        titleDiv.addClass("existing-model-label-container");
        var modelTitle = document.createElement('h4');
        $(modelTitle).html("Existing Models");
        var helpImg = document.createElement("img");
        helpImg.id = "existing-models-button";
        helpImg.src = "images/help_button.png?v=3.9";
        helpImg.alt = "help text";
        $(helpImg).addClass("existing-models-help");
        $(helpImg).click(helpDialogGroup.CreateOpener(helpDialog));

        titleDiv.append(modelTitle);
        titleDiv.append(helpImg);

        jdiv.append(titleDiv);

        var noProjection = document.createElement('div');
        $(noProjection).addClass("noprojection");

        $(noProjection).html("<input type='radio' checked='checked' name='prj'/><span>No Models</span>");
        jdiv.append(noProjection);
        $(noProjection).children("input").change(function () {
            if (dv.selectedProjection != null) {
                lifemapper.HideProjection(dv.selectedProjection);
            }
        });
    }

    this.RemoveSpecies = function (d) {
        var i = 0;
        var l = rootList;
        while ((i < l.length) && (l[i].data != d)) {
            i++;
        }
        if (i < l.length) {
            var div = l[i];
            $(div).remove();

            //remove experiments
            var el = div.experimentList;
            var pl = null;
            for (var j = 0; j < el.length; j++) {
                lifemapper.RemoveExperiment(el[j].experiment);
                pl = el[j].projectionList;
                for (var k = 0; k < pl.length; k++) {
                    lifemapper.RemoveProjection(pl[k].projection);
                }
            }

            i++;
            while (i < l.length) {
                l[i - 1] = l[i];
                i++;
            }
            l.length -= 1;
        }
    }

    this.AddExperiment = function (o, e) {
        for (var i = 0; i < rootList.length; i++) {
            if (rootList[i].data == o) {
                if (!modelsLoaded) {
                    createExperimentDetail(rootList[i]);
                    modelsLoaded = true;
                }
                var div = document.createElement('div');
                $(div).addClass("algorithm-detail");
                var span = document.createElement('span');
                $(span).addClass("model-name");
                var label = document.createElement("label");
                var pdiv = document.createElement('div');
                div.projectionList = new Array();
                $(label).text("Algorithm: ");
                $(div).append(label);
                $(div).append(span);

                $(span).text("loading...");
                $(div).append(pdiv);
                $(pdiv).addClass("projection-list");
                div.data = o;
                div.experiment = e;
                div.span = span;
                div.pdiv = pdiv;
                var l = rootList[i].experimentList;
                l[l.length] = div;
                $(rootList[i]).append(div);
            }
        }
    }

    this.UpdateExperiment = function (o, e, p, status) {
        if (e.detail != null) {
            var d = findExperimentDiv(e);
            if (d != null) {
                if (p == null) {
                    $(d.span).text(e.detail.algorithm.code);
                }
            }
        }
    }

    function findExperimentDiv(e) {
        var o = null;
        var d = null;
        var l = null;
        for (var i = 0; i < rootList.length; i++) {
            o = rootList[i].data;
            l = rootList[i].experimentList;
            for (var j = 0; j < l.length; j++) {
                d = l[j];
                if (d.experiment.id == e.id) {
                    return d;
                }
            }
        }
        return null;
    }

    this.AddProjection = function (o, e, p) {
        if (p.status == 35) {
            var pdiv = null;
            var namespan = null;
            var checkbox = null;
            var d = findExperimentDiv(e);
            if (d != null) {
                pdiv = document.createElement('div');
                checkbox = document.createElement('input');
                checkbox.type = 'radio';
                checkbox.name = 'prj';
                $(checkbox).change(function () {
                    if (checkbox.checked) {
                        if (dv.selectedProjection != null) {
                            lifemapper.HideProjection(dv.selectedProjection);
                        }
                        dv.selectedProjection = p;
                        lifemapper.ShowProjection(p);
                    }
                    else {
                        lifemapper.HideProjection(p);
                    }
                });
                namespan = document.createElement('span');
                d.projectionList[d.projectionList.length] = pdiv;
                pdiv.projection = p;
                $(pdiv).append(checkbox);
                $(pdiv).append(namespan);
                $(namespan).text(getDisplay(p.description));
                $(d.pdiv).append(pdiv);
            }
        }
    }
    lifemapper.InstallComponent(this);
}