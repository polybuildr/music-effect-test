if (state.getCurrentPhaseNum() == '1') {
    var questions = [
        {
            options: ['Cat', 'Dog', 'Tractor', 'Cow'],
            answerChoice: 2,
        },
        {
            options: ['Balloon', 'Apple', 'Orange', 'Banana'],
            answerChoice: 0,
        },
        {
            options: ['Red', 'Yellow', 'Purple', 'Laptop'],
            answerChoice: 3
        },
        {
            options: ['Delhi', 'Hyderabad', 'Javascript', 'Mumbai'],
            answerChoice: 2,
        },
        {
            options: ['Orangutan', 'Lion', 'Giraffe', 'Rectangle'],
            answerChoice: 3,
        },
        {
            options: ['C', 'Lemons', 'PHP', 'C#'],
            answerChoice: 1,
        },
        {
            options: ['Laptop', 'Unicorn', 'Smartphone', 'Desktop'],
            answerChoice: 1,
        },
        {
            options: ['Square', 'Rectangle', 'Circle', 'Water'],
            answerChoice: 3,
        },
        {
            options: ['Magenta', 'Cyan', 'Parachute', 'Indigo'],
            answerChoice: 2
        },
    ].reverse();
} else if (state.getCurrentPhaseNum() == '2') {
    var questions = [
        {
            options: ['Parrot', 'Dog', 'Bicycle', 'Goat'],
            answerChoice: 2,
        },
        {
            options: ['Bottle', 'Orange', 'Mango', 'Watermelon'],
            answerChoice: 0,
        },
        {
            options: ['Black', 'Purple', 'Blue', 'Tablet'],
            answerChoice: 3,
        },
        {
            options: ['Square', 'Cheetah', 'Babboon', 'Cat'],
            answerChoice: 0,
        },
        {
            options: ['Bash', 'Perl', 'Hostel', 'Javascript'],
            answerChoice: 2,
        },
        {
            options: ['Cupboard', 'Table', 'Fan', 'Bike'],
            answerChoice: 3,
        },
        {
            options: ['Desktop', 'Dragon', 'Tablet', 'Laptop'],
            answerChoice: 1,
        },
        {
            options: ['Juice', 'Rectangle', 'Circle', 'Triangle'],
            answerChoice: 0,
        },
        {
            options: ['Emerald', 'Pink', 'Rocket', 'Brown'],
            answerChoice: 2,
        },
    ].reverse();
} else if (state.getCurrentPhaseNum() == '3') {
    var questions = [
        {
            options: ['Wolf', 'Eagle', 'Train', 'Sheep'],
            answerChoice: 2,
        },
        {
            options: ['Spoon', 'Strawberry', 'Apple', 'Apricot'],
            answerChoice: 0,
        },
        {
            options: ['Owl', 'Rat', 'Cylinder', 'Kangaroo'],
            answerChoice: 2,
        },
        {
            options: ['C++', 'Python', 'Java', 'Clouds'],
            answerChoice: 3,
        },
        {
            options: ['Grey', 'Maroon', 'White', 'Speakers'],
            answerChoice: 3,
        },
        {
            options: ['PHP', 'Pune', 'Hyderabad', 'Indore'],
            answerChoice: 0,
        },
        {
            options: ['Square', 'Pepsi', 'Circle', 'Triangle'],
            answerChoice: 1,
        },
        {
            options: ['Chair', 'Fan', 'Bed', 'Scooter'],
            answerChoice: 3,
        },
        {
            options: ['White', 'Lavendar', 'Candle', 'Magenta'],
            answerChoice: 3
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
                idx: questionIdx,
                correct: this.picked == question.options[question.answerChoice]
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
    },
    watch: {
        picked: function (newVal, oldVal) {
            this.questionDone();
        },
    }
})
