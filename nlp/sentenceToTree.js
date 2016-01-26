var LSU = require('./lsu.js');
var nlp_compromise = require("nlp_compromise");

var sentenceToTree = function(sentence) {
  //Split sentence into a list of words
  var taggedWords = nlp_compromise.text(sentence).terms().map(function(term){
    return [term, term.tag]
  });

  taggedWords = LSU.processWords(taggedWords);

  console.log(taggedWords);

  var results = LSU.parse(taggedWords);
  return results;
};

module.exports = sentenceToTree;
