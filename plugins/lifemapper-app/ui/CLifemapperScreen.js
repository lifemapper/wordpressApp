var lifemapper = new CLifemapperScreen();
function CLifemapperScreen() {
    var ls = this;
    function CHandlerList() { this.add = new Array(); this.remove = new Array(); this.update = new Array(); this.show = new Array(); this.hide = new Array();this.loadStart = new Array();this.loadEnd = new Array();}
    var speciesHandler = new CHandlerList();
    var occurrenceSetHandler = new CHandlerList();
    var experimentHander = new CHandlerList();
    var modelHandler = new CHandlerList();
    var projectionHandler = new CHandlerList();
    var scenarioHandler = new CHandlerList();
    var userExperimentHandler = new CHandlerList();
    var clearList = new Array();
    var dialogList = new Array();

    function AddListener(hl, h) { if (h != null) { hl[hl.length] = h; } };
    function ExecuteList(a, b, c, d, e, f, g) { for (var i = 0; i < a.length; i++) { a[i](b, c, d, e, f, g); } };

    this.InstallComponent = function (c) {
        AddListener(clearList, c.ClearData);

        AddListener(speciesHandler.add, c.AddSpecies);
        AddListener(speciesHandler.update, c.UpdateSpecies);
        AddListener(speciesHandler.remove, c.RemoveSpecies);
        AddListener(speciesHandler.show, c.ShowSpecies);
        AddListener(speciesHandler.hide, c.HideSpecies);

        AddListener(occurrenceSetHandler.add, c.AddOccurrenceSet);
        AddListener(occurrenceSetHandler.update, c.UpdateOccurrenceSet);
        AddListener(occurrenceSetHandler.remove, c.RemoveOccurrenceSet);
        AddListener(occurrenceSetHandler.show, c.ShowOccurrenceSet);
        AddListener(occurrenceSetHandler.hide, c.HideOccurrenceSet);

        AddListener(modelHandler.add, c.AddOccurrenceSet);
        AddListener(modelHandler.update, c.UpdateModel);
        AddListener(modelHandler.remove, c.RemoveModel);
        AddListener(modelHandler.show, c.ShowModel);
        AddListener(modelHandler.hide, c.HideModel);

        AddListener(projectionHandler.add, c.AddProjection);
        AddListener(projectionHandler.update, c.UpdateProjection);
        AddListener(projectionHandler.remove, c.RemoveProjection);
        AddListener(projectionHandler.show, c.ShowProjection);
        AddListener(projectionHandler.hide, c.HideProjection);

        AddListener(experimentHander.add, c.AddExperiment);
        AddListener(experimentHander.update, c.UpdateExperiment);
        AddListener(experimentHander.remove, c.RemoveExperiment);
        AddListener(experimentHander.show, c.ShowExperiment);
        AddListener(experimentHander.hide, c.HideExperiment);

        AddListener(userExperimentHandler.add, c.AddUserExperiment);
        AddListener(userExperimentHandler.update, c.UpdateUserExperiment);
        AddListener(userExperimentHandler.remove, c.RemoveUserExperiment);
        AddListener(userExperimentHandler.show, c.ShowUserExperiment);
        AddListener(userExperimentHandler.hide, c.HideUserExperiment);

        AddListener(scenarioHandler.add, c.AddScenario);
        AddListener(scenarioHandler.update, c.UpdateScenario);
        AddListener(scenarioHandler.remove, c.RemoveScenario);
        AddListener(scenarioHandler.show, c.ShowScenario);
        AddListener(scenarioHandler.hide, c.HideScenario);
        AddListener(scenarioHandler.loadStart, c.LoadScenarioListStart);
        AddListener(scenarioHandler.loadEnd, c.LoadScenarioListEnd);

        AddListener(dialogList, c.DialogShown);
    }

    this.Clear = function () { ExecuteList(clearList) };

    this.AddSpecies = function (d, e) {
        ExecuteList(speciesHandler.add, d, e);
        if (db.ExperimentTable != null) {
            db.ExperimentTable.ByOccurrenceSet(d);
        }
    };
    this.UpdateSpecies = function (d) { ExecuteList(speciesHandler.update, d); };
    this.RemoveSpecies = function (d) { ExecuteList(speciesHandler.remove, d); };
    this.ShowSpecies = function (d, e) {ExecuteList(speciesHandler.show, d, e); };
    this.HideSpecies = function (d) { ExecuteList(speciesHandler.hide, d); };
    this.AddOccurrenceSet = function (d) { ExecuteList(occurrenceSetHandler.add, d); };
    this.UpdateOccurrenceSet = function (d) { ExecuteList(occurrenceSetHandler.update, d); };
    this.RemoveOccurrenceSet = function (d) { ExecuteList(occurrenceSetHandler.remove, d); };
    this.ShowOccurrenceSet = function (d) { ExecuteList(occurrenceSetHandler.show, d); };
    this.HideOccurrenceSet = function (d) { ExecuteList(occurrenceSetHandler.hide, d); };
    this.AddModel = function (o, d) { ExecuteList(modelHandler.add, o, d); };
    this.UpdateModel = function (d) { ExecuteList(modelHandler.update, d); };
    this.RemoveModel = function (d) { ExecuteList(modelHandler.remove, d); };
    this.ShowModel = function (d) { ExecuteList(modelHandler.show, d); };
    this.HideModel = function (d) { ExecuteList(modelHandler.hide, d); };
    this.AddProjection = function (d, e, p) { ExecuteList(projectionHandler.add, d, e, p); };
    this.UpdateProjection = function (d) { ExecuteList(projectionHandler.update, d); };
    this.RemoveProjection = function (d) { ExecuteList(projectionHandler.remove, d); };
    this.ShowProjection = function (d) { ExecuteList(projectionHandler.show, d); };
    this.HideProjection = function (d) { ExecuteList(projectionHandler.hide, d); };
    this.AddExperiment = function (o, d) {
        ExecuteList(experimentHander.add, o, d);
        db.ExperimentTable.getExperimentDetail(o, d);
    };
    var myTest = 0;
    this.UpdateExperiment = function (a, b, c, d, e, f, g) {
        myTest += 1;
        ExecuteList(experimentHander.update, a, b, c, d, e, f, g);
    };
    this.RemoveExperiment = function (d) { ExecuteList(experimentHander.remove, d); };
    this.ShowExperiment = function (d) { ExecuteList(experimentHander.show, d); };
    this.HideExperiment = function (d) { ExecuteList(experimentHander.hide, d); };
    this.AddUserExperiment = function (d) {
        ExecuteList(userExperimentHandler.add, d);
        db.ExperimentTable.CheckExperiment(d.species, d, true);
    };
    this.RemoveUserExperiment = function (d) { ExecuteList(userExperimentHandler.remove, d); };
    this.UpdateUserExperiment = function (d) { ExecuteList(userExperimentHandler.update, d); };
    this.ShowUserExperiment = function (d) {ExecuteList(userExperimentHandler.show, d);};
    this.HideUserExperiment = function (d) { ExecuteList(userExperimentHandler.hide, d); };
    this.SelectEnvironmentalSet = function (val) {db.ScenarioTable.LoadMatching(val);};
    this.LoadScenarioListStart = function () { ExecuteList(scenarioHandler.loadStart); };
    this.LoadScenarioListEnd = function () { ExecuteList(scenarioHandler.loadEnd); };
    this.AddScenario = function (d) { ExecuteList(scenarioHandler.add, d); };
    this.DialogShown = function (g, d) { ExecuteList(dialogList, g, d); };
}