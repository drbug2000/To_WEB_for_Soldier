function rand() { return  Math.floor(Math.random()*9)+1;}

/*
var pitch = [ rand(), rand() , rand() ];
*/

var altergameButton = document.createElement('button');
altergameButton.textContent ='대화창으로 게임시작';
document.body.append(altergameButton);
/*
altergameButton.addEventListener('click',function () { 
	altergameStart()
});
*/

var formTag = document.createElement('form');
document.body.append(formTag);





var sign = document.createElement('div');
sign.textContent = '게임시작';
formTag.append(sign);

var swingButton = document.createElement('button');
swingButton.textContent = "휘둘러 맞추기!";
formTag.append(swingButton);

var enter = document.createElement('input');
formTag.append(enter);





var pitch = [];//같은 숫자 중복 회피 필요
	for(var i=0;i<3;i++){
		pitch.push( rand() );
		/*
		for(var k=0;k<i;k++){
			if(pitch[i]===pitch[k]){
				pitch.pop();
				pitch.push( rand() );
				continue;	
			}
		}
		*/
		var k=0;
		while(k !== i){
			if(pitch[i]===pitch[k]){
				pitch.pop();
				pitch.push( rand() );
				continue;	
			}
			k++;	
		}
}

var billboard = null;

	var swing =null;

	var s ;
	var b ;	


swingButton.addEventListener('click',function callback (e) {
	
		e.preventDefault();
	
		s = 0 ;
		b = 0 ; 
	
		swing =  String(enter.value);
	
	
	
		//s 계산
		for( var i=0; i<3 ; i=i+1 ){
			if(swing[i]==pitch[i]){//자료형이 달라 '=='으로 비교함
				s++;
			}
		}
	
	    //b+s 계산
		for(var i=0; i<3 ; i=i+1 ){
		
			for(k=0; k<3 ; k=k+1){
				if(swing[i]==pitch[k]){//자료형이 달라 '=='으로 비교함
					b++;
				}
			} 
		}
	
	
		//s제외한 b 계산
		b = b - s;//중복 제거
	
		if( s===0 && b===0){
			sign.textContent='out!';
			billboard ='out';
			
		}else{
			sign.textContent= s+' 스트라이크  '+b+' 볼 입니다!';
			billboard =  s + 's  ' +b+ 'b'+'!'; 
		}
		
		//document.write(swing + ' -> ' +billboard+'!'+'<br>');
	
	
	var log = document.createElement('div');
	log.textContent = swing + ' -> ' + billboard;
	document.body.append(log);
	
	
	
	enter.value=null;
	enter.focus();

	if(s===3){
		sign.textContent = '3스트라이크! 게임 끝!';
	}
	})

/*2022.05.02 패치노트
1. form을 씌우지고 submit을 add 하지는않았지만, 그냥 form만 씌워도 enter가 되더라
2. 그래도 preventDefault는 사용함
3. <li>로 기록을 갱신하는 것은 생각보다 어려워서, (자식의 개념 필요한듯) 그냥 <div>의 나열로 원하는 바를 이룸 ( billboard)
4. ****알림 야구 함수를 재활용하려했으나 계속오류 -> 알고보니 addEventListener를 한순간, 코딩의 방식이 바뀜
   아예 다른 방식(not while)으로 코드를 고쳐 해결
   
*/	
	














/////////////////////////알림으로 야구


function altergameStart(){

var pitch = [];//같은 숫자 중복 회피 필요
for(var i=0;i<3;i++){
	pitch.push( rand() );
	/*
	for(var k=0;k<i;k++){
		if(pitch[i]===pitch[k]){
			pitch.pop();
			pitch.push( rand() );
			continue;	
		}
		
	}
	*/
	var k=0;
	while(k !== i){
		if(pitch[i]===pitch[k]){
			pitch.pop();
			pitch.push( rand() );
			continue;	
		}
		k++;	
	}
}


var billboard = null;

var swing =null;

var s ;
var b ;
	

while( s!=3 ){
	
	s = 0 ;
	b = 0 ; 
	
	swing =  String(prompt('투수가 공을 던졌습니다!') );
	
	if( swing==='null'){
		break;
	} //취소시 종료
	
	
	
	for( var i=0; i<3 ; i=i+1 ){
		if(swing[i]==pitch[i]){//자료형이 달라 '=='으로 비교함
			s++;
		}
	}
	
	for(var i=0; i<3 ; i=i+1 ){
		
		for(k=0; k<3 ; k=k+1){
			if(swing[i]==pitch[k]){//자료형이 달라 '=='으로 비교함
				b++;
			}
		} 
	}
	
	b = b - s;//중복 제거
	
	if( s===0 && b===0){
		alert('아웃!');
		
		billboard = 'out';
	}else{
		alert(s+' 스트라이크  '+b+' 볼 입니다!');
		billboard = s + ' s  ' +b+ ' b'; 
	}
	
	document.write(swing + ' -> ' +billboard+'!'+'<br>');
}

if(s===3){
	alert('3스트라이크! 게임 끝!');
}

	
	
	
}