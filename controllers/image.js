const Clarifai = require ('clarifai');


const clarifyApp = new Clarifai.App({
  apiKey: process.env.API_CLARIFAI
});

const handleApiCall = (req,res) => {
  clarifyApp.models
    .predict(
      Clarifai.FACE_DETECT_MODEL, {
        url: req.body.input
    })
    .then( data => {
      res.json(data)
    })
    .catch(err => res.status(400).json('unable to work with api'))
}


const handleImage = (req,res, db)  => {
  const { id } = req.body;
  db('users').where('id', '=', id)
  .increment('entries', 1)
  .returning('entries')
  .then( entries => {
    res.json(entries[0]);
  })
  .catch(err => res.status(400).json('unable to get count'))
}

module.exports = {
  handleImage,
  handleApiCall
}