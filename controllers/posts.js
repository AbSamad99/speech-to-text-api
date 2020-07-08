const handlePosts=(req,res,db) => {
  const{email,name}=req.body;
  db('data').where({
    email:email,
    name:name
  })
  .select('data')
  .returning('data')
  .then(data=>{
    res.json(data);
  })
  .catch(err => res.status(400).json('Unable to fetch logs'));
}

module.exports = {handlePosts:handlePosts};
