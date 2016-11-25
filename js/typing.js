if (state.getCurrentPhaseNum() == '1') {
    var paragraphs = [
        "Concurrent computing is a form of computing in which several computations are executed during overlapping time periods instead of sequentially. As a programming paradigm, concurrent computing is a form of modular programming.",
        "Mona Lisa is a 16th century portrait painted in oil by Leonardo da Vinci in Florence, Italy. It is studied, recognized, and copied so often that it is the most famous painting in the world. The painting is owned by the Government of France.",
    ];
} else if (state.getCurrentPhaseNum() == '2') {
    var paragraphs = [
        "Behaviour-driven development (BDD) is a software development process that emerged from test-driven development (TDD). BDD attempts to combine the general techniques of TDD with ideas from object-oriented analysis and design.",
        "The Statue of Liberty is a monument symbolising the United States. The statue is placed near the entrance to New York City harbour. It was given to the United States by the people of France, to represent the friendship between the two countries.",
    ];
} else if (state.getCurrentPhaseNum() == '3') {
    var paragraphs = [
        "Aspect-oriented programming (AOP) is a programming paradigm that aims to increase code modularity by allowing the separation of cross-cutting concerns. It does so by adding additional behaviour to existing code (an advice).",
        "The Great Wall of China is an ancient wall located in China. The wall is made of cement, rocks and powdered dirt. It was built to protect the north of the empire of China from enemy attacks. It is the longest structure humans have ever built.",
    ];
}

var paragraphIndex = 0;

Mousetrap.bind('enter', function (e) {
    e.preventDefault();
    typingApp.toggleToApp();
    Mousetrap.unbind('enter');
});

var typingApp = new Vue({
    el: '#page',
    data: {
        showApp: false,
        paragraph: '',
        wordIdx: 0,
        typedText: '',
        elapsedSeconds: 0,
        typingInterval: null,
        done: false,
        showCountdownInterval: null,
        secondsLeftForNextParagraph: 3,
    },
    methods: {
        toggleToApp: function () {
            this.showApp = true;
            this.nextParagraph();
        },
        nextParagraph: function() {
            this.paragraph = paragraphs.pop();
            this.typedText = '';
            this.start();
        },
        start: function () {
            state.startTask('typing');
            var that = this;
            this.done = false;
            this.elapsedSeconds = 0;
            this.wordIdx = 0;
            this.typingInterval = setInterval(function () {
                that.elapsedSeconds += 0.1;
            }, 100);
            Vue.nextTick(function () {
                document.getElementById('textarea').focus();
            });
        },
        updateWordIdx: function (i) {
            if (i <= this.paragraph.split(' ').length) {
                this.wordIdx = i;
                if (this.wordIdx == this.paragraph.split(' ').length) {
                    this.paragraphDone();
                }
            }
        },
        checkTypedTextState: function () {
            var typedWords = this.typedText.split(' ');
            var words = this.paragraph.split(' ');
            var i = 0;
            for (; i < words.length; ++i) {
                if (typedWords[i] != words[i]) {
                    break;
                }
            }
            this.updateWordIdx(i);
        },
        paragraphDone: function () {
            state.finishTask({
                idx: paragraphIndex,
            });
            paragraphIndex++;
            clearInterval(this.typingInterval);
            this.typingInterval = null;
            this.done = true;
            if (paragraphs.length == 0) {
                setTimeout(function () {
                    alert('Test complete!');
                    window.close();
                    document.body.innerHTML = 'Please close this page.';
                }, 1);
                return;
            }
            var that = this;
            this.showCountdownInterval = setInterval(function () {
                that.secondsLeftForNextParagraph -= 1;
                if (that.secondsLeftForNextParagraph == 0) {
                    clearInterval(that.showCountdownInterval);
                    that.showCountdownInterval = null;
                    that.secondsLeftForNextParagraph = 3;
                    that.nextParagraph();
                }
            }, 1000);
        },
    },
    computed: {
        paragraphHtml: function () {
            console.log('asasd');
            var words = this.paragraph.split(' ');
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
