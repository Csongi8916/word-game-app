const fs = require('fs');
const path = require('path');

const filePath = path.join(__dirname, '..', 'db', 'words.txt');

export const calcAnagram = (sourceWord: string) => {
  console.log('Run calcAnagram()');
  const rawWords = readFile();
  const words: string[] = rawWords.toString().split('\n'); 
  const anagrams: string[] = words.filter((word: string) => {
    return isAnagram(sourceWord, word);
  });
  return anagrams;
}

function isAnagram(firstWord: string, secondWord: string) {
  return cleanString(firstWord) === cleanString(secondWord)
} 

function cleanString(str: string){
  return str.replace(/[^\w]/g, '').toLowerCase().split('').sort().join('');
}

function readFile() {
  try {
    const data = fs.readFileSync(filePath, 'utf8');
    return data.toString();
  } catch (error) {
    console.error(`Got an error trying to read the file: ${error}`);
  }
}

