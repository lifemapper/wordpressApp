function CDropDownMenu(selector, container) {
    this.button = $(selector);
    this.dropDownList = $(container);
    this.keepAlive = false;
    var dd = this;
    this.button.mouseenter(function () {
        dd.keepAlive = true;
        dd.dropDownList.show(true, function () { dd.dropDownList.show(false); });
    });
    this.button.mouseleave(function () {
        dd.keepAlive = false;
        window.setTimeout(function () { if (!dd.keepAlive) { dd.dropDownList.hide(true, function () { dd.dropDownList.hide(false); }); } }, 100);
    });
    dd.dropDownList.mouseenter(function () { dd.keepAlive = true; });
    dd.dropDownList.mouseleave(function () {
        dd.keepAlive = false;
        window.setTimeout(function () { if (!dd.keepAlive) { dd.dropDownList.hide(true, function () { dd.dropDownList.hide(false); }); } }, 100);
    });
}
