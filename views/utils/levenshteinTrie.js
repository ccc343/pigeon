import TrieNode from './trieNode';
import {maxWithIndex, minWithIndex} from './arrayUtils';

class LevenshteinTrie {

  // Constructs a trie from the given dictionary.
  constructor(dictionary, opts={}) {
    this.root = new TrieNode();
    dictionary.forEach((word) => {
      this.root.insert(word);
    });

    this.opts = Object.assign(opts, LevenshteinTrie.defaultOptions);
  }

  // Returns an array of closest matches in the dictionary.
  search(word) {
    // Instantiate a 1 x n matrix.
    let row = [];
    for (let i = 0; i <= word.length; i++) {
      row[i] = i;
    }

    let results = [];
    for (const letter in this.root.children) {
      this.searchRecursive(this.root.children[letter], letter, word, row, results);
    }

    if (this.opts.sort) {
      results = results.sort((a, b) => a.distance - b.distance);
    }

    return {
      words: results.map((a) => a.word),
      min: minWithIndex(results, (a) => a.distance)
    };
  }

  // Traverses the trie recursively.
  searchRecursive(node, letter, word, previousRow, results) {
    if (!node) return;

    // The first index in the row must always be one more than the
    // row above it in the same column. This is because the first
    // column represents comparison with the empty string.
    let currentRow = [ previousRow[0] + 1 ];

    // Populate the rest of the row using the previously computed
    // row.
    for (let i = 1; i <= word.length; i++) {
      if (letter === word[i - 1]) {
        currentRow[i] = previousRow[i - 1];
      } else {
        currentRow[i] = Math.min(previousRow[i - 1], previousRow[i],
          currentRow[i - 1]) + 1;
      }
    }

    // The last entry in the row is the edit distance.
    const distance = currentRow[currentRow.length - 1];

    // If the node is a full word, we add the word to results...
    if (node.word && distance < this.opts.maxDistance) {
      // if the results array has room...
      if (results.length < this.opts.maxResults) {
        results.push({ word: node.word, distance: distance });
      }
      // or if it is a closer match than the farthest result in the array.
      else {
        const max = maxWithIndex(results, a => a.distance);
        if (distance < max.value) {
          results[max.index] = { word: node.word, distance: distance };
        }
      }
    }

    // If any entries in the row are less than maxDistance,
    // we continue searching.
    if (Math.min.apply(Math, currentRow) < this.opts.maxDistance) {
      for (const letter in node.children) {
        this.searchRecursive(node.children[letter], letter, word, currentRow, results);
      }
    }
  }
}

LevenshteinTrie.defaultOptions = {
  // A call to search() will return no more than maxResults results.
  maxResults: 5,

  // A call to search() will not return words farther than
  // maxDistance apart.
  maxDistance: Infinity,

  // True if results should returned sorted from closest
  // to farthest match.
  sortResults: false
}

export default LevenshteinTrie;
