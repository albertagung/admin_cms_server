const mongoose = require('mongoose')
const Schema = mongoose.Schema

const postSchema = Schema(
  {
    title: String,
    content: String,
    sectionTitle: {type: String, default: 'section_title'},
    section: {type: String, default: 'post'},
    sectionName: {type: String, default: 'section_name'},
    createdAt: Date,
    updatedAt: {
      type: Date,
      default: Date.now
    },
    author: {
      type: String,
      default: 'Default'
    }
  }
)

let Post = mongoose.model('Post', postSchema)
module.exports = Post
