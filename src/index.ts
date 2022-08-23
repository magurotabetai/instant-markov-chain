type word = string | null;

let parentWords: ParentWord[] = [];

interface ParentWord {
  word: string;
  childWords: ChildWord[];
}

interface ChildWord {
  word: word;
  count: number;
}

const randomArray = (array: any[]) => {
  const index = Math.floor(Math.random() * array.length);
  return array[index];
}

const generateRandomTable = (childWords: ChildWord[]): word[] => {
  const randomTable: word[] = [];
  childWords.forEach(childWord => {
    const i = childWord.count;
    const additionalTable = [...Array(i)].map(() => childWord.word);
    randomTable.push(...additionalTable);
  });

  return randomTable;
}

const add = (word: string, nextWord: word) => {
  const targetWord = parentWords.find(ParentWord => ParentWord.word === word);
  if (targetWord) {
    const targetChildWord = targetWord.childWords.find(childWord => childWord.word === nextWord);
    if (targetChildWord) {
      targetChildWord.count += 1;
    } else {
      const childWord: ChildWord = { word: nextWord, count: 1};
      targetWord.childWords.push(childWord)
    }
  } else {
    const childWord: ChildWord = { word: nextWord, count: 1};
    const parentWord: ParentWord = { word: word, childWords: [childWord] };
    parentWords.push(parentWord);
  }

  return nextWord;
}

const generateNextWord = (word): word => {
  const targetWord = parentWords.find(ParentWord => ParentWord.word === word);

  if (targetWord) {
    const randomTable = generateRandomTable(targetWord.childWords);
    return randomArray(randomTable);
  }

  return null;
}

const generateSentence = (): string => {
  let currentWord: word = '';
  let sentence = '';
  let countStop = 0;

  while (currentWord !== null) {
    if (countStop > 100) break;
    countStop++;
    const nextWord = generateNextWord(currentWord);
    currentWord = nextWord;

    if (currentWord !== null) sentence = sentence.concat(currentWord);
  }

  return sentence;
}

const registerParentWords = (sentence: any[]) => {
  sentence.reduce((word, nextWord) => add(word, nextWord), "");

  const last = sentence.slice(-1)[0]
  add(last, null);
}

const splitSentence = (text: string): string[] => text.split("\n");

const outputResult = (text) => {
  const resultChildElement = document.createElement('div');
  resultChildElement.innerText = text;

  const resultElement = document.querySelector('#result');
  resultElement?.appendChild(resultChildElement);
};

import('kuromoji').then((kuromoji) => {
  const analyze = () => {
    const resultElement = document.querySelector('#result');
    if (resultElement) resultElement.innerHTML = '';

    parentWords = [];

    kuromoji.builder({ dicPath: "https://cdn.jsdelivr.net/npm/kuromoji@0.1.2/dict/" }).build((_error, tokenizer) => {
      const textarea: HTMLInputElement = <HTMLInputElement>document.querySelector('#text');
      const sentences = splitSentence(textarea.value)

      sentences.forEach((text) => {
        const path = tokenizer.tokenize(text);
        const sentence = path.map(token => token.surface_form);
        registerParentWords(sentence);
      });

      for(let i=0; i < 10; i++){
        const generatedSentence = generateSentence();
        outputResult(generatedSentence);
      }

    });
  };

  document.querySelector('#analyze')?.addEventListener('click', analyze);
});
