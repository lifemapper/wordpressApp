var map = null;
var pageDialogGroup = new CDialogGroup("page");
var helpDialogGroup = new CDialogGroup("help");
var existingPageDialog = null;
var climateLayersDialog = null;
var createExperimentDialog = null;
var myExperimentListDialog = null;
var howToDialog = null;

$(function () {
    map = new CLifemap("#map-canvas");

    $("#page-help").click(function () {
        if (pageHelpEvent != null) {
            pageHelpEvent();
        }
    });
    //****************Installing Dialogs*************************
    existingPageDialog = new CDialogWithHelp("#species-archive", { width: 350, minWidth: 330, minHeight: 420, height: 420 }, "#how-to-explore-archive", { minWidth: 680, height: 560 });
    $(".species-archive-button").click(pageDialogGroup.CreateOpener(existingPageDialog));

    climateLayersDialog = new CDialogWithHelp(".non-dialog", { width: 320, height: 600 }, "#how-to-explore-climate-layer", { width: 650, height: 440 });
    climateLayersDialog.ShowDialog = function () {
        var url = "climatelayer" + pageSuffix;
        var p = dqs.getParameter("el");
        if (p != null) {
            url += "#el:" + p;
        }
        window.location = url;
    };
    $(".climate-selection-button").click(pageDialogGroup.CreateOpener(climateLayersDialog));

    createExperimentDialog = new CDialogWithHelp("#create-experiment", { minWidth: 400, minHeight: 500, height: 600 }, "#how-to-create-experiment", { minWidth: 750, height: 670 });
    $(".create-experiment-button").click(pageDialogGroup.CreateOpener(createExperimentDialog));

    var speciesSelector = new CSpeciesSelector("#species-archive");
    var speciesDataDownload = new CSpeciesDataDownloader("#download-link", "#download-container");

    var createExperiment = new CExperimentCreator("#create-experiment");

    myExperimentListDialog = new CDialogWithHelp("#my-experiment", { width: 400, height: 400 }, "#how-to-view-experiment", { minWidth: 750, height: 600 });
    $(".my-experiment-button").click(pageDialogGroup.CreateOpener(myExperimentListDialog));
    var experimentListView = new CExperimentListView("#my-experiment");

    createExperiment.resultDialogGroup = pageDialogGroup;
    createExperiment.resultDialog = myExperimentListDialog;

    howToDialog = new CDialog("#how-to-screen", { width: 620, height: 260, resizable: false });
    pageHelpEvent = function () { pageDialogGroup.Show(howToDialog); };
    //****************End Installing Dialogs*************************

    //******************Help buttons*********************
    InstallHelpButton(helpDialogGroup, ".create_choose_species_help_button", "#create-choose-species-message", { width: 400, height: 100 });
    InstallHelpButton(helpDialogGroup, ".existing-search-button", "#existing-search-message", { width: 420, height: 400 });
    InstallHelpButton(helpDialogGroup, ".create-import-file-button", "#create-import-file-message", { width: 400, height: 400 });
    InstallHelpButton(helpDialogGroup, ".create-algorithm-button", "#create-algorithm-message", { width: 400, height: 150 });
    InstallHelpButton(helpDialogGroup, ".create-environmental-set-button", "#create-environmental-set-message", { width: 550, height: 400 });
    InstallHelpButton(helpDialogGroup, ".create-email-button", "#create-email-message", { width: 400, height: 180 });
    InstallHelpButton(helpDialogGroup, ".epsg-code-button", "#epsg-code-message", { width: 400, height: 100 });
    InstallHelpButton(helpDialogGroup, ".my_experiment_help_button", "#my-experiments-message", { width: 550, height: 450 });


    //******************end Help buttons*****************

    var permalink = new CPermalink(".permalink a");

    sqm.Load();
});

