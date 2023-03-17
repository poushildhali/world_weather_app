

/* Toggle between showing and hiding the navigation menu links when the user clicks on the hamburger menu / bar icon */
function myFunction() {
  var x = document.getElementById("myLinks");
  if (x.style.display === "block") {
    x.style.display = "none";
  } else {
    x.style.display = "block";
  }
}

document.body.style.zoom = "75%";


// alert("Welcome to World Weather \nGet live weather reports of any cities");


const texts = ['Search the City name','Kolkata','Delhi','Bangalore','Mumbai','Chennai','London','Paris','New York','Tokyo','Dubai','Barcelona','Rome','Madrid'];
const input = document.querySelector('#searchbox');
const animationWorker = function (input, texts) {
  this.input = input;
  this.defaultPlaceholder = this.input.getAttribute('placeholder');
  this.texts = texts;
  this.curTextNum = 0;
  this.curPlaceholder = '';
  this.blinkCounter = 0;
  this.animationFrameId = 0;
  this.animationActive = false;
  this.input.setAttribute('placeholder',this.curPlaceholder);

  this.switch = (timeout) => {
    this.input.classList.add('imitatefocus');
    setTimeout(
      () => { 
        this.input.classList.remove('imitatefocus');
        if (this.curTextNum == 0) 
          this.input.setAttribute('placeholder',this.defaultPlaceholder);
        else
          this.input.setAttribute('placeholder',this.curPlaceholder);

        setTimeout(
          () => { 
            this.input.setAttribute('placeholder',this.curPlaceholder);
            if(this.animationActive) 
              this.animationFrameId = window.requestAnimationFrame(this.animate)}, 
          timeout);
      }, 
      timeout);
  }

  this.animate = () => {
    if(!this.animationActive) return;
    let curPlaceholderFullText = this.texts[this.curTextNum];
    let timeout = 300;
    if (this.curPlaceholder == curPlaceholderFullText+'|' && this.blinkCounter==3) {
      this.blinkCounter = 0;
      this.curTextNum = (this.curTextNum >= this.texts.length-1)? 0 : this.curTextNum+1;
      this.curPlaceholder = '|';
      this.switch(3000);
      return;
    }
    else if (this.curPlaceholder == curPlaceholderFullText+'|' && this.blinkCounter<3) {
      this.curPlaceholder = curPlaceholderFullText;
      this.blinkCounter++;
    }
    else if (this.curPlaceholder == curPlaceholderFullText && this.blinkCounter<3) {
      this.curPlaceholder = this.curPlaceholder+'|';
    }
    else {
      this.curPlaceholder = curPlaceholderFullText
        .split('')
        .slice(0,this.curPlaceholder.length+1)
        .join('') + '|';
      timeout = 150;
    }
    this.input.setAttribute('placeholder',this.curPlaceholder);
    setTimeout(
      () => { if(this.animationActive) this.animationFrameId = window.requestAnimationFrame(this.animate)}, 
      timeout);
  }

  this.stop = () => {
    this.animationActive = false;
    window.cancelAnimationFrame(this.animationFrameId);
  }

  this.start = () => {
    this.animationActive = true;
    this.animationFrameId = window.requestAnimationFrame(this.animate);
    return this;
  }
}

document.addEventListener("DOMContentLoaded", () => {
  let aw = new animationWorker(input, texts).start();
  input.addEventListener("focus", (e) => aw.stop());
  input.addEventListener("blur", (e) => {
    aw = new animationWorker(input, texts);
    if(e.target.value == '') setTimeout( aw.start, 2000);
  });
});