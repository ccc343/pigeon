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

  insert(word) {
    this.root.insert(word);
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
      this.searchRecursive(this.root.children[letter], letter, word, row, results, 1);
    }

    if (this.opts.sort) {
      results = results.sort((a, b) => a.distance - b.distance);
    }

    return {
      words: results.map(a => a.word),
      min: minWithIndex(results, a => a.distance)
    };
  }

  // Traverses the trie recursively.
  searchRecursive(node, letter, query, previousRow, results, depth) {
    if (!node) return;

    // The first index in the row must always be one more than the
    // row above it in the same column. This is because the first
    // column represents comparison with the empty string.
    let currentRow = [ previousRow[0] + 1 ];

    // Populate the rest of the row using the previously computed row.
    for (let i = 1; i <= query.length; i++) {
      if (letter === query[i - 1]) {
        currentRow[i] = previousRow[i - 1];
      } else {
        currentRow[i] = Math.min(previousRow[i - 1], previousRow[i],
          currentRow[i - 1]) + 1;
      }
    }

    // Calculate normalized edit distance.
    const norm = Math.max(depth, query.length);
    const distance = currentRow[currentRow.length - 1] / norm;

    if (node.word && distance < this.opts.maxDistance) {
      results.push({ word: node.word, distance: distance });
    }

    // If any entries in the row are less than maxDistance, continue searching.
    if (Math.min.apply(Math, currentRow) / norm < this.opts.maxDistance) {
      for (const letter in node.children) {
        this.searchRecursive(node.children[letter], letter, query, currentRow,
          results, depth + 1);
      }
    }
  }
}

LevenshteinTrie.defaultOptions = {
  maxDistance: 0.7,

  // True if results should be returned sorted from closest
  // to farthest match.
  sortResults: false
}

export default LevenshteinTrie;
