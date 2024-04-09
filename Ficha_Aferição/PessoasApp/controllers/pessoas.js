var Pessoa = require("../models/pessoas")

module.exports.list = () => {
    return Pessoa
        .find()
        .sort()
        .exec()
}

module.exports.listOne = (id) => {
    return Pessoa
        .findOne({_id : id})
        .exec()
}

module.exports.insert = (pessoa) => {
    var newPessoa = new Pessoa(pessoa)
    return newPessoa.save()
}

module.exports.update = (id, pessoa) => {
    return Pessoa
        .findByIdAndUpdate(id, pessoa, {new : true})
        .exec()
}

module.exports.remove = id => {
    return Pessoa.findByIdAndDelete(id).exec()
}

module.exports.listModalidades = () => {
    return Pessoa
        .distinct("desportos")
        .exec()
}

module.exports.listModalidade = (modalidade) => {
    return Pessoa
        .find({desportos: modalidade})
        .sort({nome : 1})
        .exec()
}