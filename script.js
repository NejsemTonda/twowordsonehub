var line1 = "";
var line2 = "";

var word1 = "";
var word2 = "";
var count1 = 0;
var count2 = 0;

var correct = 0;
var tot = 0;

function chooseRandomLines() {
  fetch('trim.txt')
    .then(response => response.text())
    .then(fileContent => {
      const allLines = fileContent.split('\n');

      // Select two random lines
      const min = document.getElementById("min-oc").value;
      var lines = allLines;
      if(min === '1000'){
        lines = allLines.slice(0,2927);
      }
      else if(min === '500'){
        lines = allLines.slice(0,4686);
      }
      else if(min === '200'){
        lines = allLines.slice(0,9065);
      }
      else if(min === '50'){
        lines = allLines.slice(0,allLines.length);
      }
      line1 = lines[Math.floor(Math.random() * lines.length)];
      line2 = lines[Math.floor(Math.random() * lines.length)];

      count1 = parseInt(line1.match(/\((\d+)\)$/)[1], 10);
      count2 = parseInt(line2.match(/\((\d+)\)$/)[1], 10);

      while(count1 === count2){
        line2 = lines[Math.floor(Math.random() * lines.length)];
        count2 = parseInt(line2.match(/\((\d+)\)$/)[1], 10);
      }

      word1 = line1.split(' ')[1];
      word2 = line2.split(' ')[1];

      document.getElementById('leftButton').textContent = word1;
      document.getElementById('rightButton').textContent = word2;

      if(count1 > count2){
        document.getElementById('result1').textContent = line1;
        document.getElementById('result2').textContent = line2;
      }
      else{
        document.getElementById('result1').textContent = line2;
        document.getElementById('result2').textContent = line1;
      }

    })
    .catch(error => {
      console.log('Error: Failed to read the file.', error);
    });
}
function choose(c){
  if(count1 > count2){
    left();
  }
  else{
    right();
  }
  document.getElementById("word-panel").style.display = 'none';
  document.getElementById("choosed").style.display = 'flex';
  document.getElementById("continue").textContent = 'continue';

}
function restart(){
  document.getElementById('left').style.width = '50%';
  document.getElementById('right').style.width = '50%';
  document.getElementById("word-panel").style.display = 'flex';
  document.getElementById("choosed").style.display = 'none';
  document.getElementById("continue").textContent = 'skip';
  chooseRandomLines();
}
function right(){
   document.getElementById('left').style.width = '0%';
   document.getElementById('right').style.width = '100%';
   document.body.style.background = '#ff9000';
}
function left(){
  document.getElementById('left').style.width = '100%';
  document.getElementById('right').style.width = '0%';
}

