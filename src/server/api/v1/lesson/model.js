const mongoose = require("mongoose");

const topics = ["greeting", "music", "animals", "furniture", "school"];
const lessonSchema = new mongoose.Schema({
  word: {
    type: String,
    lowercase: true,
  },
  description: String,
  image: String,
  topic: {
    type: String,
    enum: topics,
    required: true
  }
});

lessonSchema.method({
  transform() {
    const transformed = {};
    const fields = ["id", "word", "description", "image", "topic"];

    fields.forEach(field => {
      transformed[field] = this[field];
    });

    return transformed;
  }
});
lessonSchema.statics = {
  topics
};

module.exports = mongoose.model("Lesson", lessonSchema);
