// 플레이 리스트를 가져온다
var listitems = document.querySelectorAll('li');
// 배열을 담아서 for문을 쓴 이유: 이벤트 함수를 모든 li태그에 적용시키기
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

function playMusic(li){
  // 요소의 속성은 element.getAttribute.
  var file = li.getAttribute('data-file'); //data-file은 이름지어준거
  var audio = document.querySelector('audio');
  // file 객체는 data-file 속성값이 담겨져서 setAttribute는는
  // src = data-file 속성값이 된다.
  audio.setAttribute('src',file);
  audio.play();
  // active한 항목을 변경
  var activeli = document.querySelector('.active');
  activeli.className = '';
  li.className = 'active';
}

// 재생 중과 정지 중 그림을 바꾼다
var audio = document.querySelector('audio');
audio.addEventListener('play',
  (e)=>{
    var img = document.querySelector('img');
    img.setAttribute('src', 'html practice/담비보리.jpg');
  }
);
audio.addEventListener('pause',
  (e)=>{
    var img = document.querySelector('img');
    img.setAttribute('src', 'pict_stop.png');
  }
);

// 곡을 끝까지 재생했을 때
audio.addEventListener('ended',
  (e)=>{
    var img = document.querySelector('img');
    img.setAttribute('src', 'pict_stop.png');
    // 다음 곡으로 전환
    var activeli = document.querySelector('.active');
    var nextli = activeli.nextElementSibling;
    if(nextli != null){
      playMusic(nextli);
    }
  }
);

// 랜덤 선곡 기능
var random = document.querySelector('#random');
random.addEventListener('click',
  (e)=>{
    e.preventDefault();
    var listitems = document.querySelectorAll('li');
    var len = listitems.length;
    var rnd = Math.floor(Math.random() * len);
    playMusic(listitems[rnd]);
  }
);
