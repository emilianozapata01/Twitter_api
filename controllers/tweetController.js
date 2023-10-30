const User = require("../models/User");
const Tweet = require("../models/Tweet");

// Display a listing of the resource.
async function index(req, res) {
  const latestTweets = await Tweet.find()
    .sort({ createdAt: req.query.order === "asc" ? -1 : 1 })
    .limit(req.query.limit);
  return res.json(latestTweets);
}

// Display the specified resource.
async function show(req, res) {}

// Show the form for creating a new resource
async function create(req, res) {}

// Store a newly created resource in storage.
async function store(req, res) {
  const tweet = await Tweet.create({
    content: req.body.content,
    user: req.auth.sub,
    likes: [],
  });

  const user = await User.findById(req.auth.sub);
  user.tweets.push(tweet._id);
  await user.save();

  return res.json(tweet);
}

// Show the form for editing the specified resource.
async function edit(req, res) {}

// Update the specified resource in storage.
async function update(req, res) {
  try {
    const tweet = await Tweet.findById(req.params.id);
    tweet.likes.includes(req.auth.sub) // includes _ metodo de mongoose
      ? tweet.likes.pull(req.auth.sub)
      : tweet.likes.push(req.auth.sub);

    await tweet.save();
    const likes = tweet.likes.length;
    return res.json(`likes <3: ${likes}`);
  } catch (error) {
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

    if (tweet.user.toString() !== userIdFromToken)
      return res.json({ error: "You are not the owner of this tweet" });

    const user = await User.findById(userIdFromToken);
    user.tweets.pull(tweetId);
    await user.save();

    await tweet.deleteOne();

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
