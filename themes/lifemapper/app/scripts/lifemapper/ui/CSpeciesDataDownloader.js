function CSpeciesDataDownloader(downloadLinkSelector, dropDownListSelector) {
    var dd = this;
    var species = null;
    this.downloadLink = downloadLink;
    this.dropDownList = dropDownList;
    var keepAlive = false;
    var downloadLink = $(downloadLinkSelector);
    var dropDownList = $(dropDownListSelector);

    downloadLink.hide(false);
    dropDownList.hide(false);

    dropDownList.children("div").children("div").children("a").each(function (i, e) {
        e.urlTemplate = $(e).attr("href");
    });

    dropDownList.children(".points").hide(false);
    dropDownList.children(".projections").hide(false);

    downloadLink.mouseenter(function () {
        if (species != null) {
            keepAlive = true;
            dropDownList.fadeIn(true);
        }
    });
    downloadLink.mouseleave(function () {
        keepAlive = false;
        window.setTimeout(function () { if (!keepAlive) { dropDownList.fadeOut(true); } }, 100);
    });
    dropDownList.mouseenter(function () { keepAlive = true; });
    dropDownList.mouseleave(function () {
        keepAlive = false;
        window.setTimeout(function () { if (!keepAlive) { dropDownList.fadeOut(true); } }, 100);
    });

    this.AddSpecies = function (s) {
        species = s;
        downloadLink.show(true, function () { downloadLink.show(false); });
        dropDownList.children(".point").show(false);
        dropDownList.children("div.point").children("div").children("a").each(function (i, e) {
            e.href = e.urlTemplate.replace("[itemId]", species.occurrenceSet);
        });
    };

    this.RemoveSpecies = function () {
        species = null;
        downloadLink.hide(true, function () { downloadLink.hide(false); });
    };

    this.ShowProjection = function (p) {
        var url = "";
        dropDownList.children(".projections").show(false);
        dropDownList.children("div.projections").children("div").children("a").each(function (i, e) {
            url = e.urlTemplate.replace("[itemId]", p.name.substring(4));
            $(e).attr("href", url);
        });
    }

    this.HideProjection = function (p) {
        dropDownList.children(".projections").hide(false);
    }

    this.RemoveProjection = function (p) {
        dd.HideProjection(p);
    }

    this.AddOccurrenceSet = this.AddSpecies;
    this.RemoveOccurrenceSet = this.RemoveSpecies;

    this.ShowUserExperiment = function (e) {
        dd.AddSpecies(e.species);
     }

    lifemapper.InstallComponent(this);
}
