const Sequelize = require('sequelize')
const UserModel = require('../models/user')
const BikeModel = require('../models/bike')


const sequelize = new Sequelize('rent_bike', 'root', '', {
  host: 'localhost',
  dialect: 'mysql',
  pool: {
    max: 10,
    min: 0,
    acquire: 30000,
    idle: 10000
  }
})

const User = UserModel(sequelize, Sequelize)
// BlogTag will be our way of tracking relationship between Blog and Tag models
// each Blog can have multiple tags and each Tag can have multiple blogs
// const BlogTag = sequelize.define('blog_tag', {})
const Bike = BikeModel(sequelize, Sequelize)
// const Tag = TagModel(sequelize, Sequelize)

// Blog.belongsToMany(Tag, { through: BlogTag, unique: false })
// Tag.belongsToMany(Blog, { through: BlogTag, unique: false })
Bike.belongsTo(User);

sequelize.sync({ force: false })
  .then(() => {
    console.log(`Database & tables created!`)
  })

module.exports = {
  User,
  Bike,
}