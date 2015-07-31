function CLifemap(canvasSelector) {
    var lm = this;
    var canvas = $(canvasSelector);

    var options = {
        center: new google.maps.LatLng(0, 0),
        zoom: 2,
        mapTypeId: google.maps.MapTypeId.SATELLITE
    };
    options.minZoom = 2;
    options.maxZoom = 17; //20
    options.zoom = options.minZoom;

    var species = null;
    var projection = null;

    this.map = new google.maps.Map(canvas[0], options);
    this.speciesLayerList = new Array();
    this.occurrenceLayerList = new Array();
    this.projectionLayerList = new Array();

    this.AddSpecies = function (s) {
        if (species != null) {
            lm.RemoveSpecies(species);
        }
        if (projection != null) {
            lm.HideProjection(projection);
        }
        species = s;
        var layer = new CSpeciesMapLayer(species, canvas, lm.map);
        lm.speciesLayerList[lm.speciesLayerList.length] = layer;
        return layer;
    }

    this.UpdateMap = function () {
        var i = 0;
        for (i = 0; i < lm.projectionLayerList.length; i++) {
            lm.projectionLayerList[i].Update();
        }
        for (i = 0; i < lm.occurrenceLayerList.length; i++) {
            lm.occurrenceLayerList[i].Update();
        }
        for (i = 0; i < lm.speciesLayerList.length; i++) {
            lm.speciesLayerList[i].Update();
        }
    }

    this.ShowUserExperiment = function (e) {
        lm.AddOccurrenceSet(e.species);
    }

    this.RemoveSpecies = function (data) {
        if (data == species) {
            species = null;
            var i = 0;
            var l = lm.speciesLayerList;
            while ((i < l.length) && (l[i].data != data)) { i++; };
            if (i < l.length) {
                l[i].hide();
                l[i].clear();
                i++;
                while (i < l.length) {
                    l[i - 1] = l[i];
                    i++;
                }
                l.length -= 1;
            }
        }
    }

    this.ShowSpecies = function (s) {
        var y = null;
        if (projection != null) {
            //lm.HideProjection(projection);
        }
        for (var i = 0; i < lm.speciesLayerList.length; i++) {
            y = lm.speciesLayerList[i];
            if (y.data.occurrenceSet == s.occurrenceSet) {
                y.show();
                lm.UpdateMap();
                break;
            }
        }
    }

    this.HideSpecies = function (s) {
        var y = null;
        for (var i = 0; i < lm.speciesLayerList.length; i++) {
            y = lm.speciesLayerList[i];
            if (y.data.occurrenceSet == s.occurrenceSet) {
                y.hide();
                break;
            }
        }
    }

    this.AddProjection = function (o, e, p) {
        var layer = new CProjectionMapLayer(o, p, canvas, lm.map);
        lm.projectionLayerList[lm.projectionLayerList.length] = layer;
        layer.data = p;
        lm.UpdateMap();
        return layer;
    }

    this.RemoveProjection = function (p) {
        var i = 0;
        var l = lm.projectionLayerList;
        while ((i < l.length) && (l[i].data != p)) {
            i++;
        }
        if (i < l.length) {
            l[i].hide();
            l[i].clear();
            i++;
            while (i < l.length) {
                l[i - 1] = l[i];
                i++;
            }
            l.length -= 1;
        }
    }

    this.ShowProjection = function (p) {
        if (projection != null) {
            lm.HideProjection(projection);
        }
        projection = p;
        var y = null;
        var l = lm.projectionLayerList;
        for (var i = 0; i < l.length; i++) {
            y = l[i];
            if (y.data.id == p.id) {
                y.show();
                lm.UpdateMap();
                break;
            }
        }
    }

    this.HideProjection = function (p) {
        projection = null;
        var y = null;
        var l = lm.projectionLayerList;
        for (var i = 0; i < l.length; i++) {
            y = l[i];
            if (y.data.id == p.id) {
                y.hide();
            }
        }
    }

    this.HideUserExperiment = function (e) {
        if (e.species == species) {
            if (projection != null) {
                lm.HideProjection(projection);
            }
            lm.HideSpecies(species);
        }
    }

    this.ShowOccurrenceSet = this.ShowSpecies;
    this.HideOccurrenceSet = this.HideSpecies;

    this.AddOccurrenceSet = this.AddSpecies;
    this.RemoveOccurrenceSet = this.RemoveSpecies;

    lifemapper.InstallComponent(this);
    google.maps.event.addListener(lm.map, 'idle', lm.UpdateMap);
}

function addKMLLayer(map, url) {
    var georssLayer = new google.maps.KmlLayer(url);
    georssLayer.setMap(map);
    return georssLayer;
}
