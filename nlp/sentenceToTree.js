var LSU = require('./lsu.js');
var pos = require('pos');
var nlp_compromise = require("nlp_compromise");

var sentenceToTree = function(sentence) {
  //Split sentence into a list of words
  var words = nlp_compromise.text(sentence).terms().map(function(term){
    return term.text
  });

  var taggedWords = new pos.Tagger().tag(words);
  taggedWords = LSU.processWords(taggedWords);

  console.log(taggedWords);

  var results = LSU.parse(taggedWords);
  return results;
};

module.exports = sentenceToTree;
