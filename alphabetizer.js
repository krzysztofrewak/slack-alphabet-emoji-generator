const mappings = {
  '@': 'at',
  '!': 'exclamation',
  '#': 'hash',
  '?': 'question',
}

const testing = [
  {
    input: 'test',
    expected: 'test'
  },
  {
    input: 'Test',
    expected: 'test'
  },
  {
    input: 'Test test test...',
    expected: 'testtesttest'
  },
  {
    input: '#test',
    expected: '#test'
  },
  {
    input: 'Test&test',
    expected: 'testtest'
  },
  {
    input: 'Test żźć',
    expected: 'test'
  },
  {
    input: 'test !== !test',
    expected: 'test!!test'
  },
  {
    input: 'test@example.com',
    expected: 'test@examplecom'
  }
]

new Vue({
  el: '#alphabetizer',
  data () {
    return {
      letters: [],
      text: 'xd',
      testing: [],
    }
  },
  computed: {
    output () {
      return this.text.split('')
        .map(letter => this.filterLetters(letter))
        .filter(letter => letter !== '')
        .map(letter => this.letterToImage(letter))
    },
    emojis () {
      return this.text.split('')
        .map(letter => this.processLetter(letter))
        .filter(letter => letter !== '')
        .map(letter => this.letterToEmoji(letter))
        .join('')
    }
  },
  mounted () {
    let alphabet = 'abcdefghijklmnopqrstuvwxyz'
    this.letters = alphabet.split('')
    this.letters.push('@', '!', '#', '?')
    this.testing = testing
  },
  methods: {
    filterLetters (letter) {
      letter = letter.toLowerCase()

      if (!this.letters.includes(letter)) {
        return ''
      }

      return letter
    },
    processLetter (letter) {
      letter = this.filterLetters(letter)

      if (mappings[letter]) {
        letter = mappings[letter]
      }

      return letter
    },
    letterToImage (letter) {
      letter = this.processLetter(letter)
      return './emojis/white/' + letter + '.png'
    },
    letterToEmoji (letter) {
      return ':alphabet-white-' + letter + ':'
    },
    addLetter (letter) {
      this.text += letter
    },
    processText (text) {
      return text.split('').map(letter => this.filterLetters(letter)).join('')
    }
  }
})