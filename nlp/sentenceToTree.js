var LSU = require('./lsu.js');
var nlp_compromise = require("nlp_compromise");
var sentenceToTree = function(text) {
  //Split sentence into a list of words

    

  var taggedSentences = nlp_compromise.pos(text).sentences.map(function(sentence){
    return sentence.tokens.map(function(token){
      var pos = token.pos.parent
      if(pos == "glue") {
        pos = token.pos.tag;
      }
      return [token.text, pos];
    });
  });

  if(taggedSentences[0]) {
    taggedWords = LSU.processWords(taggedSentences[0]);
    var results = LSU.parse(taggedWords);
    return results;
  } else {
    return undefined;
  }

};

module.exports = sentenceToTree;
