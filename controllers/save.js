const handleSave=(req,res,db) => {
  const{email,name,text}=req.body;
  db('data').insert({
    name:name,
    email:email,
    data:text
  })
  .returning('*')
  .then(data=>res.json(data))
  .catch(err => res.status(400).json('Unable to save log'));
};

const updateCount=(req, res, db) => {
  const {
    id
  } = req.body;
  db('users')
    .where('id','=',id)
    .increment('entries',1)
    .returning('entries')
    .then(entries=>res.json(entries[0]))
    .catch(err=>res.status(400).json('Unable to update count'));
};

module.exports = {
  handleSave:handleSave,
  updateCount:updateCount
};
