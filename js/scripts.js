let rectHeight = 80;
let rectWidth = 80;
let rectCount = 0;
let clickCount = 0;
let clickArray = [];
let score = 0;
let revealed=0;



function generateSquares(id) {
   

    if (rectCount < 12) {
        
        const rect = document.createElement('div');
        rect.classList.add('rect');
        rect.id = id;
        rect.style.height = rectHeight + 'px';
        rect.style.width = rectWidth + 'px';
        rect.style.margin = 64 + 'px';
        rect.style.fontSize = (rectHeight / 2) + 'px';
        rect.style.backgroundColor = 'black';
        rect.innerHTML = '<span class="hidden">' + getRandomLetter() + '</span>';
        document.getElementById('mid').appendChild(rect);
        rectHeight += 20;
        rectWidth += 20;
        rectCount++;

        rect.addEventListener('click', function () {
            const letter = this;
            const hidden = this.querySelector(".hidden");
            if (hidden.classList.contains('revealed'))
                return;
            this.querySelector('.hidden').classList.toggle('revealed');

            clickArray.push(letter);
            clickCount++;
            revealed++;
            if (clickCount == 2) {
                const result = compareLetters(clickArray[0], clickArray[1]);
                result == true ? match(clickArray) : mismatch(clickArray);
                clickCount = 0;
                clickArray.length = 0;

            }
            if(revealed === 12){
                endGameResult();
            }
        });
    }


}

function getRandomLetter() {
    const letters = 'NOUR';
    return letters[Math.floor(Math.random() * letters.length)];
}

function compareLetters(firstLetter, secondLetter) {
    if (firstLetter.innerHTML === secondLetter.innerHTML)
        return true;
    return false;

}


function mismatch(array) {
    array.forEach(array => {
        array.style.backgroundColor = '#8B0000';


    });
    document.getElementById('reset').style.visibility = 'visible';
    negativeResultFeedback();
}

function match(array) {
    array.forEach(array => {
        array.style.backgroundColor = 'green';

    });
    score++;
    document.getElementById("score").innerHTML = `SCORE: ${score}/6`;
    document.getElementById('reset').style.visibility = 'visible';
    positiveResultFeedback();
}


function refreshPage() {
    window.location.reload();
}


function positiveResultFeedback(){
    const array=['nice','you got it','keep going'];
    let x = array[Math.floor(Math.random() * array.length)];
    document.getElementById('result-feedback').innerHTML = x;
}


function negativeResultFeedback(){
    const array=['oh no','unlucky :(','take the L',];
    let x = array[Math.floor(Math.random() * array.length)];
    document.getElementById('result-feedback').innerHTML = x;
}

function endGameResult(){
    if(score === 6){
        alert('you should buy a lottery ticket');
        return;
    }
    if(score > 2){
        alert('you pass!');
        return;
    }
    alert('you fail');
}
