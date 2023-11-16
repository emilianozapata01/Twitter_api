const User = require("../models/User");
const formidable = require("formidable");
const bcrypt = require("bcryptjs");
const jwt = require("jsonwebtoken");

// Display a listing of the resource.
async function index(req, res) {}

// Display the specified resource.
async function show(req, res) {}

// Show the form for creating a new resource
async function create(req, res) {}

// Store a newly created resource in storage.
async function store(req, res) {
  const form = formidable({
    multiples: true,
    uploadDir: __dirname + "/../public/img",
    keepExtensions: true,
  });

  form.parse(req, async (err, fields, files) => {
    if (err) return res.json(err);
    const hashedPassword = await bcrypt.hash(fields.password, 10);
    const newUser = await User.create({
      firstname: fields.firstname,
      lastname: fields.lastname,
      username: fields.username,
      email: fields.email,
      password: hashedPassword,
      description: fields.description,
      pfp: files.pfp.newFilename,
      tweets: [],
    });
    
    const user = await User.findOne({ email: fields.email });
    if (!user) return res.json({ msg: "Wrong credentials..." });
  
    const verifyPassword = await bcrypt.compare(fields.password, user.password);
    if (!verifyPassword) return res.json({ msg: "Wrong credentials..." });
  
    const token = jwt.sign({ sub: user.id }, process.env.JWT_SECRET);
    const { firstname, lastname, email, pfp, username, _id } = user;
    return res.json({ token, firstname, lastname, email, pfp, username, id: _id });
    
  });
}

// Show the form for editing the specified resource.
async function edit(req, res) {}

// Update the specified resource in storage.
async function update(req, res) {}

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
