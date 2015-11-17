import {maxWithIndex, minWithIndex} from './arrayUtils';

function distanceTo(str1, str2) {
  let results = [];
  for (let i = 0; i <= str1.length; i++) {
    results[i] = [];
    results[i][0] = i;
  }
  for (let j = 0; j <= str2.length; j++ ) {
    results[0][j] = j;
  }

  for (let i = 1; i <= str1.length; i++) {
    for (let j = 1; j <= str2.length; j++) {
      if (str1[i - 1] === str2[j - 1]) {
        results[i][j] = results[i - 1][j - 1];
      } else {
        results[i][j] = Math.min(
          results[i - 1][j],
          results[i][j - 1],
          results[i - 1][j - 1]
        ) + 1;
      }
    }
  }

  return results[str1.length][str2.length];
}

export function search(word, dictionary, maxResults=5) {
  let matches = [];

  for (let i = 0; i < dictionary.length; i++) {
    const distance = distanceTo(word, dictionary[i]);

    if (matches.length < maxResults) {
      matches.push({
        word: dictionary[i],
        distance: distance
      });
    } else {
      const max = maxWithIndex(matches, x => x.distance);
      if (distance < max.value) {
        matches[max.index] = {
          word:dictionary[i],
          distance: distance
        };
      }
    }
  }

  return {
    min: minWithIndex(matches, x => x.distance),
    words: matches.map(x => x.word)
  };
}
