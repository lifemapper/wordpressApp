var tcm = new CTextChangeMonitor();
function CTextChangeMonitor() {
    var tcm = this;
    var textInputList = new Array();
    var isWatching = false;
    function StartTimer() {
        window.setTimeout(Tick, 500);
    }
    function Tick() {
        $(textInputList).each(function (i, d) {
            var myval = $(d).val();
            if (d.hinttext == myval) {
                myval = "";
            }
            if (myval != d.lastValue) {
                d.lastValue = myval;
                d.changeHandler(d);
            }
        });
        StartTimer();
    }
    this.AddTextInput = function (textInput, changeHandler) {
        textInput.changeHandler = changeHandler;
        textInput.lastValue = $(textInput).val();
        textInput.hinttext = textInput.attr("title");
        if (textInput.lastValue == textInput.hinttext) {
            textInput.lastValue = "";
        }
        textInputList[textInputList.length] = textInput;
        if (!isWatching) {
            StartTimer();
        }
    }
    this.SetValue = function (textInput, value) {
        textInput.lastValue = value;
        textInput.val(value);
        if (textInput[0].hinttext == value) {
            textInput.addClass("hinted");
        }
        else {
            textInput.removeClass("hinted");
        }
    }
}
