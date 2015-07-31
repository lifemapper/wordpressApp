var dqs = new CDynamicQueryString();
function CDynamicQueryString() {
    var parameters = new Array();
    var baseURL = "";
    var currentLocation = window.location.toString();

    function Initialize() {
        var parts = window.location.toString().split("#");
        baseURL = parts[0];
        var values = null;
        if (parts.length > 1) {
            parts = parts[1].split(";");
            for (var i = 0; i < parts.length; i++) {
                values = parts[i].split(":");
                if (values.length > 1) {
                    parameters[parameters.length] = { Name: values[0], Value: unescape(values[1]) };
                }
            }
        }
    }

    this.Clear = function () {
        window.location = baseURL;
    }

    this.getParameter = function (parameterName) {
        var p = null;
        for (var i = 0; i < parameters.length; i++) {
            p = parameters[i];
            if (p.Name == parameterName) {
                return p.Value;
            }
        }
        return null;
    }

    this.SetParameter = function (parameterName, value) {
        if (value != null) {
            value = value.toString();
        }
        var loc = baseURL + "#";
        var found = false;
        var p = null;
        for (var i = 0; i < parameters.length; i++) {
            p = parameters[i];
            if (p.Name == parameterName) {
                p.Value = value;
                found = true;
            }
            if (p.Value != null) {
                loc += p.Name + ":" + escape(p.Value) + ";";
            }
        }
        if (!found) {
            parameters[parameters.length] = { Name: parameterName, Value: value };
            if (value != null) {
                loc += parameterName + ":" + value + ";";
            }
        }
        if (currentLocation != loc) {
            currentLocation = loc;
            UpdateLocation(loc);
        }
    }
    Initialize();
}

var locationVersion = 0;
function UpdateLocation(l) {
    var v = ++locationVersion;
    window.setTimeout(function () {
        if (v == locationVersion) {
            window.location = l;
        }
    }, 100);
}