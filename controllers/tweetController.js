const User = require("../models/User");
const Tweet = require("../models/Tweet");
const { includes } = require("lodash");

// Display a listing of the resource.
async function index(req, res) {
  const tweet = await Tweet.find();
  res.json(tweet.slice(-20))
}

// Display the specified resource.
async function show(req, res) {}

// Show the form for creating a new resource
async function create(req, res) {}

// Store a newly created resource in storage.
async function store(req, res) {
  const tweet = new Tweet({
    content: req.body.content,
    user: req.auth.sub,
    likes: [],
  });
  await Tweet.create(tweet);

  const user = await User.findById(req.auth.sub);
  user.tweets.push(tweet);
  await user.save();

  res.json(tweet);
}

// Show the form for editing the specified resource.
async function edit(req, res) {}

// Update the specified resource in storage.
async function update(req, res) {
  try{
  const tweet = await Tweet.findById(req.params.id);
  if (tweet.likes.includes(req.auth.sub)) {
    await Tweet.findByIdAndUpdate(req.params.id, { $pull: { likes: req.auth.sub } });
  } else {
    await Tweet.findByIdAndUpdate(req.params.id, { $push: { likes: req.auth.sub } });
  }
  const likes = tweet.likes.length;
  res.json(`likes <3: ${likes}`);
}catch (error){
  console.error(error);
    return res.json({ error: "Error - Something went wrong, please try again later" });
}
}

// Remove the specified resource from storage.
async function destroy(req, res) {
  try {
    const tweetId = req.params.id;
    const userIdFromToken = req.auth.sub;
    const tweet = await Tweet.findById(tweetId);
    if (!tweet) {
      return res.json({ error: "Tweet not found" });
    }
    if (tweet.user.toString() !== userIdFromToken) {
      return res.json({ error: "You are not the owner of this tweet" });
    }
    await Tweet.findByIdAndDelete(tweetId);
    return res.json({ msg: "Tweet succesfully removed" });
  } catch (error) {
    console.error(error);
    return res.json({ error: "Error - Tweet not removed" });
  }
}

// Otros handlers...
// ...

module.exports = {
  index,
  show,
  create,
  store,
  edit,
  update,
  destroy,
};
