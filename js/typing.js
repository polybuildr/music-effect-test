var app = new Vue({
    el: '#app',
    data: {
        key: 'value',
        sentence: 'How are you doing today?',
        wordIdx: 0,
        typedText: '',
    },
    methods: {
        updateWordIdx: function (i) {
            if (i <= this.sentence.split(' ').length) {
                this.wordIdx = i;
            }
        },
        checkTypedTextState: function () {
            var typedWords = this.typedText.split(' ');
            var words = this.sentence.split(' ');
            var i = 0;
            for (; i < words.length; ++i) {
                if (typedWords[i] != words[i]) {
                    break;
                }
            }
            this.updateWordIdx(i);
        },
    },
    computed: {
        sentenceHtml: function () {
            var words = this.sentence.split(' ');
            for (var i = 0; i < this.wordIdx; ++i) {
                words[i] = '<span style="color:green;">' + words[i] + '</span>'
            }
            if (this.wordIdx < words.length) {
                words[this.wordIdx] = '<span style="color:blue;">' + words[this.wordIdx] + '</span>';
            }
            return words.join(' ');
        }
    }
})
