// untuk membuat id penulis/pengguna
const ObjectId = require("mongodb").ObjectId;

const reviews = [
  {
    comment:
      "Review. Lorem ipsum dolor sit amet consectetur adipisicing elit. Magni ipsa ducimus architecto explicabo id accusantium nihil exercitationem autem porro esse.",
    user: { _id: ObjectId(), name: "John Doe" },
  },
  {
    comment:
      "Review. Lorem ipsum dolor sit amet consectetur adipisicing elit. Magni ipsa ducimus architecto explicabo id accusantium nihil exercitationem autem porro esse.",
    user: { _id: ObjectId(), name: "John Doe" },
  },
  {
    comment:
      "Review. Lorem ipsum dolor sit amet consectetur adipisicing elit. Magni ipsa ducimus architecto explicabo id accusantium nihil exercitationem autem porro esse.",
    user: { _id: ObjectId(), name: "John Doe" },
  },
  {
    comment:
      "Review. Lorem ipsum dolor sit amet consectetur adipisicing elit. Magni ipsa ducimus architecto explicabo id accusantium nihil exercitationem autem porro esse.",
    user: { _id: ObjectId(), name: "John Doe" },
  },
  {
    comment:
      "Review. Lorem ipsum dolor sit amet consectetur adipisicing elit. Magni ipsa ducimus architecto explicabo id accusantium nihil exercitationem autem porro esse.",
    user: { _id: ObjectId(), name: "John Doe" },
  },
];

module.exports = reviews;
