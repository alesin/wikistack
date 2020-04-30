const Sequelize = require('sequelize');
const db = new Sequelize('postgres://localhost:5432/wikistack', {
  logging: false
});

const Page = db.define('pages', {
  title: {
    type: Sequelize.STRING,
    allowNull: false
  },
  slug: {
    type: Sequelize.STRING,
    allowNull: false
  },
  content: {
    type: Sequelize.TEXT,
    allowNull: false
  },
  status: {
    type: Sequelize.ENUM('open', 'closed'),
    //default:
  },
});

function slugGenerator (pageTitle) {
  return pageTitle.replace(/\s+/g, "_").replace(/\W/g, '')
}

Page.beforeValidate((pageInstance, optionsObject) => {
  pageInstance.slug = slugGenerator(pageInstance.title)
})

const User = db.define('users', {
  name: {
    type: Sequelize.STRING,
    allowNull: false,
    unique: true
  },
  email: {
    type: Sequelize.STRING,
    allowNull: false,
    unique: true,
    validate: {
      isEmail: true
    }
  },
});

module.exports = {
  db,
  Page,
  User
}
