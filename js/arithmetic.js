if (state.getCurrentPhaseNum() == '1') {
    var questions = [
        {
            text: '5 + 7',
            answer: '13',
        },
        {
            text: '12 + 5',
            answer: '17',
        },
        {
            text: '22 - 6',
            answer: '16',
        },
        {
            text: '29 - 5',
            answer: '24',
        },
        {
            text: '12 x 3',
            answer: '36',
        },
        {
            text: '7 x 5',
            answer: '35',
        },
        {
            text: '4 x 8',
            answer: '32',
        },
        {
            text: '22 + 33',
            answer: '55',
        },
    ].reverse();
} else if (state.getCurrentPhaseNum() == '2') {
    var questions = [
        {
            text: '6 + 8',
            answer: '14',
        },
        {
            text: '13 + 6',
            answer: '19',
        },
        {
            text: '24 - 6',
            answer: '17',
        },
        {
            text: '27 - 3',
            answer: '24',
        },
        {
            text: '8 x 7',
            answer: '56',
        },
        {
            text: '13 x 2',
            answer: '26',
        },
        {
            text: '3 x 7',
            answer: '21',
        },
        {
            text: '33 + 44',
            answer: '77',
        },
    ].reverse();
} else if (state.getCurrentPhaseNum() == '3') {
    var questions = [
        {
            text: '6 + 7',
            answer: '13',
        },
        {
            text: '12 + 7',
            answer: '19',
        },
        {
            text: '22 - 5',
            answer: '17',
        },
        {
            text: '26 - 4',
            answer: '22',
        },
        {
            text: '7 x 6',
            answer: '42',
        },
        {
            text: '14 x 2',
            answer: '28',
        },
        {
            text: '4 x 9',
            answer: '36',
        },
        {
            text: '22 + 66',
            answer: '88',
        },
    ].reverse();
}

var questionIdx = 0;

Mousetrap.bind('enter', function (e) {
    e.preventDefault();
    typingApp.toggleToApp();
    Mousetrap.unbind('enter');
});

var typingApp = new Vue({
    el: '#page',
    data: {
        showApp: false,
        elapsedSeconds: 0,
        typingInterval: null,
        answer: '',
    },
    methods: {
        toggleToApp: function () {
            this.showApp = true;
            this.nextQuestion();
        },
        nextQuestion: function() {
            this.question = questions.pop();
            this.start();
        },
        start: function () {
            state.startTask('arithmetic');
            this.elapsedSeconds = 0;
            this.answer = '';
            var that = this;
            this.typingInterval = setInterval(function () {
                that.elapsedSeconds += 0.1;
            }, 100);
            Vue.nextTick(function () {
                document.getElementById('answer').focus();
            });
        },
        questionDone: function () {
            state.finishTask({
                correct: this.answer == this.question.answer,
                idx: questionIdx,
            });
            questionIdx++;
            clearInterval(this.typingInterval);
            this.typingInterval = null;
            if (questions.length == 0) {
                setTimeout(function () {
                    alert('Test complete!');
                    window.close();
                    document.body.innerHTML = 'Please close this page.';
                }, 1);
                return;
            }
            this.nextQuestion();
        },
    }
})
