# Frequent-Phrases
Live [Demo](https://dikshasach.github.io/Frequent-Phrases/)    
## Instructions    
Given a string representing a document, write a function which returns the top 10 most frequent repeated phrases.    
A phrase is a stretch of three to ten consecutive words and cannot span sentences.     
Only include a phrase if it is not a subset of another, longer phrase (if “cool and collected” and “calm cool and collected” are repeated,
do not include “cool and collected” in the returned set). A phrase is repeated if it is used two or more times    
**Example input**    
The quick brown fox jumped over the lazy dog.    
The lazy dog, peeved to be labeled lazy, jumped over a snoring turtle.    
In retaliation the quick brown fox jumped over ten snoring turtles.    
**Example output**    
['the lazy dog', 'the quick brown fox jumped over']    
