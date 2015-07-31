var _targetId = 0;
function COccurrenceSetUploader(containerID) {
    var uploader = this;
    var nameInput = $(containerID + " .upload_name");
    var myform = $(containerID + " form");
    var fileInput = $(containerID + " .file_input");
    var currentSpecies = null;

    myform.attr("action", urlManager.getFileUploadUrl());

    var fileType = document.createElement("input");
    fileType.type = "hidden";
    fileType.name = "pointsType";
    fileType = $(fileType);
    myform.append(fileType);

    var iframeTarget = document.createElement("iframe");
    iframeTarget.id = "ul" + (_targetId++).toString();
    myform.each(function (i, o) { o.target = iframeTarget.id; });
    iframeTarget.name = iframeTarget.id;
    iframeTarget = $(iframeTarget);
    iframeTarget.height(0);
    iframeTarget.width(0);

    $("body").append(iframeTarget);
    myform.target = iframeTarget.id;
  $(".upload-error-message-close").click(function(){
	$("#upload-error-message").dialog("close");
  });
  $(".upload-bad-file-message-close").click(function(){
	$("#upload-bad-file-message").dialog("close");
  });
  $(".upload-bad-file-message-help").click(function(){
	$("#upload-bad-file-message").dialog("close");
  });

    iframeTarget.load(function () {
        try
        {
		  var d = iframeTarget[0].contentWindow.document;
		  if (d.body == null)
		  {
			ProcessOccurrenceSet(ProcessXML(d));
		  }
		  else
		  {
            Process($(d.body).html());
		  }
        }
        catch (ex)
        {
		  myform[0].reset();
        }
    });

    fileInput.change(function () {
	  	if (currentSpecies != null)
		{
	      lifemapper.HideSpecies(currentSpecies);
		  currentSpecies = null;
		}
        var selectedFile = fileInput.val();
        selectedFile = uploader.getFileName(selectedFile);
        var selectedFileType = uploader.getFileType(selectedFile);
        if (selectedFileType.length == 0) {
		  $("#upload-error-message").dialog({height:100,width:300,dialogClass:"error-message-dialog"});
		  myform[0].reset();
        }
        else {
            fileType.val(selectedFileType);
            nameInput.val(selectedFile + getTimestamp());
            myform[0].submit();
		  
        }
    });
  this.AddSpecies = function(s){
	currentSpecies = s;
	myform[0].reset();
  }
    function padNumber(v, d)
    {
        var r = v.toString();
        while (r.length < d)
        {
            r = "0" + r;
        }
        return r;
    }
    function getTimestamp()
    {
        var d = new Date();
        return padNumber(d.getDate(), 2) + padNumber(d.getHours(), 2) + padNumber(d.getMinutes(), 2) + padNumber(d.getSeconds(), 2) + padNumber(d.getMilliseconds(), 3);
    }
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
	  this.ShowSpecies = this.AddSpecies;
		this.HideSpecies = function(s){
		  if (currentSpecies == s)
		  {
			currentSpecies = null;
		  }
		}

  function ProcessXML(xmlDoc)
  {
	var temp = null;
	try
	{
	  if (xmlDoc.getElementsByTagName("lm:response").length > 0)
	  {
		  temp = xmlDoc.getElementsByTagName("lm:response")[0].getElementsByTagName("lm:occurrence")[0].getElementsByTagName("lm:id")[0].childNodes[0].nodeValue;
	  }
	  else
	  {
		  temp = xmlDoc.getElementsByTagName("response")[0].getElementsByTagName("occurrence")[0].getElementsByTagName("id")[0].childNodes[0].nodeValue;
	  }
	}
	catch (e){}
	var retVal = "";
	for (var i=0;i<temp.length;i++)
	{
	  switch (temp[i])
	  {
		case '0':
		case '1':
		case '2':
		case '3':
		case '4':
		case '5':
		case '6':
		case '7':
		case '8':
		case '9':
		  retVal += temp[i];
	  }
	}
	return retVal;
  }
    function Process(result) {
        if ((result != null) && (result.length > 0)) {
          var occurrenceSet = "";
		  if (result.substring(0, 1) == "<")
		  {
			try
			{
			  var parser = null;
			  if (window.DOMParser)
			  {
				parser=new DOMParser();
				xmlDoc=parser.parseFromString(result,"text/xml");
			  }
			  else // Internet Explorer
			  {
				xmlDoc=new ActiveXObject("Microsoft.XMLDOM");
				xmlDoc.async=false;
				xmlDoc.loadXML(result); 
			  }			
			  occurrenceSet = ProcessXML(xmlDoc);
			}
			catch(e){}
		  }
		  if ((occurrenceSet == null) || (occurrenceSet.length == 0))
		  {
			
			var ipos = result.indexOf(",occ_");
			if (ipos > 0) 
			{
			  ipos += 5;
			  var istart = ipos;
			  ipos = result.indexOf("&", istart);
			  occurrenceSet = result.substring(istart, ipos);
			}
			if ((occurrenceSet == null) || (occurrenceSet.length == 0))
			{
			  try
			  {
				var data = $.parseJSON(result);
				if (data.title.indexOf('error') < 0) {
				  occurrenceSet = data.id;
				}
			  }
			  catch (e){}
			}
		  }
		  ProcessOccurrenceSet(occurrenceSet);
		}
    }
  function ProcessOccurrenceSet(occurrenceSet)
  {
	if (occurrenceSet.length == 0) {
	  $("#upload-bad-file-message").dialog({height:130,width:300,dialogClass:"error-message-dialog"});
	  myform[0].reset();
	}
	else {
	  var o = new Object();
	  o.occurrenceSet = occurrenceSet;
	  o.datatype = "occurrenceset";
	  lifemapper.AddOccurrenceSet(o);
	}
  }
    lifemapper.InstallComponent(this);
 
}