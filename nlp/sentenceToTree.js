var LSU = require('./lsu.js');
var pos = require('pos');
var natural = require('natural');

var tokenizer = new natural.TreebankWordTokenizer();

var sentenceToTree = function(sentence) {
  var words = tokenizer.tokenize(sentence);
  var taggedWords = new pos.Tagger().tag(words);
  taggedWords = LSU.processWords(taggedWords);

  console.log(taggedWords);

  var results = LSU.parse(taggedWords);
  return results;
};

module.exports = sentenceToTree;
