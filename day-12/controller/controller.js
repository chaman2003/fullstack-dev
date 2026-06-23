export const userName = (req, res) => {
  const username = req.params.username;
  res.send(`Welcome ${username}`);
}

export const searchQuery = (req, res) => {
  const key = req.query.key;
  res.send(`Searching for ${key}`);
};

export const login =(req,res)=>{
  res.send("You are logged in")
}

export const signup =(req,res)=>{
  res.send("You are signup in")
}
