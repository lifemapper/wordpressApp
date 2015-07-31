function CPermalink(selector) {
    var link = $(selector);

    this.ShowUserExperiment = function () {
        $(selector).text("");
    }

    this.ShowSpecies = function (s) {
        var a = $(selector);
        var url = urlManager.getPermalink(s.name);
        a.text("Permanent Link: " + url);
        a.attr("href", url);
    }
    this.AddSpecies = this.ShowSpecies;

    this.ShowOccurrenceSet = function (o) {
        $(selector).text("");
    }
    this.AddOccurrenceSet = this.ShowOccurrenceSet;

    lifemapper.InstallComponent(this);
}