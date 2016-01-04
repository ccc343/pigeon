import TrieNode from './trieNode';

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

  traverse(f, root) {
    if (!root) {
      return;
    }

    f(root);
    for (const letter in root.children) {
      this.traverse(f, root.children[letter]);
    }
  }

  // Returns an array of closest matches in the dictionary.
  search(query) {
    // Instantiate a 1 x n matrix.
    let row = [];
    for (let i = 0; i <= query.length; i++) {
      row[i] = i;
    }

    let results = {};
    for (const letter in this.root.children) {
      this.searchRecursive(this.root.children[letter], letter, query, row, results, 1);
    }

    let finalResults = [];
    for (const word in results) {
      const val = results[word],
            prefix = val.prefix ? 1 : 0,
            lev = (val.distance !== 0 && !val.distance) ? 0 : 1 - val.distance;

      finalResults.push({
        word: word,
        score: (prefix * (1 / query.length)) + (lev * (1 - 1 / query.length))
      });
    }

    return finalResults.sort((a, b) => b.score - a.score).map(a => a.word);
  }

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

    // Note any prefix matches.
    if (distance === 0) {
      this.traverse(n => {
        if (n.word) {
          results[n.word] = results[n.word] || {};
          results[n.word].prefix = true;
        }
      }, node);
    }

    if (node.word && distance < this.opts.maxDistance) {
      results[node.word] = results[node.word] || {};
      results[node.word].distance = distance;
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
  maxDistance: 0.7
}

export default LevenshteinTrie;
