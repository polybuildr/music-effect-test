var questions = [
    {
        text: '22 + 5',
        answer: '27'
    },
    {
        text: '22 - 3',
        answer: '19'
    },
    {
        text: '15 x 2',
        answer: '30'
    },
];

Mousetrap.bind('enter', function () {
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
    }
})
