function CSpeciesSelector(containerID, showProjections) {
    var ss = this;
    var displayBlock = $(containerID + " .species_list");
    var geButton = $(containerID + " .ge_button");
    var googleImages = $(containerID + " .google_images");
    var imagePattern = googleImages.attr("href");
    var species = null;
    var textInput = $(containerID + " .search_input");
    var detail = new CSpeciesDetail(containerID);

    if (imagePattern == null) { imagePattern = ""; }
    var resultList = $(containerID + " .search_result");
    var resultContainer = $(containerID + " .search_result_container");
    googleImages.hide(false);

    this.AddSearchSpecies = function (index, s) {
        var div = document.createElement("div");
        div.species = s;
        div.className = 'r' + (index % 2).toString();
        $(div).html('<span class="n">' + s.name + '</span><span class="p">' + s.numPoints + '</span><span class="m">' + s.numModels + '</span>');
        $(div).click(function () {
          lifemapper.AddSpecies(div.species, showProjections);
        });
        resultList.append(div);
    }

    this.ProcessSpeciesSearch = function (speciesList, prefix) {
        if (prefix == $(textInput).val()) {
            resultList.html(""); 
            if (speciesList.Count() == 0) {
                if (prefix.length < 3) {
                    resultList.html("Type the first 3 letters");
                }
                else {
                    resultList.html("There are no matches");
                }
            }
            else {
                speciesList.each(ss.AddSearchSpecies);
            }
        }
    }

    tcm.AddTextInput(textInput, function () {
        var val = textInput.val();
        if (species != null) {
            lifemapper.RemoveSpecies(species);
        }
        if (val == textInput.title) { val = ""; }
        if ((val != null) && (val.length >= 3)) {
            db.SpeciesTable.Search(val, ss.ProcessSpeciesSearch);
        }
        else {
            ss.ProcessSpeciesSearch(new CSpeciesList(new Array()), val);
        }
    });

    this.AddSpecies = function (s) {
        tcm.SetValue(textInput, s.name);
        if ((species != null) && (species != s)) {
            lifemapper.RemoveSpecies(species);
            species = null;
        }
        geButton.attr("href", db.OccurrenceSetTable.KMLBySpecies(s));
        geButton.show(true, function () { geButton.show(false); });
        googleImages.attr("href", imagePattern.replace("[speciesname]", escape(s.name)));
        googleImages.show(true, function () { googleImages.show(false); });

        displayBlock.show(true, function () { displayBlock.show(false); });
        resultContainer.hide(true, function () { resultContainer.hide(false); });
        species = s;

        if (textInput.val() != s.name) {
            tcm.SetValue(textInput, s.name);
        }
    };

    this.RemoveSpecies = function (s) {
        if (species == s) {
		    if (textInput.val() == s.name)
			{
		      textInput.val("");
			}
            displayBlock.hide(true, function () { displayBlock.hide(false); });
            resultContainer.show(true, function () { resultContainer.show(false); });
            geButton.hide(false);
            googleImages.hide(false);
            species = null;
        }
    };
   this.HideSpecies = function(s){
	 //ss.RemoveSpecies(s);
   }

    this.ShowUserExperiment = function (e) {
        if (species != null) {
            ss.RemoveSpecies(species);
        }
    }

    resultList.html("Type the first 3 letters");
    lifemapper.InstallComponent(this);
}