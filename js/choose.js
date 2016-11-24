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
            this.elapsedSeconds = 0;
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
