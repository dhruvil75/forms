const express = require('express');
const router = express.Router();
const FormSchema = require('../models/form.model');

//Adding a form
router.post('/form', (req, res)=>{
  console.log(req.body);
  const form = new FormSchema(req.body);
  form.save(err => {
    err && console.log(err);
    console.log(form);
    res.send(form);

  })
});

//Get All Form
router.get('/forms', (req, res) => {
  FormSchema.find({}).then(forms=>{
    res.status(200).send(forms)
  }).catch(err => {
    console.log(err);
  })
})

//Get Single Form
router.get('/form/:formId/', (req, res)=>{
  FormSchema.findById(req.params.formId).then(formObj => {
    res.send(formObj);
  })
})

//Delete Single Form
router.delete('/form/:formId/', (req, res)=>{
  FormSchema.findByIdAndDelete(req.params.formId).then(formObj => {
    res.sendStatus(200);
  })
})

//For Submission of Answers
router.post('/form/:formId/answers', (req, res)=>{
  FormSchema.findById(req.params.formId).then(formObj => {

    //adding to responses so that we dont have to calulate length everytime
    formObj.responses +=1;
    formObj.questions.forEach(question=>{
      if(!question.answers) {
        question.answers=[];
      }
      if(req.body[question._id]){
        question.answers.push(req.body[question._id]+"");
      } 
    })
    formObj.save()
      .then(result => {
        res.sendStatus(200);
      })
      .catch(err=> {
        res.sendStatus(500).json(err);
      })
    
  })
})

module.exports = router;
