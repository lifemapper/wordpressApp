function CExperimentCreator(selector) {
    var t = this;
    var cboEnvironmentalSet = $(selector + " .create_environmental_set");
    var cboAlgorithm = $(selector + " .create_algorithm");
    var scenarioContainer = $(selector + " .scenario_container");
    var scenarioList = $(selector + " .scenario_list");
    var btnRunModel = $(selector + " .run_model_button");
    var txtEmail = $(selector + " .email");
    var tabGroup = new CTabControl("create");
    var speciesSelector = new CSpeciesSelector(selector);
    var uploader = new COccurrenceSetUploader(selector);

    this.resultDialogGroup = null;
    this.resultDialog = null;

    var data = null;
    var projectionScenarioList = null;
    var occurrenceSet = null;

    var algorithmCode = null;
    var scenarioCode = null;

    function EnableButton() {
        if (ValidateInput().length == 0) {
            btnRunModel.enabled = true;
            btnRunModel.attr("src", "./images/run_experiment.png?v=3.9");
        }
        else {
            btnRunModel.enabled = false;
            btnRunModel.attr("src", "./images/run_experiment_inactive.png?v=3.9");
        }
    }

    function ValidateInput(inputData) {
        var retVal = "";
        var algorithm = cboAlgorithm.val();
        var environmentalSet = cboEnvironmentalSet.val();
        var modelScenario = environmentalSet;

        if (data != null) {
            occurrenceSet = data.occurrenceSet;
        }
        if ((occurrenceSet == null) || (occurrenceSet.length == 0)) {
            retVal += "No species / occurrence set selected\n";
        }
        if ((algorithm == null) || (algorithm.length == 0)) {
            retVal += "The algorithm is required\n";
        }
        if ((environmentalSet == null) || (environmentalSet.length == 0)) {
            retVal += "The environmental set is required\n";
        }
        if (projectionScenarioList == null) {
            retVal += "Please wait for the scenario list to load";
        }
        return retVal;
    }

    function RunModel(e) {
        if (btnRunModel.enabled) {
            var message = ValidateInput();
            var algorithm = cboAlgorithm.val();
            var environmentalSet = cboEnvironmentalSet.val();
            var modelScenario = environmentalSet;
            var email = txtEmail.val();

            $.cookies.set("email", email);

            if (message.length == 0) {
                $(projectionScenarioList).each(function (i, e) {
                    $(e).removeClass("selected");
                    if (e.currentClassName != null) {
                        $(e).removeClass(e.currentClassName);
                        e.currentClassName = null;
                    }
                });

                var postData = "algorithmCode=" + algorithm + "&occurrenceSetId=" + occurrenceSet + "&modelScenario=" + modelScenario;
                var url = urlManager.getPostExperimentUrl(email);
                $(projectionScenarioList).each(function (i, d) {
                    postData += "&projectionScenario=" + d.scenario.id;
                });
                if ((t.resultDialog != null) && (t.resultDialogGroup != null)) {
                    t.resultDialogGroup.Show(t.resultDialog);
                }
                $.postJSON(url, postData, function (e) {
                    db.ExperimentTable.NormalizeData(e);
                    db.ExperimentTable.getExperimentDetail(data, e);
                    lifemapper.AddUserExperiment(e);
                    lifemapper.ShowUserExperiment(e);
                }).error(function () {
                    hm.ShowMessage("An error occurred");
                });
            }
        }
    }

    function InputChanged() {
        EnableButton();
    }

    this.AddSpecies = function (d) {
        data = d;
        EnableButton();
    }
    this.RemoveSpecies = function (d) {
    }

    btnRunModel.click(RunModel);
    btnRunModel.mouseenter(function () {
        if (btnRunModel.enabled) {
            btnRunModel.attr("src", "./images/run_experiment_hover.png?v=3.9");
        }
    });
    btnRunModel.mouseleave(function () {
        if (btnRunModel.enabled) {
            btnRunModel.attr("src", "./images/run_experiment.png?v=3.9");
        }
    });
    db.AlgorithmTable.Load(function (d) {
        d.each(function (i, d) {
            cboAlgorithm.append(new Option(d.name, d.code, false, false));
        });
        if (algorithmCode != null) {
            cboAlgorithm.val(algorithmCode);
        }
        else {
            /* This code used to select the only valid option if only one option was available
            if (cboAlgorithm[0].options.length == 2) {
            cboAlgorithm.val(cboAlgorithm[0].options[1].value);
            }
            */
        }
    });
    db.ScenarioTable.Load(function (d) {
        d.each(function (i, d) {
            if (d.id == "32") {
                cboEnvironmentalSet.append(new Option(d.title, d.id, false, false));
            }
        });
        if (scenarioCode != null) {
            cboEnvironmentalSet.val(scenarioCode);
        }
        else {
            /* This code used to select the only valid option if only one option was available
            if (cboEnvironmentalSet[0].options.length == 2) {
                cboEnvironmentalSet.val(cboEnvironmentalSet[0].options[1].value);
                cboEnvironmentalSet.change();
            }
            */
        }
    }, "observed");

    cboEnvironmentalSet.change(function () {
        scenarioList.html("");
        var val = cboEnvironmentalSet.val();
        if (val == "") {
            scenarioContainer.hide(true, function () { scenarioContainer.hide(false); });
        }
        else {
            scenarioContainer.show(true, function () { scenarioContainer.show(false); });
            scenarioList.html("Loading...");
            lifemapper.SelectEnvironmentalSet(val);
        }
    });

    var scenarioUL = null;
    this.LoadScenarioListStart = function () {
        scenarioList.html("");
        scenarioUL = $(document.createElement("UL"));
        projectionScenarioList = new Array();
    };
    this.LoadScenarioListEnd = function () {
        scenarioList.append(scenarioUL);
    };
    this.AddScenario = function (d) {
        var e = $(document.createElement("li"));
        e[0].scenario = d;
        projectionScenarioList[projectionScenarioList.length] = e[0];
        e.text(d.title);
        scenarioUL.append(e);
    }

    this.AddOccurrenceSet = this.AddSpecies;
    this.RemoveOccurrenceSet = this.RemoveSpecies;

    cboAlgorithm.change(InputChanged);
    cboEnvironmentalSet.change(InputChanged);
    tcm.AddTextInput(txtEmail, InputChanged);

    var emailText = $.cookies.get("email");
    if ((emailText != null) && (emailText != "undefined")) {
        txtEmail.val(emailText);
    }

    lifemapper.InstallComponent(this);
    EnableButton();
}