var d3 = require('d3');
var express = require('express');
var bodyParser = require('body-parser');
var fs = require('fs');
var sentenceToTree = require('./nlp/sentenceToTree.js');

var app = express();

var server = app.listen(3000, function () {
  console.log('app listening on 3000');
});

app.use(express.static('public'));
app.use(bodyParser());

app.get('/', function(req,res) {
  res.render('public/index.html');
});

app.post('/parse', function(req, res) {
  var sentence = req.body.sentence;
  console.log("------");
  console.log(sentenceToTree(sentence));
  console.log("------");
  res.json(sentenceToTree(sentence));
});

app.post('/feedback', function(req, res) {
  var sentence = req.body.sentence;
  var badRules = req.body.badRules;
  var headless = req.body.headlessWords;
  var data = "Sentence: " + sentence + "\n";
  if (badRules) {
    badRules.forEach(function(rule) {
      data += "Wrong rule: ";
      data += rule.word1.word + " (" + rule.word1.index + ") ";
      data += "| " + rule.rule + " ON | ";
      data += rule.word2.word + " (" + rule.word2.index + ")\n";
    });
  }
  if (headless) {
    headless.forEach(function (hlWord) {
      data += "Headless word: ";
      data += hlWord[0].word + " (" + hlWord[0].index + ") | Suggested head: ";
      data += hlWord[1] + "\n\n";
    });
  }
  fs.appendFile('public/feedback.txt', data, function (err) {
    if (err) throw err;
    console.log('Feedback appended!');
    res.send('Feedback appended!');
  });
});
