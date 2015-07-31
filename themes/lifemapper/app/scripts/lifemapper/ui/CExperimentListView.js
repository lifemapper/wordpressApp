function CExperimentListView(selector) {
    var dl = this;
    var input = $(selector + " .experiment-input");
    var list = $(selector + " .experiment-list");
    var experimentList = new Array();
    var currentExperiment = null;
    var currentProjection = null;

    input.keydown(function (e) {
        if (e.which == 13) {
            var id = input.val();
            input.val("");
            if ((id != null) && (id.length > 0)) {
                var found = false;
                for (var i = 0; i < experimentList.length; i++) {
                    if (experimentList[i].data.id == id) {
                        found = true;
                    }
                }
                if (!found) {
                    db.ExperimentTable.getExperiment(id,
                        function (data) {
                            if (data == null) {
                                data = new Object();
                                data.id = id;
                            }
                            lifemapper.AddUserExperiment(data);
                        });
                }
            }
        }
    });


    function SetExperimentClass(item, status) {
        if (item.currentClass != null) {
            item.div.removeClass(item.currentClass);
        }
        item.currentClass = status;
        item.div.addClass(item.currentClass);
    }

    this.AddUserExperiment = function (e) {
        var item = new Object();
        item.data = e;
        createListItem(item);
        createDetail(item);
        experimentList[experimentList.length] = item;
        item.findProjection = function (p) {
            var l = item.data.projections.projections;
            for (var i = 0; i < l.length; i++) {
                if (l[i].id == p.id) {
                    return l[i];
                }
            }
            return null;
        };
        if (e.species != null) {
            dl.UpdateUserExperiment(e);

            item.div.click(function () {
                if (currentProjection != null) {
                    lifemapper.HideProjection(currentProjection);
                }
                if ((currentExperiment == null) || (currentExperiment.data.id != e.id)) {
                    if (currentExperiment != null) {
                        lifemapper.HideUserExperiment(currentExperiment.data);
                    }
                    lifemapper.ShowUserExperiment(e);
                }
                else {
                    lifemapper.HideUserExperiment(currentExperiment.data);
                }
            });

            list.prepend(item.detail);
        }
        list.prepend(item.div);
    }

    function createListItem(item) {
        var div = $(document.createElement("div"));
        var img = $(document.createElement("img"));
        img.attr("src", "./images/delete.png?v=1");
        div.addClass("list-item");
        div.addClass("experiment");
        if (item.data.species == null) {
            div.addClass("noexperiment");
        }
        var label = $(document.createElement("label"));
        var nameDiv = $(document.createElement("span"));
        label.text("Experiment #");
        nameDiv.addClass("experiment-name");
        nameDiv.text(item.data.id);
        div.append(label);
        div.append(nameDiv);
        if (item.data.species == null) {
            var errorDiv = $(document.createElement("div"));
            errorDiv.addClass("error-text");
            errorDiv.text("Invalid Experiment Number");
            div.append(errorDiv);
        }
        div.append(img);

        img.click(function (evt) {
            lifemapper.RemoveUserExperiment(item.data);
            evt.stopPropagation();
        });

        item.div = div;
    }

    function createDetail(item) {
        if (item.data.species != null) {
            var detail = $(document.createElement("div"));
            detail.addClass("experiment-detail");
            item.detail = detail;
            detail.hide(false);

            item.statusDisplay = createDataDiv(detail, "Status: ", db.ExperimentTable.getExperimentStatus(item.data), "status");
            createDataDiv(detail, "Species: ", item.data.model.occurrenceSet.displayName);
            createDataDiv(detail, "Algorithm: ", item.data.algorithm.code);
            createDataDiv(detail, "Environmental Set: ", getDisplay(item.data.model.scenarioCode));
            var projectionListDiv = $(document.createElement("div"));
            var projectionListLabel = $(document.createElement("div"));
            projectionListLabel.text("Projections:");

            projectionListDiv.addClass("projection-list");
            $(item.data.projections.projections).each(function (i, d) {
                var div = $(document.createElement("div"));
                div.text(getDisplay(d.scenarioCode));
                d.div = div;
                projectionListDiv.append(div);
            });
            detail.append(projectionListLabel);
            detail.append(projectionListDiv);

            item.detail = detail;
        }
    }

    function createDataDiv(parent, labelText, valueText, labelClass) {
        var div = $(document.createElement("div"));
        var label = $(document.createElement("label"));
        var value = $(document.createElement("span"));

        label.text(labelText);
        if (labelClass != null) {
            label.addClass(labelClass);
        }
        value.text(valueText);

        div.append(label);
        div.append(value);
        parent.append(div);
        return value;
    }

    this.RemoveUserExperiment = function (data) {
        var newList = new Array();
        var item = null;
        for (var i = 0; i < experimentList.length; i++) {
            item = experimentList[i];
            if (item.data != data) {
                newList[newList.length] = item;
            }
            else {
                if (currentExperiment == item) {
                    lifemapper.HideUserExperiment(data);
                }
                item.div.remove();
                if (item.detail != null) {
                    item.detail.remove();
                }
            }
        }
        experimentList = newList;
    }

    this.HideUserExperiment = function (e) {
        if ((currentExperiment != null) && (currentExperiment.data.id == e.id)) {
            var ce = currentExperiment;
            currentExperiment.div.removeClass("selected");
            currentExperiment.detail.hide(true, function () { ce.detail.hide(false); });
            currentExperiment = null;
        }
    }

    this.ShowUserExperiment = function (e) {
        if ((currentExperiment == null) || (currentExperiment.data.id != e.id)) {
            if (currentExperiment != null) {
                dl.HideUserExperiment(currentExperiment.data);
            }
            for (var i = 0; i < experimentList.length; i++) {
                if (experimentList[i].data.id == e.id) {
                    currentExperiment = experimentList[i];
                    currentExperiment.div.addClass("selected");
                    currentExperiment.detail.show(true, function () { currentExperiment.detail.show(false); });
                    break;
                }
            }
        }
    }

    this.ShowSpecies = function () {
        if (currentExperiment != null) {
            dl.HideUserExperiment(currentExperiment.data);
        }
    }

    this.AddSpecies = this.ShowSpecies;

    this.ShowOccurrenceSet = dl.ShowSpecies;

    function UpdateProjections(item, e) {
        $(e.projections.projections).each(function (i, p) {
            var ep = item.findProjection(p);
            if (ep != null) {
                if (ep.currentClass != null) {
                    ep.div.removeClass(ep.currentClass);
                }
                ep.currentClass = db.ExperimentTable.getStatus(p.status);
                ep.div.addClass(ep.currentClass);
                if (ep.currentClass == "completed") {
                    ep.div.addClass("unselected");
                    ep.div.click(function () {
                        if (currentProjection != null) {
                            lifemapper.HideProjection(currentProjection);
                        }
                        lifemapper.ShowProjection(p);
                    });
                }
            }
        });
    }

    this.HideProjection = function (p) {
        if (currentExperiment != null) {
            if (currentProjection != null) {
                var cp = currentExperiment.findProjection(p);
                if (cp != null) {
                    cp.div.removeClass("selected");
                    cp.div.addClass("unselected");
                }
            }
        }
    }

    this.ShowProjection = function (p) {
        if (currentExperiment != null) {
            var cp = currentExperiment.findProjection(p);
            if (cp != null) {
                cp.div.removeClass("unselected");
                cp.div.addClass("selected");
            }
            currentProjection = cp;
        }
    }

    this.UpdateUserExperiment = function (e) {
        for (var i = 0; i < experimentList.length; i++) {
            if (experimentList[i].data.id == e.id) {
                var status = db.ExperimentTable.getExperimentStatus(e);
                var txt = experimentList[i].statusDisplay;
                SetExperimentClass(experimentList[i], status);
                if (txt.lastStatus != status) {
                    if (txt.lastStatus != null) {
                        txt.removeClass(txt.lastStatus);
                    }
                    txt.lastStatus = status + "-text";
                    txt.addClass(txt.lastStatus);
                    txt.text(status);
                }

                UpdateProjections(experimentList[i], e);

                break;
            }
        }
    }
    lifemapper.InstallComponent(this);
}

