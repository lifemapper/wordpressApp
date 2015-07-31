var _targetId = 0;
function COccurrenceSetUploader(containerID) {
    var uploader = this;
    var nameInput = $(containerID + " .upload_name");
    var epsgInput = $(containerID + " .epsg_code");
    var fileName = $(containerID + " .file_name");
    var myform = $(containerID + " form");
    var unknownFileType = $(containerID + " .unknown_file_type");
    var fileInput = $(containerID + " .file_input");
    this.uploadButton = $(containerID + " .upload-button");

    myform.attr("action", urlManager.getFileUploadUrl());

    var fileType = document.createElement("input");
    fileType.type = "hidden";
    fileType.name = "pointsType";
    fileType = $(fileType);
    myform.append(fileType);

    nameInput.each(function (i, o) { o.name = "displayName"; });
    epsgInput.each(function (i, o) { o.name = "epsgCode"; });

    var iframeTarget = document.createElement("iframe");
    iframeTarget.id = "ul" + (_targetId++).toString();
    myform.each(function (i, o) { o.target = iframeTarget.id; });
    iframeTarget.name = iframeTarget.id;
    iframeTarget = $(iframeTarget);
    iframeTarget.height(0);
    iframeTarget.width(0);

    $("body").append(iframeTarget);
    myform.target = iframeTarget.id;

    this.Clear = function () {
        nameInput.val("");
        epsgInput.val("4326");
        fileInput.val("");
        fileName.html("");
        fileType.val("");
    }

    iframeTarget.load(function () {
        Process($(iframeTarget[0].contentWindow.document.body).html());
    });

    fileInput.change(function () {
        var selectedFile = fileInput.val();
        selectedFile = uploader.getFileName(selectedFile);
        var selectedFileType = uploader.getFileType(selectedFile);
        if ((selectedFileType.length == 0) && (selectedFile.length > 0)) {
            unknownFileType.show(true, function () { unknownFileType.show(false); });
        }
        else {
            unknownFileType.hide(true, function () { unknownFileType.hide(false); });
        }
        fileType.val(selectedFileType);
        fileName.text(selectedFile);
        uploader.EnableButton();
    });

    this.EnableButton = function () {
        var errors = uploader.ValidInput();
        if (errors.length == 0) {
            uploader.uploadButton.removeAttr("disabled");
            uploader.uploadButton.attr("src", "./images/upload_button.png?v=3.9");
        }
        else {
            uploader.uploadButton.attr("disabled", "disabled");
            uploader.uploadButton.attr("src", "./images/upload_inactive.png?v=3.9");
        }
    }

    uploader.uploadButton.mouseenter(function () {
        if (uploader.uploadButton.attr("disabled") == null) {
            uploader.uploadButton.attr("src", "./images/upload_hover.png?v=3.9");
        }
    });
    uploader.uploadButton.mouseleave(function () {
        if (uploader.uploadButton.attr("disabled") == null) {
            uploader.uploadButton.attr("src", "./images/upload_button.png?v=3.9");
        }
    });

    this.ValidInput = function () {
        var errors = "";
        if (nameInput.val().length == 0) {
            errors += "Please include a name for the species data.<br/><br/>";
        }
        if (epsgInput.val().length == 0) {
            errors += "If an uploaded file does not require a specific EPSG the default 4326 should be used.<br/><br/>";
        }
        if (fileInput.val().length == 0) {
            errors += "Please select a file before attempting to upload.<br/><br/>";
        }
        return errors;
    }

    myform.submit(function (event) {
        var errors = uploader.ValidInput();
        if (errors.length == 0) {
            return true;
        }
        else {
            hm.ShowMessage(errors);
            return false;
        }
    });

    this.getFileName = function (path) {
        var i = path.replace("/", "\\").lastIndexOf("\\");
        return path.substring(i + 1, path.length);
    }
    this.getFileType = function (fileName) {
        var i = fileName.lastIndexOf(".");
        var fileType = fileName.substring(i + 1, fileName.length);
        switch (fileType.toLowerCase()) {
            case "csv":
                fileType = "CSV";
                break;
            case "xml":
                //fileType = "XML";
                fileType = ""; //we are temporarily not allowing XML files
                break;
            case "zip":
                fileType = "SHAPEFILE";
                break;
            default:
                fileType = "";
                break;
        }
        return fileType;
    }

    function Process(result) {
        if ((result != null) && (result.length > 0)) {
            var data = $.parseJSON(result);
            var occurrenceSet = "";
            if (data.title.indexOf('error') < 0) {
                var url = data.metadataUrl;
                if (url != null) {
                    var pos = url.indexOf('occurrences/');
                    if (pos > 0) {
                        occurrenceSet = url.substring(pos + 12, url.length);
                    }
                }
            }
            if (occurrenceSet.length == 0) {
                hm.ShowMessage("Failed to upload points.  Please check that the file type specified is correct.");
            }
            else {
                var o = new Object();
                o.occurrenceSet = occurrenceSet;
                o.datatype = "occurrenceset";
                lifemapper.AddOccurrenceSet(o);
            }
        }
    }
    tcm.AddTextInput(epsgInput, uploader.EnableButton);
    tcm.AddTextInput(nameInput, uploader.EnableButton);
}