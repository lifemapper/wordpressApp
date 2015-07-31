function CSpeciesQueryString() {
    var m = this;

    this.LoadSpecies = function (s) {
        db.SpeciesTable.LoadSpecies(s, function (d) {
            if (s != null) {
                db.SpeciesTable.Search(d.title, function (sl) {
                    sl.each(function (i, sd) {
                        if (sd.name == d.title) {
                            lifemapper.AddSpecies(sd);
                            lifemapper.ShowSpecies(sd);
                        }
                    });
                });
            }
        });
    };
    this.LoadOccurrenceSet = function (o) {
        lifemapper.AddOccurrenceSet(o);
    };
    this.LoadExperiment = function (o, eid) {
        var e = new Object();
        e.id = eid;
        db.ExperimentTable.getExperimentDetail(o, e, function (data) {
            var a = data.detail.algorithm.code;
            var s = "32"; //data.detail.???;
            if (modelGenerator != null) {
                modelGenerator.Load(a, s, eid);
            }
        });
    };

    this.AddSpecies = function (s) {
        dqs.SetParameter("t", "s");
        dqs.SetParameter("oid", s.occurrenceSet);
    };

    this.RemoveSpecies = function (s) {
        dqs.SetParameter("t", null);
        dqs.SetParameter("oid", null);
    };

    this.RemoveOccurrenceSet = function (o) {
        dqs.SetParameter("t", null);
        dqs.SetParameter("oid", null);
    };

    this.AddOccurrenceSet = function (o) {
        dqs.SetParameter("t", "o");
        dqs.SetParameter("oid", o.occurrenceSet);
    };
    this.ClearData = dqs.Clear;
    lifemapper.InstallComponent(this);
    var t = dqs.getParameter("t");
    switch (t) {
        case "s":
            m.LoadSpecies(dqs.getParameter("oid"));
            break;
        case "o":
            m.LoadOccurrenceSet(dqs.getParameter("oid"));
            break;
        case "e":
            //TODO: Revisit this
            //m.LoadExperiment(dqs.getParameter("eid"));
            break;
    }
    /*
    var eid = dqs.getParameter("eid");
    if ((eid != null) && (eid.length > 0)) {
        m.LoadExperiment(eid);
    }
    */
}