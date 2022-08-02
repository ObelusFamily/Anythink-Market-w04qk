var mongoose = require("mongoose");
var User = require("../models/User");
var Item = require("../models/Item");
var Comment = require("../models/Comment");
var Faker = require("@faker-js/faker");

(async () => {
  try {
    console.log("Seeding database...");
    await mongoose.connect(process.env.MONGODB_URI);
    let proms = [];
    for (let i = 0; i < 100; i++) {
      proms.push(createRandomUserAndProduct());
    }
    await Promise.all(proms);
    console.log("Seeding database FINISHED");
    process.exit(0);
  } catch (e) {
    console.log(e);
    process.exit(1);
  }
})();

async function createRandomUserAndProduct() {
  let USER = new User();
  let ITEM = new Item();
  let COMMENT = new Comment();
  let username = Faker.faker.internet.userName();
  USER.username = username.replace(/[^a-zA-Z ]/g, "").toLowerCase();
  USER.email = Faker.faker.internet.email();
  USER.setPassword - Faker.faker.internet.password();
  await USER.save();

  ITEM.title = Faker.faker.commerce.productName().toLowerCase();
  ITEM.seller = USER;
  await ITEM.save();

  COMMENT.item = ITEM;
  COMMENT.seller = USER;
  COMMENT.body = Faker.faker.datatype.string(25);
  await COMMENT.save();

  ITEM.comments = ITEM.comments.concat([COMMENT]);
  await ITEM.save();
}
