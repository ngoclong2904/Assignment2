const Orchids = require('../model/orchids')

let colorData = [
    { "id": "1", "name": "Blue" },
    { "id": "2", "name": "Red" },
    { "id": "3", "name": "Green" },
    { "id": "4", "name": "Yellow" },
    { "id": "5", "name": "White" },
    { "id": "6", "name": "Orange" },
    { "id": "7", "name": "Pink" },
]

class OrchidsController {
    index(req, res, next) {
        Orchids.find({})
            .then((orchids) => {
                res.render('orchids', {
                    title: 'List of Orchids',
                    orchids: orchids,
                    colorList: colorData,
                    errorMess: "",
                });
            }).catch(next);
    }

    create(req, res, next) {
        const orchids = new Orchids(req.body);
        Orchids.find({ name: orchids.name })
            .then((orchids) => {
                if (orchids) {
                    console.log("Dup:");
                    return res.redirect("/orchids");
                }
            })
            .catch(next);
        console.log("Orchids", orchids.isNatural);
        if (orchids.isNatural == undefined) {
            console.log("abc");
            orchids.isNatural = false;
        }
        orchids
            .save()
            .then(() => res.redirect("/orchids"))
            .catch((error) => { });
    }

    formEdit(req, res, next) {
        const orchidId = req.params.orchidId;
        Orchids.findById(orchidId)
            .then((orchids) => {
                res.render('editOrchid', {
                    title: 'The detail of Orchid',
                    orchids: orchids,
                    colorList: colorData,
                });
            })
            .catch(next);
    }

    edit(req, res, next) {
        if (req.body.isNatural == undefined) {
            req.body.isNatural = false;
        }
        Orchids.updateOne({ _id: req.params.orchidId }, req.body)
            .then(() => {
                debugger;
                res.redirect('/orchids')
            })
            .catch((err) => {
                console.log(req.body);
                res.render('editOrchid', {
                    title: 'Orchids list of Orchids',
                    orchids: req.body,
                    colorList: colorData,
                });
            })
    }

    delete(req, res, next) {
        Orchids.deleteOne({ _id: req.params.orchidId }, req.body)
            .then(() => {
                res.redirect('/orchids')
            })
            .catch(next)
    }
}
module.exports = new OrchidsController;