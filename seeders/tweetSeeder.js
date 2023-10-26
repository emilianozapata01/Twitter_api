const { fakerES: faker } = require("@faker-js/faker");
const Tweet = require("../models/Tweet");
const User = require("../models/User");
const _ = require("lodash");
const tweets = [];

module.exports = async () => {
  const users = await User.find();
  for (let user of users) {
    for (let j = 0; j < _.random(1, 5); j++) {
      const tweet = new Tweet({
        content: faker.lorem.paragraph(),
        user: user,
        date: faker.date.anytime(),
        likes: [],
      });
      tweets.push(tweet);
      user.tweets.push(tweet);
      await user.save();
      console.log(tweet.user);
    }
  }
  await Tweet.insertMany(tweets);
};
