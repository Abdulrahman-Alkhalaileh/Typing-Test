let paragraphSpace = document.querySelector(".paragraph");
let startButton = document.querySelector(".button1");
let restartButton = document.querySelector(".button2");
let countDown = document.querySelector(".count-down");
let countDownBackground = document.querySelector(".cout-down-back");
let timer = document.querySelector(".timer");
let flag = false;
let characterTyped = 0;
let realTimer = 1;

let qoutesDatabase = [
  `Adversity has the effect of eliciting talents, which in prosperous circumstances would have lain dormant.`,
  `Technology... the knack of so arranging the world that we don't have to experience it.`,
  `I'm selfish, impatient and a little insecure. I make mistakes, I am out of control and at times hard to handle. But if you can't handle me at my worst, then you sure as hell don't deserve me at my best.`,
  `One's philosophy is not best expressed in words; it is expressed in the choices one makes... and the choices we make are ultimately our responsibility.`,
  `To effectively communicate, we must realize that we are all different in the way we perceive the world and use this understanding as a guide to our communication with others.`,
  `True friendship multiplies the good in life and divides i'ts evils. Strive to have friends, for life without friends is like life on a desert island... to find one real friend in a lifetime is good fortune; to keep him is a blessing.`,
  `Every day is a new opportunity. You can build on yesterday's success or put i'ts failures behind and start over again. That's the way life is, with a new game every day, and that's the way baseball is.`,
  `There are three methods to gaining wisdom. The first is reflection, which is the highest. The second is limitation, which is the easiest. The third is experience, which is the bitterest.`,
  `I am a firm believer in the people. If given the truth, they can be depended upon to meet any national crisis. The great point is to bring them the real facts.`,
  `First comes thought; then organization of that thought, into ideas and plans; then transformation of those plans into reality. The beginning, as you will observe, is in your imagination.`,
  `Don't believe what your eyes are telling you. All they show is limitation. Look with your understanding, find out what you already know, and you'll see the way to fly.`,
  `Change will not come if we wait for some other person or some other time. We are the ones we've been waiting for. We are the change that we seek.`,
  `The trick is in what one emphasizes. We either make ourselves miserable, or we make ourselves happy. The amount of work is the same.`,
  `Knowledge comes, but wisdom lingers. It may not be difficult to store up in the mind a vast quantity of facts within a comparatively short time, but the ability to form judgments requires the severe discipline of hard work and the tempering heat of experience and maturity.`,
  `In romance, we feel the need to zoom in and expound on our partner's foibles in intimate detail; in friendship, we tend to do the opposite, avoiding confrontation through fear, lethargy or both.`,
  `Permanence, perseverance and persistence in spite of all obstacles, discouragements, and impossibilities: It is this, that in all things distinguishes the strong soul from the weak.`,
  `To effectively communicate, we must realize that we are all different in the way we perceive the world and use this understanding as a guide to our communication with others.`,
  `And when the world is created, it is created in such a way that those eternal objects of God's loving wisdom become actualities - interacting with one another, relating to God in the finite realm.`,
  `People usually compare the computer to the head of the human being. I would say that hardware is the bone of the head, the skull. The semiconductor is the brain within the head. The software is the wisdom. And data is the knowledge.`,
  `When you meet someone better than yourself, turn your thoughts to becoming his equal. When you meet someone not as good as you are, look within and examine your own self.`,
  `I hope we shall crush in i'ts birth the aristocracy of our monied corporations which dare already to challenge our government to a trial by strength, and bid defiance to the laws of our country.`,
  `Our shared values define us more than our differences. And acknowledging those shared values can see us through our challenges today if we have the wisdom to trust in them again.`,
  `Every friendship goes through ups and downs. Dysfunctional patterns set in; external situations cause internal friction; you grow apart and then bounce back together.`,
  `Marriage is the highest state of friendship. If happy, it lessens our cares by dividing them, at the same time that it doubles our pleasures by mutual participation.`,
  `I define friendship as a bond that transcends all barriers. When you are ready to expect anything and everything from friends, good, bad or ugly... that's what I call true friendship.`,
  `So then, the relationship of self to other is the complete realization that loving yourself is impossible without loving everything defined as other than yourself.`,
  `Let the future tell the truth and evaluate each one according to his work and accomplishments. The present is theirs; the future, for which I have really worked, is mine.`,
];
let randomNum = Math.floor(Math.random() * (qoutesDatabase.length - 1));
let paragraph = qoutesDatabase[randomNum];

startButton.onclick = (e) => {
  countDownBackground.style.display = "flex";
  countDownFunction();
};

let char = document.createElement("span");

function startGame() {
  let seconds = 2;
  let minuites = 0;
  timer.innerHTML = `${minuites}:01`;
  let interval = setInterval(() => {
    if (seconds < 10) {
      timer.innerHTML = `${minuites}:0${seconds}`;
      seconds++;
    } else {
      timer.innerHTML = `${minuites}:${seconds}`;
      seconds++;
    }
    if (seconds === 60) {
      seconds = 0;
      minuites++;
    }
    if (flag === false) {
      realTimer++;
    } else {
      WPM(interval);
    }
  }, 1000);
  createQoute();
}

function countDownFunction() {
  setTimeout(() => {
    countDownBackground.style.display = "none";
    startButton.style.display = "none";
    startGame();
    clearInterval(interval);
  }, 3000);
  let interval = setInterval(() => {
    countDown.innerHTML = countDown.innerHTML - 1;
  }, 1000);
}

function checkCaracter(character) {
  let counter = 0;
  let wrong = 0;
  document.onkeydown = (e) => {
    if (e.key === paragraph.charAt(counter) && e.key != "Backspace") {
      character[counter].style.color = "green";
      character[counter].style.borderBottom = "2px solid green";
      if (counter > 0 && character[counter - 1].style.color === "red") {
        character[counter].style.color = "red";
        character[counter].style.borderBottom = "5px solid red";
      }
      counter++;
    } else if (
      e.key != paragraph.charAt(counter) &&
      e.key != "Backspace" &&
      e.key != "Shift"
    ) {
      character[counter].style.color = "red";
      character[counter].style.borderBottom = "5px solid red";
      counter++;
      wrong++;
    }
    if (e.key === "Backspace") {
      if (counter != 0) {
        counter--;
        character[counter].style.borderBottom = "none";
      }
      character[counter].style.color = "orange";
    }
    gameEnd(counter, character, wrong);
    characterTyped = counter;
  };
}

function createQoute() {
  let qoute = paragraph.split("");
  for (let i = 0; i < qoute.length; i++) {
    let char = document.createElement("span");
    char.setAttribute("class", "char");
    paragraphSpace.appendChild(char);
  }
  let character = document.querySelectorAll(".char");

  for (let i = 0; i < character.length; i++) {
    character[i].innerHTML = qoute[i];
  }

  checkCaracter(character, qoute);
}

let score = document.querySelector(".score");
let accuracy = document.querySelector("#accuracy");
let speed = document.querySelector("#speed");

function gameEnd(counter, character, wrong) {
  let outOf = character.length;
  let correct = ((outOf - wrong) / outOf) * 100;
  let accuracyResult = correct.toFixed(1);
  accuracy.innerHTML = `${accuracyResult}%`;

  if (counter === character.length) {
    score.style.display = "flex";
    flag = true;
  }
}

function WPM(interval) {
  clearInterval(interval);
  let wpm = Math.trunc((characterTyped / 5 / realTimer) * 60);
  speed.innerHTML = `${wpm} WPM`;
}

restartButton.onclick = () => {
  location.reload();
};
