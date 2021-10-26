const { Schema, model, SchemaTypes } = require("mongoose");
const { ValidInfoCat } = require("../config/constants");
const mongoosePaginate = require("mongoose-paginate-v2");

const catSchema = new Schema(
  {
    name: { type: String, required: [true, "Set name for cat"], unique: true },
    age: {
      type: Number,
      min: ValidInfoCat.MIN_AGE,
      max: ValidInfoCat.MAX_AGE,
      required: [true, "Set age for cat"],
    },
    isVaccinated: { type: Boolean, default: false },
    // createAt: { type: Date, default: Date.now() },
    features: { type: Array, set: (data) => (!data ? [] : data) },
    owner: {
      type: SchemaTypes.ObjectId,
      ref: "user",
    },
  },
  {
    versionKey: false,
    timestamps: true,
    toJSON: {
      virtuals: true,
      transform: function (doc, ret) {
        delete ret._id;
        // ret.name = `@${ret.name}`;
        return ret;
      },
    },
    toObject: { virtuals: true },
  }
);

catSchema.virtual("status").get(function () {
  if (this.age >= 10) {
    return "old";
  }
  return "young";
});

catSchema.path("name").validate(function (value) {
  const re = /[A-Z]\w+/;
  return re.test(String(value));
});

catSchema.plugin(mongoosePaginate);

const Cat = model("cat", catSchema);

module.exports = {
  Cat,
};
