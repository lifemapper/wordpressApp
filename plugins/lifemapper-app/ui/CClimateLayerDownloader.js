function CClimateDataDownloader(downloadLink, dropDownList) {
    var id = null;
    var keepAlive = false;
    var dd = this;

    dropDownList.hide(false);
    downloadLink.hide(false);

    dropDownList.children("div").children("div").children("a").each(function (i, e) {
        e.urlTemplate = $(e).attr("href");
    });

    downloadLink.mouseenter(function () {
        if (id != null) {
            keepAlive = true;
            dropDownList.fadeIn(true);
        }
    });
    downloadLink.mouseleave(function () {
        keepAlive = false;
        window.setTimeout(function () { if (!keepAlive) { dropDownList.fadeOut(true); } }, 100);
    });
    dropDownList.mouseenter(function () { keepAlive = true; });
    dropDownList.mouseleave(function () {
        keepAlive = false;
        window.setTimeout(function () { if (!keepAlive) { dropDownList.fadeOut(true); } }, 100);
    });

    this.SetClimateLayer = function (cl) {
        if (cl == null) {
            id = null;
            species = null;
            downloadLink.hide(true, function () { downloadLink.hide(false); });
        }
        else {
            id = cl.id;
            downloadLink.show(true, function () { downloadLink.show(false); });
            dropDownList.children(".point").show(false);
            dropDownList.children("div.point").children("div").children("a").each(function (i, e) {
                e.href = e.urlTemplate.replace("[itemId]", id);
            });
        }
    }
}
