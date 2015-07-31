function CSpeciesDetail(containerID) {
  var dv = this;
  var speciesList = $(containerID + " .species_list");
  var rootList = new Array();
  var helpDialog = new CDialog("#existing-models-message", { width: 550, height: 600, dialogClass: "help-dialog" });
  var species = null;
  var modelsLoaded = false;
  var pointsCheckbox = $(containerID + " .show_points");
  var selectedProjection = null;
  var selectedProjectionInput = null;
  var modelCheckbox = null;
  var showProjections = null;
 
  this.AddSpecies = function (d, sp) {
	showProjections = sp;
    if (species != null) {
      dv.RemoveSpecies(species);
    }
    species = d;
    modelsLoaded = false;
    $(speciesList).children(".title").show(false);
    var div = document.createElement('div');
    var display = d.numPoints.toString() + " Distribution Points";
    var jdiv = $(div);
    var nameSpan = document.createElement('span');
	pointsCheckbox.off('change');
	pointsCheckbox.attr('checked', 'checked');
    pointsCheckbox.change(function () {
      if (pointsCheckbox[0].checked) {
        lifemapper.ShowSpecies(d);
      }
      else {
        lifemapper.HideSpecies(d);
      }
    });

    $(nameSpan).addClass("n");
    $(nameSpan).text(display);

    var nameDiv = document.createElement('div');
    $(nameDiv).append(nameSpan);

    jdiv.append(nameDiv);

    div.data = d;
    div.experimentList = new Array();
    speciesList.append(div);

    rootList[rootList.length] = div;
  }

  function createExperimentDetail(o, div) {
    var jdiv = $(div);
    var titleDiv = $(document.createElement("div"));
    titleDiv.addClass("existing-model-label-container");
    var modelTitle = $(document.createElement('h4'));
    var helpImg = document.createElement("img");
    helpImg.id = "existing-models-button";
    helpImg.src = lmConstants.pluginDir + "images/help_button.png?v=3.9";
    helpImg.alt = "help text";
    $(helpImg).addClass("existing-models-help");
    $(helpImg).click(helpDialogGroup.CreateOpener(helpDialog));
	modelCheckbox = $(document.createElement("input"));
	modelCheckbox.attr('type', 'checkbox');
	modelCheckbox.attr('disabled', 'disabled');
	modelCheckbox.change(function(){
      var enabledClass = "enable-models"
      if (modelCheckbox.attr('checked') != null)
      {
        jdiv.addClass(enabledClass);
      }
      else
      {
        if (dv.selectedProjection != null) {
          $(dv.selectedProjectionInput).removeAttr('checked');
          lifemapper.HideProjection(dv.selectedProjection);
        }
        jdiv.removeClass(enabledClass);
      }
	});
	modelTitle.append(modelCheckbox);
	modelTitle.append(" Models");
    titleDiv.append(modelTitle);
    titleDiv.append(helpImg);

    jdiv.append(titleDiv);
  }

  this.RemoveSpecies = function (d) {
	selectedProjection = null;
	selectedProjectionInput = null;
    var i = 0;
    var l = rootList;
    while ((i < l.length) && (l[i].data != d)) {
      i++;
    }
    if (i < l.length) {
      var div = l[i];
      $(div).remove();

      //remove experiments
      var el = div.experimentList;
      var pl = null;
      for (var j = 0; j < el.length; j++) {
        lifemapper.RemoveExperiment(el[j].experiment);
        pl = el[j].projectionList;
        for (var k = 0; k < pl.length; k++) {
          lifemapper.RemoveProjection(pl[k].projection);
        }
      }

      i++;
      while (i < l.length) {
        l[i - 1] = l[i];
        i++;
      }
      l.length -= 1;
    }
  }

  this.AddExperiment = function (o, e) {
    for (var i = 0; i < rootList.length; i++) {
      if (rootList[i].data == o) {
        if (!modelsLoaded) {
          createExperimentDetail(o, rootList[i]);
          modelsLoaded = true;
        }
        var div = document.createElement('div');
		var msgdiv = document.createElement('div');
        $(div).addClass("algorithm-detail");
        var span = document.createElement('span');
        $(span).addClass("model-name");
        var label = document.createElement("label");
        var pdiv = document.createElement('div');
        div.projectionList = new Array();
        $(label).text("Algorithm: ");
        $(div).append(label);
        $(div).append(span);

        $(span).text("loading...");
        $(div).append(pdiv);
        $(pdiv).addClass("projection-list");
		$(pdiv).hide(false);
		$(div).append(msgdiv);
        div.data = o;
        div.experiment = e;
        div.span = span;
        div.pdiv = pdiv;
		div.message = msgdiv;
        var l = rootList[i].experimentList;
        l[l.length] = div;
        $(rootList[i]).append(div);
      }
    }
  }

  this.UpdateExperiment = function (o, e, p, status, lastUpdated, projectionList) {
    if (e.detail != null) {
      var d = findExperimentDiv(e);
      if (d != null) {
        if (p == null) {
          $(d.span).text(e.detail.algorithm.code);
		  var hasRemaining = false;
		  var hasOne = false;
          var msg = "";
		  for (var i=0;i<projectionList.length;i++)
		  {
			p = projectionList[i];
			if (p.status == "300")
			{
			  hasOne = true;
			}
			else
			{
			  hasRemaining = true;
			}
		  }
		  if (hasOne)
		  {
			$(d.pdiv).show(false);
		  }
		  if (hasRemaining)
		  {
			if (hasOne)
			{
			  msg = "";
			}
			else
			{
              msg = "Currently Processing";
			}
		  }
		  $(d.message).html(msg);
		}
      }
    }
  }

  function findExperimentDiv(e) {
    var o = null;
    var d = null;
    var l = null;
    for (var i = 0; i < rootList.length; i++) {
      o = rootList[i].data;
      l = rootList[i].experimentList;
      for (var j = 0; j < l.length; j++) {
        d = l[j];
        if (d.experiment.id == e.id) {
          return d;
        }
      }
    }
    return null;
  }
  function findProjection(d, p)
  {
	if (d.projectionList == null)
	{
	  d.projectionList = new Array();
	}
	var mp = null;
	for (var i=0;i<d.projectionList.length;i++)
	{
	  mp = d.projectionList[i];
	  if (mp.id == p.id)
	  {
		return mp;
	  }
	}
	d.projectionList[d.projectionList.length] = p;
	return null;
  }
  
  this.AddProjection = function (o, e, p) {
    if (p.status == 300) {
      var pdiv = null;
      var namespan = null;
      var checkbox = null;
      var d = findExperimentDiv(e);
      if (d != null) {
		if (findProjection(d, p) == null)
		{
		  pdiv = document.createElement('div');
		  checkbox = document.createElement('input');
		  checkbox.type = 'radio';
		  checkbox.name = 'prj';
		  $(checkbox).change(function () {
			if (checkbox.checked) {
			  if (dv.selectedProjection != null) {
				lifemapper.HideProjection(dv.selectedProjection);
			  }
			  dv.selectedProjectionInput = checkbox;
			  dv.selectedProjection = p;
			  lifemapper.ShowProjection(p);
			}
			else {
			  lifemapper.HideProjection(p);
			}
		  });
		  if (selectedProjection == null)
		  {
			modelCheckbox.attr("checked", "checked");
			modelCheckbox.removeAttr('disabled', 'disabled');
			modelCheckbox.change();
			if (showProjections)
			{
			  selectedProjection = p;
			  $(checkbox).attr("checked", "checked");
			  $(checkbox).change();
			}
		  }
		  namespan = document.createElement('span');
		  d.projectionList[d.projectionList.length] = pdiv;
		  pdiv.projection = p;
		  $(pdiv).append(checkbox);
		  $(pdiv).append(namespan);
		  $(namespan).text(getDisplay(p.description));
		  $(d.pdiv).append(pdiv);
		}
      }
    }
  }
  lifemapper.InstallComponent(this);
}
