var dialogList = new Array();

function getDialog(name) {
    for (var i = 0; i < dialogList.length; i++) {
        if (name == dialogList[i].name) {
            return dialogList[i];
        }
    }
    return null;
}

function CDialog(selector, options, addToList) {
    var t = this;
    var group = null;
    if (addToList == null) {
        dialogList[dialogList.length] = this;
    }
    this.name = selector.substring(1);
    var e = $(selector);
    this.element = e;
    options.autoOpen = false;
    options.close = function () {
        if ((group != null) && (lifemapper != null)) {
            lifemapper.DialogShown(group.name, null);
        }
    };

    e.dialog(options);

    this.Show = function (dg) {
        group = dg;
        e.dialog("open");
        $("img." + t.name + "-button").each(function (i, e) {
            e.autoToggle = false;
            if (e.activeUrl == null) {
                var parts = e.standardUrl.split(".png");
                e.activeUrl = parts[0] + "_active.png" + parts[1];
            }
            $(e).attr("src", e.activeUrl);
        });
        if ((lifemapper != null) && (dg != null)) {
            lifemapper.DialogShown(dg.name, t.name);
        }
    };
    this.Close = function () {
        $("img." + t.name + "-button").each(function (i, e) {
            e.autoToggle = true;
            $(e).attr("src", e.standardUrl);
        });
        e.dialog("close");
        if ((lifemapper != null) && (group != null)) {
            lifemapper.DialogShown(group.name, null);
        }
    };
}

var pageHelpEvent = null;

function CDialogWithHelp(selector, options, helpSelector, helpOptions) {
    var hd = this;
    dialogList[dialogList.length] = this;
    var dialog = new CDialog(selector, options, false);
    hd.name = dialog.name;
    var helpDialog = new CDialog(helpSelector, helpOptions);
    var currentDialog = null;
    var helpShown = false;
    var d = this;
    var continueButton = $(helpSelector + " .continue-button");

    this.Show = function (dg) {
        pageHelpEvent = helpDialogGroup.CreateOpener(helpDialog);
        d.ShowDialog(dg);
    };

    this.Close = function (dg) {
        if (currentDialog != null) {
            currentDialog.Close(dg);
            currentDialog = null;
        }
    };

    this.ShowHelp = function () {
        helpShown = true;
        d.Close();
        currentDialog = helpDialog;
        currentDialog.Show();
    };

    this.ShowDialog = function (dg) {
        d.Close();
        currentDialog = dialog;
        currentDialog.Show(dg);
    };

    continueButton.click(function () {
        if (helpDialog != null) {
            helpDialog.Close();
        }
        hd.ShowDialog();
    });
}


function CDialogGroup(name) {
    var dialogList = new Array();
    var currentDialog = null;
    var dg = this;
    dg.name = name;

    this.Show = function (dialog) {
        dg.Close();
        currentDialog = dialog;
        currentDialog.Show(dg);
    }

    this.Close = function () {
        if (currentDialog != null) {
            if (lifemapper != null) {
                lifemapper.DialogShown(dg.name, null);
            }
            currentDialog.Close(dg);
            currentDialog = null;
        }
    }

    this.CreateOpener = function (dialog) {
        return (function (evt) {
            dg.Show(dialog)
            if (evt != null) {
                evt.stopPropagation();
            }
            return false;
        });
    }
}

function InstallHelpButton(group, buttonSelector, dialogSelector, options) {
    if (options == null) {
        options = new Object();
    }
    options.dialogClass="help-dialog";
    var dialog = new CDialog(dialogSelector, options);
    $(buttonSelector).click(group.CreateOpener(dialog));
}