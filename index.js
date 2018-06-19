$("#myform").submit(function(event){
   event.preventDefault();
   $('#results').html('');
   $('.frequent-phrases').html('');
   var text = $('textarea#textEntered').val();
   $('#results').append(text);
  frequentPhrases(text);  
});




function frequentPhrases(doc) {
    // break down document text into an array with using period, comma, questionmarks, exclamations marks as a delimiter.
    var brokenPhrases = doc.split(/[.!?,;]/)
    // phrase is a stretch of 3-10 words
    let phraseMin = 3;
    let phraseMax = 10;
    // totalPhraseLength = 8
    let totalPhraseLength = (phraseMax-phraseMin+1);
    let phraseObj= {};
    let newPhraseObj = {};
    // loop through array
    for (var i = 0; i < brokenPhrases.length; i++) {
        // make everything lower case to compare later on
        var lowerCasedBrokenPhrases = brokenPhrases[i].trim().toLowerCase();
        // breaking down each single phrase into an array of words for each phrase
        var brokenPhrasesWithNoSpaces = lowerCasedBrokenPhrases.split(/\s+/);
        // for loop which will then loop through total phrase length
        for (var j = 0; j < totalPhraseLength; j++) {
            let start = 0;
            let end = phraseMin + j;

            for (var k = 0; k < 
             brokenPhrasesWithNoSpaces.length; k++) {
                // repeat the phrase as many times as there are words in phrase array
                let phraseArr =  brokenPhrasesWithNoSpaces.slice(start, end);
                // join array together to create phrases
                var phrase = phraseArr.join(' ');
               
                if (phraseArr.length < (end - start)) {
                    break;
                }
                //increment start and end pointers
                start++;
                end++;
                
              if (typeof phraseObj[phrase] !== 'undefined') {
                  //update value for key in object
                    phraseObj[phrase] = parseInt(phraseObj[phrase] + 1);
                    continue;
                } else {
                    //if key doesnt have value set one 
                    phraseObj[phrase] = 1;
                }
                if (phraseArr.length ===  brokenPhrasesWithNoSpaces.length) {
                    break;
                }
            }
        }

    }
    // loop through keys in phraseObj
    Object.keys(phraseObj).forEach(phrase => {
      // assuming 1 is minimum value for each key we want everything above 1.
        if (phraseObj[phrase] > 1) {
          // anything greater than 1 will now be stored in seperate obj
             newPhraseObj[phrase] = phraseObj[phrase];
        }
    })
    // loop through keys in newPhraseObj
    Object.keys(newPhraseObj).forEach(phrase => {
        Object.keys(newPhraseObj).forEach(smallerPhrase => {
            var foundSmallerPhrase = phrase.match(smallerPhrase);
            if (foundSmallerPhrase !== null && phrase.length !== smallerPhrase.length) {
              // delete the smaller phrase key from the object if it exists
                delete newPhraseObj[smallerPhrase];
            }
        })
    })
    var results = Object.keys(newPhraseObj);

    printFrequentPhrases(newPhraseObj);
    highlightFrequentPhrases(newPhraseObj);
    //print results to console
    console.log(results);
}
//print method for listing phrases
function printFrequentPhrases(newPhraseObj){
  $('.frequent-phrases-container').css("visibility", "visible");
  $.each(newPhraseObj, function (key, value) {
  var search_regexp = new RegExp(key, "g");
   $('.frequent-phrases').append('<div>' + key + '</div>')
 });
}
// print method highlight phrases in original text
function highlightFrequentPhrases(newPhraseObj){
   $('.results-container').css("visibility", "visible");
 $.each(newPhraseObj, function (key, value) {
  var search_regexp = new RegExp(key, "g");
   $('#results').html($('#results').html().toLowerCase().replace(search_regexp,"<span class = 'highlight'>"+key+"</span>"));
 });
}
