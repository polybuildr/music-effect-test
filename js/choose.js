var questions = [
    {
        options: ['Dog', 'Cat', 'Tractor', 'Tiger'],
        answerChoice: 2,
    },
    {
        options: ['Banana', 'Apple', 'Orange', 'Balloon'],
        answerChoice: 3,
    },
    {
        options: ['Laptop', 'Yellow', 'Purple', 'Red'],
        answerChoice: 0
    },
];

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
        picked: null,
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
            state.startTask('choose');
            this.elapsedSeconds = 0;
            var that = this;
            this.typingInterval = setInterval(function () {
                that.elapsedSeconds += 0.1;
            }, 100);
        },
        questionDone: function () {
            var question = this.question;
            state.finishTask({
                correct: this.picked == question.options[question.answerChoice]
            });
            clearInterval(this.typingInterval);
            this.typingInterval = null;
            if (questions.length == 0) {
                setTimeout(function () {
                    alert("Congrats! You've successfully passed the test :D");
                }, 1);
                return;
            }
            this.nextQuestion();
        },
    },
    watch: {
        picked: function (newVal, oldVal) {
            this.questionDone();
        },
    }
})
