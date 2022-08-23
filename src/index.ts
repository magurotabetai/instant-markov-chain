const endOfLine = Symbol();
type word = string | typeof endOfLine;

const parentWords: ParentWord[] = [];

interface ParentWord {
  word: string;
  childWords: ChildWord[];
}

interface ChildWord {
  word: string;
  // percentage: number;
  count: number;
}

const randomArray = (array: any[]) => {
  const index = Math.floor(Math.random() * array.length);
  return array[index];
}

const generateRandomTable = (childWords: ChildWord[]): string[] => {
  const randomTable: string[] = [];
  childWords.forEach(childWord => {
    const i = childWord.count;
    const additionalTable = [...Array(i)].map(() => childWord.word);
    randomTable.push(...additionalTable);
  });

  return randomTable;
}

const add = (word: string, nextWord: string) => {
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

  return endOfLine;
}

const generateSentence = (): string => {
  let currentWord: word = '';
  let sentence = '';
  let countStop = 0;

  while (typeof currentWord === String) {
    const nextWord = generateNextWord(currentWord);
    currentWord = nextWord;
    console.log('currentWord :>> ', currentWord);

    if (currentWord !== typeof endOfLine) sentence = sentence.concat(currentWord);
  }

  return sentence;
}

import('kuromoji').then((kuromoji) => {
  const analyze = () => {
    kuromoji.builder({ dicPath: "https://cdn.jsdelivr.net/npm/kuromoji@0.1.2/dict/" }).build(function (error, tokenizer) {
      const path = tokenizer.tokenize("TypeScriptは、JavaScriptを拡張した言語です。拡張といっても、むやみに機能を足すのではなく、追加するのは型の世界に限ってです。こういった思想がTypeScriptにはあるため、型に関する部分を除けば、JavaScriptの文法から離れすぎない言語になっています。");
      const sentence = path.map(token => token.surface_form);
      sentence.reduce((word, nextWord) => add(word, nextWord), "");
      console.log(parentWords);

      const generatedSentence = generateSentence();
      console.log(generatedSentence);
    });
  };

  document.querySelector('#analyze')?.addEventListener('click', analyze);
});
// import('kuromoji/dict').then(a => console.log(a));
