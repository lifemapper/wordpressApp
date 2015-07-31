function CScenarioListView(selector, imgSelector, messageSelector) {
    this.container = $(selector + " .scenario-list-container");
    this.currentDetail = null;
    this.image = $(imgSelector);
    this.message = $(messageSelector);
    this.climateDataSelector = $(selector + " .climate-data-selector");
    this.ipccScenarioSelector = $(selector + " .ipcc-scenario-selector");
    this.ipccTimespanSelector = $(selector + " .ipcc-timeframe-selector");
    this.currentScenario = null;
    var lv = this;

    this.ShowDetail = function (detail) {
        var top = 90;
        if (lv.ipccScenarioSelector[0].options.length != 2) {
            top += 60;
        }
        if (lv.ipccTimespanSelector[0].options.length != 2) {
            top += 60;
        }
	    $(".scenario-label").show(false);
        if (detail != null) {
            if (detail.div == null) {
                detail.div = $(document.createElement("div"));
                detail.div.css("top", top);
                detail.div.html("Loading...");
                detail.div.addClass("detail");
                lv.container.append(detail.div);
                db.ScenarioTable.LoadLayers(detail.data.ScenarioList[0], function (detailList) {
                    detail.div.text("");
                    var div = null;
                    detailList.each(function (i, d) {
                        div = document.createElement("div");
                        div.detail = new Object();
                        div.detail.data = d;
                        div.detail.div = $(div);
                        $(div).text(d.title);
                        $(div).click(function () {
                            var detail = this.detail;
                            if (lv.currentScenario != null) {
                                lv.currentScenario.div.removeClass("selected");
                            }
                            lv.currentScenario = detail;
                            detail.div.addClass("selected");
                            lv.message.hide(false);
                            lv.image.show(false);
                            lv.image.attr("src", detail.data.metadataUrl + '/ogc?layers=' + detail.data.mapLayername + '&height=' + lv.image.height().toString() + '&width=' + lv.image.width().toString() + '&request=GetMap&service=WMS&bbox=-180.0,-90.0,180.0,90.0&srs=epsg:4326&format=image/png&color=bluered&version=1.1.0&styles=');
                            //lv.image.attr("src", detail.data.mapPrefix + '&height=' + lv.image.height().toString() + '&width=' + lv.image.width().toString() + '&request=GetMap&service=WMS&bbox=-180.0,-90.0,180.0,90.0&srs=epsg:4326&format=image/png&color=bluered&version=1.1.0&styles=');
                            dataDownloader.SetClimateLayer(detail.data);
                        });
                        detail.div.append(div);
                    });
                });
            }
            detail.div.show(true, function () { detail.div.show(false); });
            lv.currentDetail = detail;
        }
    }
    this.HideDetail = function (detail) {
		$(".scenario-label").hide(false);
        detail.div.hide(true, function () { detail.div.hide(false); });
        if (detail == lv.currentDetail) {
            lv.currentDetail = null;
        }
    }

    lv.climateDataSelector.change(function (e) {
        var detail = lv.climateDataSelector[0].options[lv.climateDataSelector[0].selectedIndex].detail;
	    $(".scenario-label span").text(detail.data.scenarioListLabel);
        lv.ipccScenarioSelector.html("");
        if (lv.currentDetail != null) {
            lv.HideDetail(lv.currentDetail);
            dataDownloader.SetClimateLayer(null);
            lv.image.attr("src", lmConstants.pluginDir + "images/climate_blank_map.png?v=3.7");
        }
        $(".ipcc-timeframe-selector-container").hide(false);
        $(".ipcc-scenario-selector-container").hide(false);
        if (detail != null) {
            var l = detail.data.ScenarioList;
            lv.ipccScenarioSelector.append("<option>Choose an IPCC Scenario</option>");
            var c = 0;
            l.each(function (i, s) {
                var option = document.createElement("option");
                var jo = $(option);
                option.detail = new Object();
                option.detail.data = s;
                option.detail.div = null;
                jo.text(s.display);
                lv.ipccScenarioSelector.append(jo);
                c++;
            });
            if (c == 1) {
                lv.ipccScenarioSelector[0].selectedIndex = 1;
                lv.ipccScenarioSelector.change();
                $(".ipcc-scenario-selector-container").hide(false);
            }
            else {
                $(".ipcc-scenario-selector-container").show(false);
            }
        }
    });
    lv.ipccScenarioSelector.change(function (e) {
        var detail = lv.ipccScenarioSelector[0].options[lv.ipccScenarioSelector[0].selectedIndex].detail;
        lv.ipccTimespanSelector.html("");
        if (lv.currentDetail != null) {
            lv.HideDetail(lv.currentDetail);
            dataDownloader.SetClimateLayer(null);
            lv.image.attr("src", lmConstants.pluginDir + "images/climate_blank_map.png?v=3.7");
        }
        if (detail != null) {
            var l = detail.data.TimeframeList;
            lv.ipccTimespanSelector.append("<option>Choose a Time Period</option>");
            var c = 0;
            l.each(function (i, s) {
                var option = document.createElement("option");
                var jo = $(option);
                option.detail = new Object();
                option.detail.data = s;
                option.detail.div = null;
                jo.text(s.name);
                lv.ipccTimespanSelector.append(jo);
                c++;
            });
            if (c == 1) {
                lv.ipccTimespanSelector[0].selectedIndex = 1;
                lv.ipccTimespanSelector.change();
                $(".ipcc-timeframe-selector-container").hide(false);
            }
            else {
                $(".ipcc-timeframe-selector-container").show(false);
            }
        }
    });
    lv.ipccTimespanSelector.change(function (e) {
        var detail = lv.ipccTimespanSelector[0].options[lv.ipccTimespanSelector[0].selectedIndex].detail;
        var cd = lv.currentDetail;
        if (cd != null) {
            lv.HideDetail(cd);
        }
        if (cd != detail) {
            lv.ShowDetail(detail);
        }
    });

    this.Add = function (i, item) {
        var div = $(document.createElement("div"));
        div.addClass("container")
        var header = $(document.createElement("div"));
        header.addClass("header")
        var databody = $(document.createElement("div"));
        databody.addClass("detail");
        databody.text("Loading...");
        var button = document.createElement("img");
        $(button).attr("src", "./images/unselected.gif");
        var name = document.createElement("span");
        button.item = item;
        button.detail = databody;


        $(name).text(item.title);
        header.append(button);
        header.append(name);
        div.append(header);
        div.append(databody);
        lv.container.append(div);

        $(button).click(function (e) {
            var cb = lv.currentButton;
            if (cb != null) {
                lv.HideDetail(cb);
            }
            if (cb != this) {
                lv.ShowDetail(this);
            }
        });

    }
    this.Load = function (list) {
        var climateLayerList = new ClimateLayerList(list);
        lv.climateDataSelector.html("");
        lv.climateDataSelector.append("<option>Choose One</option>");
        climateLayerList.each(function (i, d) {
            var option = document.createElement("option");
            var jo = $(option);
            option.detail = new Object();
            option.detail.data = d;
            option.detail.div = null;
            jo.text(d.display);
            lv.climateDataSelector.append(jo);
        });
    }

    db.ScenarioTable.Load(lv.Load);
}
