var displayList = new Array();

displayList[displayList.length] = { Code: "hadley_diff_a1f_x_CRU_CL_2.0".toLowerCase(), Value: "Hadley Centre, Scenario A1, 2050" };
displayList[displayList.length] = { Code: "hadley_diff_b1a_x_CRU_CL_2.0".toLowerCase(), Value: "Hadley Centre, Scenario B1, 2050" };
displayList[displayList.length] = { Code: "hadley_diff_a2c_x_CRU_CL_2.0".toLowerCase(), Value: "Hadley Centre, Scenario A2, 2050" };
displayList[displayList.length] = { Code: "NIES_A1B_1039".toLowerCase(), Value: "NIES, Scenario A1B, 2010-2039" };
displayList[displayList.length] = { Code: "NIES_A1B_4069".toLowerCase(), Value: "NIES, Scenario A1B, 2040-2069" };
displayList[displayList.length] = { Code: "NIES_A1B_7099".toLowerCase(), Value: "NIES, Scenario A1B, 2070-2099" };
displayList[displayList.length] = { Code: "NIES_A2_1039".toLowerCase(), Value: "NIES, Scenario A2, 2010-2039" };
displayList[displayList.length] = { Code: "NIES_A2_4069".toLowerCase(), Value: "NIES, Scenario A2, 2040-2069" };
displayList[displayList.length] = { Code: "NIES_A2_7099".toLowerCase(), Value: "NIES, Scenario A2, 2070-2099" };
displayList[displayList.length] = { Code: "NIES_B1_1039".toLowerCase(), Value: "NIES, Scenario B1, 2010-2039" };
displayList[displayList.length] = { Code: "NIES_B1_4069".toLowerCase(), Value: "NIES, Scenario B1, 2040-2069" };
displayList[displayList.length] = { Code: "NIES_B1_7099".toLowerCase(), Value: "NIES, Scenario B1, 2070-2099" };
displayList[displayList.length] = { Code: "CRU_CL_2.0_x_hadley_diff".toLowerCase(), Value: "CRU 2.0 climate baseline" };
displayList[displayList.length] = { Code: "CRU_CL_2.0".toLowerCase(), Value: "OCB: climate baseline" };
displayList[displayList.length] = { Code: "worldclim_1.4".toLowerCase(), Value: "Worldclim climate baseline" };

function getDisplay(code) {
    code = code.toLowerCase();
    for (var i = 0; i < displayList.length; i++) {
        if (code.indexOf(displayList[i].Code) >= 0) {
            return displayList[i].Value;
        }
    }
    return code;
}