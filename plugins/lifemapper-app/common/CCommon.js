var pageSuffix = "";

if (window.location.toString().indexOf(".html") > 0) {
    pageSuffix = ".html";
}
else {
    pageSuffix = ".aspx";
}

jQuery.extend({
    postJSON: function (url, data, callback) {
        return jQuery.post(url, data, callback, "json");
    }
});

function getAttributeName(prefix) {
    return prefix.replace(' ', '_');
}

function EndsWith(str, suffix) {
    return (str.substring(str.length - suffix.length, str.length) == suffix);
}

$(function () {
    $(".hover-button").each(function (i, e) {
        e.autoToggle = true;
        var je = $(e);
        var standardUrl = je.attr("src");
        e.standardUrl = standardUrl;
        var parts = e.standardUrl.split(".png");
        var hoverUrl = parts[0] + "_hover.png" + parts[1];
        je.mouseenter(function () { if (e.autoToggle) { je.attr("src", hoverUrl); } });
        je.mouseleave(function () { if (e.autoToggle) { je.attr("src", standardUrl); } });
    });
    $("input[type=text]").each(function (i, o) {
        if ((o.title != null) && (o.title.length > 0)) {
            o.hinttext = o.title;
            $(o).addClass("hinted");
            $(o).val(o.title);
            $(o).blur(function (e) {
                e = $(this);
                if (e.val() == "") {
                    e.val(e[0].hinttext);
                    e.addClass("hinted");
                }
            });
            $(o).focus(function (e) {
                e = $(this);
                if (e.val() == e[0].hinttext) {
                    e.val("");
                    e.removeClass("hinted");
                }
            });
        }
    });
});
function createUniqueBase()
{
  var d = new Date();
  return d.getFullYear().toString() + d.getMonth().toString() + d.getDate().toString() + d.getHours().toString() + d.getMinutes().toString() + d.getSeconds().toString() + d.getMilliseconds().toString();
}
var _nextID = 0;
var _uniqueBase = createUniqueBase();
	
function getUniqueKey()
{
  return _uniqueBase + (++_nextID).toString();
}
function CLocalUrlManager() {
    this.checkIndex = 0;
    this.getAlgorithmUrl = function () {
        return "sourcedata/algorithmlist.aspx?format=json";
    }
    this.getExperimentDataUrl = function (occurrenceSet) {
        return "sourcedata/experimentdata.aspx?format=json&os=" + occurrenceSet
    }
    this.getPostExperimentUrl = function (email) {
        return "sourcedata/experiment.aspx?format=json&email=" + escape(email);
    }
    this.getExperimentDetailUrl = function (id) {
        return "sourcedata/experimentdetail.aspx?id=" + id + "&v=" + getUniqueKey();
    }
    this.getModelListUrl = function(occurrenceSet) {
        return "sourcedata/modeldata.aspx?format=json&os=" + occurrenceSet;
    }
    this.getOccurrenceSetDetailUrl = function (occurrenceSet) {
        return "sourcedata/occurrencedata.aspx?format=json&os=" + occurrenceSet;
    }
    this.getScenarioByEnvironmentalSetUrl = function (environmentalSet) {
        return "sourcedata/scenariomatch.aspx?format=json&environmentalset=" + environmentalSet;
    }
    this.getScenarioListByKeywordUrl = function (keyword) {
        return "sourcedata/scenariolist.aspx?format=json&keyword=" + keyword;
    }
    this.getScenarioUrl = function (id) {
        return "sourcedata/scenario.aspx?format=json&id=" + id;
    }
    this.getSpeciesListByPrefixUrl = function (prefix) {
        return "sourcedata/speciesdata.aspx?format=json&p=" + prefix;
    }
    this.getSpeciesKMLUrl = function (occurrenceSet) {
        return lmConstants.webServicesRoot + "services/sdm/occurrences/" + occurrenceSet + "/kml";
    }
    this.getFileUploadUrl = function () {
        return "upload.aspx";
    }
    this.getPermalink = function (speciesName) {
        return ("default.aspx?species=[item]").replace("[item]", escape(speciesName));
    }
    this.getSpeciesName = function () {
        var parts = window.location.toString().split("default.aspx?species=");
        if (parts.length == 1) {
            return null;
        }
        else {
            return parts[1];
        }
    }
}
function CLiveUrlManager(domain) {
    //var root = "http://" + domain;
    var root = lmConstants.webServicesRoot;
    this.getAlgorithmUrl = function () {
        return root + "/javascript/algorithms.json";
    }
    this.getExperimentDataUrl = function (occurrenceSet) {
        return root + "/services/sdm/models/json?occurrenceSetId=" + occurrenceSet;
    }
    this.getPostExperimentUrl = function (email) {
        return root + "/services/sdm/experiments/json?email=" + escape(email);
    }
    this.getExperimentDetailUrl = function (id) {
        return root + "/services/sdm/experiments/" + id + "/json?v=" + getUniqueKey();
    }
    this.getModelListUrl = function (occurrenceSet) {
        return root + "/services/sdm/models/json?occurrenceSetId=" + occurrenceSet + "&status=300";
    }
    this.getOccurrenceSetDetailUrl = function (occurrenceSet) {
        return root + "/services/sdm/occurrences/" + occurrenceSet + "/json";
    }
    this.getScenarioByEnvironmentalSetUrl = function (environmentalSet) {
        return root + "/services/sdm/scenarios/json?public=1&matchingScenario=" + environmentalSet;
    }
    this.getScenarioListByKeywordUrl = function (keyword) {
        return root + "/services/sdm/scenarios/json?keyword=" + keyword + "&perPage=100&page=0&public=1&epsgCode=4326";
    }
    this.getScenarioUrl = function (id) {
        return root + "/services/sdm/scenarios/" + id + "/json";
    }
    this.getSpeciesListByPrefixUrl = function (prefix) {
        return root + "/hint/species/" + prefix + "?format=json&columns=1&maxreturned=10000";
    }
    this.getSpeciesKMLUrl = function (occurrenceSet) {
        return root + "/services/sdm/occurrences/" + occurrenceSet + "/kml";
    }
    this.getFileUploadUrl = function () {
        return root + "/services/sdm/occurrences/xml";
    }
    this.getPermalink = function (speciesName) {
	  return (root + "/species/[item]").replace("[item]", escape(speciesName));
    }

    this.getSpeciesName = function () {
        var parts = window.location.toString().split("speciesname=");
        if (parts.length == 1) {
            return null;
        }
        else {
            return parts[1].split("#")[0];
        }
    }
}
var urlManager = null;
if ((0==1) && ((window.location.toString().indexOf("localhost") >= 0) || (window.location.toString().indexOf("bunch-consulting") >= 0))) {
    urlManager = new CLocalUrlManager();
}
else {
    var parts = window.location.toString().split("/");
    urlManager = new CLiveUrlManager(parts[2]);
    //urlManager = new CLiveUrlManager("lifemapper.org");
}

function padNumber(n, l) {
    n = n.toString();
    while (n.length < l) {
        n = "0" + n;
    }
    return n;
}

function getTimeString(d) {
    return padNumber(d.getHours(), 2) + ":" + padNumber(d.getMinutes(), 2) + ":" + padNumber(d.getSeconds(), 2);
}
