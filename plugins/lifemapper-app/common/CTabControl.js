function CTabControl(prefix, f) {
    var control = this;
    this.afterSelect = f;
    if (prefix == null)
        prefix = "";
    if (prefix.length > 0)
        prefix += "-";
    var selectedTab = null;

    this.OpenPage = function (page) {
        var o = $("#" + page + "_tab");
        var e = o[0];
        if (selectedTab != null) {
            $(selectedTab).removeClass("selected");
            $(selectedTab).addClass("unselected");
            var t = selectedTab;
            t.tabPage.hide(true, function () { t.tabPage.hide(false); });
        }
        if (selectedTab == e) {
            selectedTab = null;
        }
        else {
            o.removeClass("unselected");
            o.addClass("selected");
            selectedTab = o[0];
            selectedTab.tabPage.show(true, function () { selectedTab.tabPage.show(false); });
        }
        if (control.afterSelect != null) {
            control.afterSelect();
        }
    }

    $("." + prefix + 'tab').each(function (i, e) {
        var o = $(e);
        var pageKey = e.id.substring(0, e.id.length - 4);
        e.tabPage = $("#" + pageKey + '_page');
        e.tabControl = control;
        o.click(function (e) {
            control.OpenPage(pageKey);
            e.stopPropagation();
            return false;
        });
    });
}