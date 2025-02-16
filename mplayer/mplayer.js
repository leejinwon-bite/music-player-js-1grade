// 플레이 리스트를 가져온다
var listitems = document.querySelectorAll('li');
// 배열을 담아서 for문을 쓴 이유: 콜백 함수를 모든 li태그에 적용시키기
//위함
for(var i=0; i<listitems.length;i++){
  // click 이벤트를 설정
  listitems[i].addEventListener('click',
    (e)=>{
      var li = e.target;
      playMusic(li); //customized 함수아래 정의.
    }
  );
}

// 다른 여러개의 곡이 있으면 한개의 <audio>에서 속성바꾸고 audio실행.
function playMusic(li){
  // 요소의 속성은 element.getAttribute.
  // li는 위에서 아래로 요소 1개씩을 말함.
  var file = li.getAttribute('data-file'); //data-file은 이름지어준거
  var audio = document.querySelector('audio');
  // file 객체는 data-file 속성값이 담겨져서 setAttribute는
  // src = data-file 속성값이 된다.
  // <audio>태그는 1개 밖에 없음.
  audio.setAttribute('src',file);
  // play()는 재생하는 함수임.
  audio.play();
  // class 속성이 active인 요소를 말함. active에는 css가 적용되어
  // 있다. 주황색깔인데, 밑에 코드는 곡이 바뀔때 마다
  //  현재곡의 디자인을 주황색으로 처리하고 이전 요소는 주황색
  // 디자인을 없앰.
  // activeli는 맨위에 있는 li태그차례가 오면 위에서 하나씩 실행 되므로 
  // null값이 되었다가 다시 class='active' 가된다.
  // 첫번째 li태그에서 다음곡으로 바뀔때는 다음곡에서 class 속성이 null
  // 로 되었다가 다시 active로 되지는 않고 그냥 active 1번만 적용됨.
  // 이유는 activeli가 의미하는 것과 e.target인 현재 요소를 가리키는
  // 것하고 시간차이가 있기 때문이다. 시간차이는 activeli가 느리다고
  // 보면 된다. 다음 li가 되었는데도, 이전곡의 class는 바로 바뀌지 않고,
  // 밑에 2줄 실행문이 실행되고 나서야 null값이 된다. 그리고 1번 실행한
  // 실행문은 자동으로 2번 3번 실행되는것이 아니라, 1번만 실행되기 때문.
  // 그에 반해 li는 e.target인 바로 현재 태그를 바로 의미하는것이라 
  // 시간이 빠르다고 할 수 있다.
  // 만약 아무 음악도 실행 안하고, 순서 건너뛰고 3, 4번째 li태그를 눌르면
  // 마찬가지로 누른 li 태그역시도 class 값이 null로 되엇다가 active
  // 가 되는것이 아닌 그냥 1번 active가 될뿐임.
  var activeli = document.querySelector('.active');
  activeli.className = '';
  li.className = 'active';
}

// 재생 중과 정지 중 그림을 바꾼다
var audio = document.querySelector('audio');
// play도 click처럼 이벤트 객체임.
audio.addEventListener('play',
  (e)=>{
    var img = document.querySelector('img');
    img.setAttribute('src', 'html practice/담비보리.jpg');
  }
);
// pause도 click처럼 이벤트 객체임
audio.addEventListener('pause',
  (e)=>{
    var img = document.querySelector('img');
    img.setAttribute('src', 'html practice/beming.jpg');
  }
);

// 곡을 끝까지 재생했을 때 다음 곡 재생.
audio.addEventListener('ended', //뮤직 1곡 끝났을 경우에
  (e)=>{
    var img = document.querySelector('img');
    img.setAttribute('src', 'html practice/20150627담비생일');
    // 다음 곡으로 전환
    var activeli = document.querySelector('.active'); //현재 li
    var nextli = activeli.nextElementSibling; // 바로 다음 같은 요소
    if(nextli != null){ //바로 다음 같은 요소가 있으면면
      playMusic(nextli); //곡이 끝나는 이벤트 발생시 play()
    }
  }
);

// 랜덤 선곡 기능
var random = document.querySelector('#random');
random.addEventListener('click',
  (e)=>{
    e.preventDefault();
    var listitems = document.querySelectorAll('li');
    var len = listitems.length; //배열의 길이
    var rnd = Math.floor(Math.random() * len); //랜덤 난수
    playMusic(listitems[rnd]);
  }
);
