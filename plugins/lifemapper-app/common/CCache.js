var cacheManager = new CCacheManager();
function CCacheManager() {
    this._cache = new Object();

    this.GetCache = function (dataType, key) {
        var retVal = null;
        try {
            eval('retVal = this._cache.' + dataType + "_" + getAttributeName(key) + ';');
        }
        catch (e) { }
        return retVal;
    }
    this.SetCache = function (dataType, key, val) {
        try {
            eval('this._cache.' + dataType + "_" + getAttributeName(key) + '=val;');
        }
        catch (ex) {
        }
    }
}
