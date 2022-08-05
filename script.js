  let API = 'http://localhost:3000/English';
  let main = document.querySelector('.card-word')
  let result = [];
  let start = () =>{
      getVocabulary();
  }
  let getVocabulary =() =>{
    fetch(API)
    .then(function (response) {
      return response.json();
    })
    .then(function(json){
      result = setRandom(3,json);
      listVolcabulary(result);
    })
  }
  //--------------------------------//

    const listVolcabulary = (array) =>{
      let words =array[0]; 
      if(words!=undefined){
        console.log(words);
        main.appendChild(setVocabulary(words)).firstChild
        main.style.animation = 'show ease 0.5s';
        checkAnswer(words)
      }
      else{
        alert('Bạn Đã Hoàn Thành Task Hôm Nay \nHave a nice day :)');
      }
  }
  //-------------------------------//
  const setRandom = (max,array) =>{
    let i = max;
    let j = 0;
      let random = [];
      while(i--){
        j = (Math.floor(Math.random() * (array.length)));
        random.push(array[j]);
        array.splice(j, 1);
      }
      return random;
  }
  //-------------------------------//
  const setVocabulary = (array) =>{
    let word = document.createElement('div');
      word.classList.add('English_word');
      word.innerHTML = `                
      <div class="card-front">
      <h2>Hãy Dịch Từ</h2>
      <div class = "word">                       
      <span >${array.title}</span>
      </div>
      </div>
      <div class="result card-back">
      </div>
      `
      return word
    }
    //--------------------------------//
    const checkAnswer = (word) =>{
      let flip = document.querySelector('.English_word');
      let answer = document.querySelector('.text');
      const submit = document.querySelector('.btn-submit');
      submit.onclick = function(){
        submit.style.cssText = "pointer-events:none; background-color:#3b2650;";
        if(word.translate.normalize() === answer.value.normalize())
        {
          displayAnswer('correct','Chính Xác','You are correct');
          flip.style.transform = `rotateY(180deg)`;
          result.splice(0,1);
          setTimeout(function(){
            main.style.animation = 'hide linear 0.5s forwards';
          },1000)
          setTimeout(function(){
            main.removeChild(flip);
            listVolcabulary(result);
            submit.style.cssText = "pointer-events:auto; background-color:##6c4298;"
            console.log(result);
          },2000)
        }
        else{
          displayAnswer('incorrect','Đáp Án Là',`${word.translate}`);
          flip.style.transform = 'rotateY(180deg)';
          result.splice(0,1);
          setTimeout(function(){
            main.style.animation = 'hide linear 1s forwards';
          },1000)
          setTimeout(function(){
            main.removeChild(flip);
            listVolcabulary(result);
            submit.style.cssText = "pointer-events:auto; background-color:##6c4298;"
            console.log(result);
          },2000)
        }
        answer.value = null;
      }
  }
  //---------------------------------//
  const displayAnswer = (type,msg,body) =>{
      let result = document.querySelector('.result');
      result.classList.add(type);
      result.innerHTML = `<h2>${msg}</h2>
      <div class = "word">                       
      <span >${body}</span>
      </div>`
  }
  start();
