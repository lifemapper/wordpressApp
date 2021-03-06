﻿function CSpeciesMapLayer(d, canvas, map) {
    var layer = this;
    this.data = d;
    this.canvas = canvas;
    this.map = map;
    this.overlayList = new Array();
    this.kmlLayer = null;
    this.visible = true;

    this.clear = function () {
        $(layer.overlayList).each(function (i, o) { o.setMap(null); });
        if (layer.kmlLayer != null) {
            layer.kmlLayer.setMap(null);
        }
        layer.overlayList = new Array();
    }

    this.hide = function () {
        layer.visible = false;
        $(layer.overlayList).each(function (i, o) { o.setMap(null); });
        if (layer.kmlLayer != null) {
            layer.kmlLayer.setMap(null);
        }
    }

    this.show = function () {
        layer.visible = true;
        if (layer.kmlLayer != null) {
            layer.kmlLayer.setMap(layer.map);
        }
        //layer.Update();
    }

    // CJG - 03/30/2015 - Updated url to reflect new OGC urls
    function getOverlayURL(occurrenceSet, l, r, b, t, h, w) {
        var overlayurl = lmConstants.webServicesRoot + 'services/sdm/occurrences/' +
                                     occurrenceSet +
                                     'ogc?layers=occ_' +
                                     occurrenceSet +
                                     '&request=GetMap&service=WMS&version=1.1.0&bbox=' +
                                     l.toString() + ',' +
                                     b.toString() + ',' +
                                     r.toString() + ',' +
                                     t.toString() +
                                     '&srs=epsg:4326&format=image/png&width=' +
                                     w.toString() +
                                     '&height=' +
                                     h.toString() +
                                     '&styles=&color=ff7f00';
        return overlayurl;
    }

    this.ImageMapUpdate = function () {
        if (layer.visible) {

            layer.clear();

            var imageBounds = layer.map.getBounds();
            var sw = null;
            var ne = null;

            if (imageBounds != null) {
                var c = layer.canvas;
                sw = imageBounds.getSouthWest();
                ne = imageBounds.getNorthEast();
                var overlayurl = null;

                var r = ne.lng();
                var l = sw.lng();
                var b = sw.lat();
                var t = ne.lat();
                var overlay = null;
                var occurrenceSet = layer.data.occurrenceSet;
                if (layer.canvas.width() > (256 * Math.pow(2, layer.map.zoom))) {
                    var h = 256 * Math.pow(2, map.zoom);
                    var w = h;

                    overlayurl = getOverlayURL(occurrenceSet, -180, 180, -90, 90, h, w);

                    var count = 1;
                    left = (Math.floor(count / 2) * -360) + 180;

                    for (var i = 0; i < count; i++) {
                        sw = new google.maps.LatLng(-90, left, true);
                        ne = new google.maps.LatLng(90, left + 360, true);

                        imageBounds = new google.maps.LatLngBounds(sw, ne);
                        overlay = new google.maps.GroundOverlay(overlayurl, imageBounds);
                        layer.overlayList[layer.overlayList.length] = overlay;
                        overlay.setMap(layer.map);
                        left += 360;
                    }

                }
                else if (l > r) {
                    var w1 = 180 - l;
                    var w2 = r + 180;
                    var wt = w1 + w2;

                    w = (w1 / wt) * c.width();

                    var ib1 = new google.maps.LatLngBounds(sw, new google.maps.LatLng(ne.lat(), 180, true));

                    overlayurl = getOverlayURL(occurrenceSet, sw.lng(), 180, b, t, c.height(), w);
                    overlay = new google.maps.GroundOverlay(overlayurl, ib1);
                    overlay.setMap(layer.map);
                    layer.overlayList[layer.overlayList.length] = overlay;

                    w = (w2 / wt) * c.width();

                    var ib2 = new google.maps.LatLngBounds(new google.maps.LatLng(sw.lat(), -180), ne, true);
                    overlayurl = getOverlayURL(occurrenceSet, -180, ne.lng(), b, t, c.height(), w);
                    overlay = new google.maps.GroundOverlay(overlayurl, ib2);
                    overlay.setMap(layer.map);
                    layer.overlayList[layer.overlayList.length] = overlay;
                }
                else {
                    overlayurl = getOverlayURL(occurrenceSet, l, r, b, t, c.height(), c.width());
                    overlay = new google.maps.GroundOverlay(overlayurl, imageBounds);
                    overlay.setMap(layer.map);
                    layer.overlayList[layer.overlayList.length] = overlay;
                }
            }
        }
    }
    this.AddKML = function () {
        if (layer.visible) {
            layer.clear();
            var url = urlManager.getSpeciesKMLUrl(layer.data.occurrenceSet);
            layer.kmlLayer = new google.maps.KmlLayer(url);
            layer.kmlLayer.setMap(layer.map);
        }
    }

    layer.Update = function () { };
    this.AddKML();
}

