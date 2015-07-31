function CSpeciesQueryString() {
    var t = this;
    var occurrenceSet = null;
    var experiment = null;
    var experimentList = new Array();
    var pageDialog = null;
    var helpDialog = null;

    this.DialogShown = function (g, d) {
        dqs.SetParameter(g, d);
    };

    this.AddSpecies = function (s) {
        dqs.SetParameter("eid", null);
        dqs.SetParameter("sid", s.occurrenceSet);
    }

    this.AddUserExperiment = function (e) {
        if (e.species != null) {
            var list = dqs.getParameter("el");
            if (list == null) {
                list = e.id;
            }
            else {
                if ((list + "|").indexOf(e.id + "|") == -1) {
                    list += "|" + e.id;
                }
            }
            dqs.SetParameter("el", list);
        }
    }

    this.RemoveUserExperiment = function (e) {
        if (e.species != null) {
            var list = dqs.getParameter("el");
            if (list != null) {
                list += "|";
                list = list.replace(e.id + "|", "");
                if (list.length == 0) {
                    dqs.SetParameter("el", null);
                }
                else {
                    dqs.SetParameter("el", list.substring(0, list.length - 1));
                }
            }
        }
    }

    this.ShowUserExperiment = function (e) {
        dqs.SetParameter("sid", null);
        dqs.SetParameter("eid", e.id);
    }
    this.HideUserExperiment = function (e) {
        dqs.SetParameter("eid", null);
    }

    function OpenByName(name) {
        db.SpeciesTable.Search(name, function (list) {
            list.each(function (i, d) {
                if (d.name.toLowerCase() == name.toLowerCase()) {
                    lifemapper.AddSpecies(d);
                    lifemapper.ShowSpecies(d);
                }
            });
        });
    }

    this.Load = function () {
        var speciesName = urlManager.getSpeciesName();
        if (speciesName == null) {
            var speciesID = dqs.getParameter("sid");
            var experimentID = dqs.getParameter("eid");
            var help = dqs.getParameter("help");
            var page = dqs.getParameter("page");
            var experimentList = dqs.getParameter("el");
            var dialog = null;
            if ((page == null) && (help == null) && (speciesID == null) && (experimentID == null)) {
                pageDialogGroup.Show(howToDialog);
            }
            else {
                if (page != null) {
                    dialog = getDialog(page);
                    pageDialogGroup.Show(dialog);
                }
                if (help != null) {
                    dialog = getDialog(help);
                    helpDialogGroup.Show(dialog);
                }
                if ((experimentList != null) && (experimentList.length > 0)) {
                    experimentList = unescape(experimentList);
                    experimentList = experimentList.split("|");
                    for (var i = 0; i < experimentList.length; i++) {
                        db.ExperimentTable.getExperiment(experimentList[i],
                        function (data) {
                            if (data != null) {
                                lifemapper.AddUserExperiment(data);
                                if (data.id == experimentID) {
                                    lifemapper.ShowUserExperiment(data);
                                }
                            }
                        });
                    }
                }
                if (speciesID != null) {
                    db.SpeciesTable.LoadSpecies(speciesID, function (data) {
                        OpenByName(data.displayName);
                    });
                }
            }
        }
        else {
            speciesName = unescape(speciesName);
            existingPageDialog.ShowDialog = function () { window.location = "default" + pageSuffix + "#page:species-archive;" };
            createExperimentDialog.ShowDialog = function () { window.location = "default" + pageSuffix + "#page:create-experiment;" };
            $(".my-experiment-button").click(function () { window.location = "default" + pageSuffix + "#page:my-experiment;" });
            OpenByName(speciesName);
        }
    }


    lifemapper.InstallComponent(this);
}

var sqm = new CSpeciesQueryString();