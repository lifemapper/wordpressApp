var pageDialogGroup = new CDialogGroup("page");
var helpDialogGroup = new CDialogGroup("help");
var lifemapper = null;
var dataDownloader = null;
$(function () {
    $("#page-help").click(function () {
        if (pageHelpEvent != null) {
            pageHelpEvent();
        }
    });

    var climateLayersDialog = new CDialogWithHelp("#climate-selection", { width: 300, height: 300 }, "#how-to-explore-climate-layer", { width: 650, height: 440 });
    climateLayersDialog.Show();

    InstallHelpButton(helpDialogGroup, ".climate-data-filter-button", "#climate-data-filter-message", { width: 400, height: 400 });
    InstallHelpButton(helpDialogGroup, ".ipcc-scenario-button", "#ipcc-scenario-message", { width: 550, height: 450 });

    var existingPageDialog = new CDialogWithHelp(".non-dialog", { width: 350, height: 600 }, "#how-to-explore-archive", { width: 600, height: 520 });
    existingPageDialog.ShowDialog = function () {
        var url = "default" + pageSuffix + "#page:species-archive;";
        var p = dqs.getParameter("el");
        if (p != null) {
            url += ";el:" + p;
        }
        window.location = url;
    };
    $(".species-archive-button").click(pageDialogGroup.CreateOpener(existingPageDialog));

    $(".climate-selection-button").click(pageDialogGroup.CreateOpener(climateLayersDialog));

    var createExperimentDialog = new CDialogWithHelp(".non-dialog", { width: 320, height: 600 }, "#how-to-create-experiment", { width: 600, height: 650 });
    createExperimentDialog.ShowDialog = function () {
        var url = "default" + pageSuffix + "#page:create-experiment;";
        var p = dqs.getParameter("el");
        if (p != null) {
            url += ";el:" + p;
        }
        window.location = url;
    };
    $(".create-experiment-button").click(pageDialogGroup.CreateOpener(createExperimentDialog));

    $(".my-experiment-button").click(function () {
        var url = "default" + pageSuffix + "#page:my-experiment;";
        var p = dqs.getParameter("el");
        if (p != null) {
            url += ";el:" + p;
        }
        window.location = url;
    });

    var scenarioListView = new CScenarioListView("#climate-selection", ".climate-map-image", ".select-climate-message");
    dataDownloader = new CClimateDataDownloader($("#download-link"), $("#download-container"));
    $("#climate-map img").draggable({});
});
