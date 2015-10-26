class TrieNode {

  // Constructs an empty trie node.
  constructor() {
    // The word completed by this node.
    this.word = null;

    // A child consists of a letter key and TrieNode value.
    this.children = {};
  }

  // Inserts a word into the trie, with this node as
  // the root of the trie.
  insert(word) {
    let node = this;

    for (let i = 0; i < word.length; i++) {
      const letter = word[i];
      node.children[letter] = node.children[letter] || new TrieNode();
      node = node.children[letter];
    }

    // Mark the end of the word.
    node.word = word;
  }

}

export default TrieNode;
