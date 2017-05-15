'use strict'
// Recipes-model.js - A mongoose model
//
// See http://mongoosejs.com/docs/models.html
// for more of what you can do here.
module.exports = function (app) {
  const mongooseClient = app.get('mongooseClient');

  const Schema = mongooseClient.Schema;

  const ingredientSchema = new Schema({
    amount: { type: String, required: false },
    name: { type: String, required: true },
    optional: { type: Boolean, required: true, default: false }
  });

  const cookingStepSchema = new Schema({
    cookingTime: { type: Number, required: false }, // in minutes
    title: { type: String, required: false },
    description: { type: String, required: true }
  });

  const userSchema = new Schema({
    userId: { type: Schema.Types.ObjectId, ref: 'user' },
    name: { type: String, required: true }
  });

  const recipeSchema = new Schema({
    title: { type: String, required: true },
    summary: { type: String, required: true },
    photo: { type: String, required: true },
    vegan: { type: Boolean, required: true, 'default': false },
    vegetarian: { type: Boolean, required: true, 'default': false },
    pescatarian: { type: Boolean, required: true, 'default': false },
    cookingTime: { type: Number, required: false }, // in minutes
    ingredients: [ingredientSchema],
    cookingSteps: [cookingStepSchema],
    likedBy: [ userSchema ],
    authorId: { type: Schema.Types.ObjectId, ref: 'user' },
    createdAt: { type: Date, 'default': Date.now },
    updatedAt: { type: Date, 'default': Date.now }
  });



  return mongooseClient.model('recipes', recipeSchema);
};
