function CSpeciesMapOverlay(bounds, image, map) {
    this._bounds = bounds;
    this._image = image;
    this._map = map;

    this._div = null;
    this.setMap(map);
}

CSpeciesMapOverlay.prototype = new google.maps.OverlayView();

CSpeciesMapOverlay.prototype.onAdd = function () {
    var div = document.createElement('DIV');
    div.style.border = "none";
    div.style.borderWidth = "0px";
    div.style.position = "absolute";
    var img = document.createElement('img');
    img.src = this._image;
    img.style.width = "100%";
    img.style.height = "100%";
    div.appendChild(img);
    this._div = div;
    var panes = this.getPanes();
    panes.overlayLayer.appendChild(div);
}

CSpeciesMapOverlay.prototype.draw = function () {
    var overlayProjection = this.getProjection();
    var sw = overlayProjection.fromLatLngToDivPixel(this._bounds.getSourthWest());
    var ne = overlayProjection.fromLatLngToDivPixel(this._bounds.getNorthEast());
    var div = this._div;
    div.style.left = sw.x.toString() + 'px';
    div.style.top = ne.y.toString() + 'px';
    div.style.width = (ne.x - sw.x).toString() + 'px';
    div.style.height = (sw.y - ne.y).toString() + 'px';

}

CSpeciesMapOverlay.prototype.onRemove = function () {
    this._div.parentNode.removeChild(this._div);
    this._div = null;
}
