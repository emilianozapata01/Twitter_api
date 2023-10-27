const User = require("../models/User");
const Tweet = require("../models/Tweet");
const { includes } = require("lodash");

// Display a listing of the resource.
async function index(req, res) {}

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
  const tweet = await Tweet.findById(req.params.id);
  if(tweet.likes.includes(req.auth.sub)){
    await Tweet.findByIdAndUpdate(req.params.id, {$pull:{likes:req.auth.sub}})
  }else{
    await Tweet.findByIdAndUpdate(req.params.id, {$push:{likes:req.auth.sub}})
  };
  const likes = tweet.likes.length();
  res.json(likes);
}

// Remove the specified resource from storage.
async function destroy(req, res) {}

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


