const professionsMock = require('../mock/professions.json')
const qualitiesMock = require('../mock/qualities.json')
const Professions = require('../models/Profession')
const Quality = require('../models/Quality')

module.exports = async () => {
  const professions = await Professions.find()
  if (professions.length !== professionsMock.length) {
    await createInitialEntity(Professions, professionsMock)
  }

  const qualities = await Quality.find()
  if (qualities.length !== qualitiesMock.length) {
    await createInitialEntity(Quality, qualitiesMock)
  }
}

async function createInitialEntity(Model, data) {
  Model.collection.drop()
  return Promise.all(
    data.map(async item => {
      try {
        delete item._id
        const newItem = new Model(item)
        newItem.save()
        return newItem
      } catch (err) {
        return err
      }
    })
  )
}
