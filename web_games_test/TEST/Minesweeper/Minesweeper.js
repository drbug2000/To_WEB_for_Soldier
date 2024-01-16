var tableSize =10;//게임판의 크기 (table**2)
var minecounts =15; //지뢰의 개수
/*본게임 난이도 참고
초보: (9,9/10) 12.3%
중급: (16,16/40) 15.6%
고수: (30,16/99) 20.6%
*/

var body = document.body;
var table = document.createElement('table');
var tbody = document.createElement('tbody');

//행 row 열 column / cell


var underground =[];//실제 지뢰 위치
var gameboard =[];//보여지는 게임판

var wincounts = 0;//확인한 칸 개수 카운터

//underground 생성
for(var i=0; i<tableSize ; i++){
		underground.push([]);
		for(var j=0;j<tableSize;j++){	
		underground[i].push(0);
		}
}

//본문 게임판 생성
for(var i =0;i< tableSize; i++){
	var rowTag = document.createElement('tr');
		gameboard.push([]);
	for(var j=0;j<tableSize; j++){
		
		var cell=document.createElement('td');
		cell.addEventListener('click',Fclick);
		cell.addEventListener('contextmenu',Fright);
		gameboard[i].push(cell);
		//cell.textContent = String(i)+String(j);//debug
		rowTag.appendChild(cell);
		
	}	
	tbody.appendChild(rowTag);
	
}
table.appendChild(tbody);	
body.appendChild(table);



//게임 세팅 함수 (시작/재시작)
var start_button=document.getElementsByClassName('start_button')[0];

//버튼 세팅
start_button.addEventListener('click', function() {
 
	if(start_button.textContent!=='시작'){
		start_button.textContent='시작';
	}
	gameset();
});


function gameset(){
	
	wincounts = 0;
	
	for(var i=0; i<tableSize ; i++){
		for(var j=0;j<tableSize;j++){	
		underground[i][j]=0;
		}
	}
	
	for(var i=0; i<tableSize ; i++){
		
		for(var j=0;j<tableSize;j++){	
		gameboard[i][j].classList='';
		gameboard[i][j].textContent='';
		//gameboard[i][j].style.backgroundPosition='0px -50px';
		}
	}
	
}


//cell 클릭 함수
function Fclick(e){
	//console.log(e.target);//DeBug 
	//console.log(matrix.indexOf(e.target));
	//console.log(Findindex(e.target));
	
	var coor=Findindex(e.target);
	var row = coor[0];
	var col = coor[1];
	
	//시작 위치 고려한 지뢰매설 
	if(wincounts===0){
		//gameboard[row][col].style.backgroundColor='white';
		//underground[row][col]=null;
		start_button.textContent='다시 시작';
		burial(row,col);
		settingNum();
	}
	
	
	//판단 및 도굴함수
	if(Excavate(row,col)===-1){
		//지뢰일 경우 이미 함수에서 판단함
	}
	
	if(wincounts>=(tableSize**2-minecounts)){
		alert('지뢰를 모두 피했습니다! 게임 승리!');
		start_button.textContent='시작';
	}
	
}


//우클릭 함수
function Fright(e){
	e.preventDefault();
	//console.log(Findindex(e.target));
	
	var coor=Findindex(e.target);
	//var row = coor[0];
	//var col = coor[1];
	var targetBoardCell= gameboard[coor[0]][coor[1]];
	//console.log(row);
	//console.log(col);
	
	
	//show '!' & '?'
	if(targetBoardCell.classList[0] !=='open'){//////////////////////////////
		if(targetBoardCell.classList[0] ===undefined){
			targetBoardCell.classList.add('flag');
			
		}else if(targetBoardCell.classList[0] ==='flag'){
			targetBoardCell.classList ='';
			targetBoardCell.classList.add('qmark');
		}else if(targetBoardCell.classList[0] ==='qmark'){
			targetBoardCell.classList ='';
		}else{
			console.log('R function have no case');
		}
	}
	
}

//gmaeboard open function
function Excavate(row,col){
	
	
	//벽
	if( (row<0)||(col<0)||(row>=tableSize)||(col>=tableSize)){//벽(게임판 밖 제거)
		//console.log(row+'/'+col+'out of board');
		return 0;
	}
	
	var targetBoardCell=gameboard[row][col];
	var targetUnderCell=underground[row][col];
	
	//이미 열렸는가+깃발이나 물음표 
	if( (targetBoardCell.classList[0] === 'open')||(targetBoardCell.classList[0] === 'flag')) {///////////////////////
		//console.log(row+'/'+col+'already open');
		return 0;
	}
	
	//지뢰인가
	if( targetUnderCell<0){
		
		targetBoardCell.classList.add('boom');
		
		alert('지뢰가 터졌습니다! 게임 종료');
		return -1;
	}
	
	
	
	if(  targetUnderCell > 0 ){//숫자인 경우
		
		//gameboard[row][col].textContent = underground[row][col];
		
		targetBoardCell.classList.add('open');//'열림'으로 처리
		targetBoardCell.classList.add('num'+ targetUnderCell);
		//gameboard[row][col].style.backgroundPosition = -1 * underground[row][col] * 50+'px'+' 0px';
		//console.log(row+'/'+col+'num');
		
		//칸 한개 발견
		wincounts++;
		return 0;
		
	}else{//아직 열리지 않은 0인경우
		
		targetUnderCell=null;//0->null 이미 열렸음을 표시(check already opened)
		targetBoardCell.classList.add('open');
		//console.log(row+'/'+col+'');
		
		//3*3으로 확장(본게임에 가까운 알고리즘)
		for(var i=-1; i<2 ; i++){
			for(var j=-1; j<2;j++){	
				Excavate(row+i,col+j);
			}
		}
		
		//칸 한개 발견
		wincounts++;
		return 0;
	}
	
	console.log('Excavate function error : have no case');
	return -2;
	/*
	ii.i)벽인가?
	iii) 0<숫자인가?
	iv) 0인가? 
	*/	
}


function Findindex(target){
	
	var row = null;
	var col = null;
	
	for(var i =0 ; i<tableSize; i++){
		
		col = gameboard[i].indexOf(target);
		if( col !== -1 ){
			row = i; 
			break;	
		}
	}
	return [row,col];
}


//지뢰코드 -1
//x,y는 첫클릭 좌표
function burial(x,y) {
	
	//지뢰 개수 오류
	if( (tableSize**2)-9 <= minecounts ){
		console.log('minecounts errorr : too many mine');
		return -1;
	}
	
	var counts = minecounts;
	var row;
	var col;
	while(counts != 0){
		
		row = Math.floor(Math.random()*tableSize);
		col = Math.floor(Math.random()*tableSize);
		
		//첫클릭위치 0만들기
		//3*3이내에 지뢰 설치 안하기
		if( (Math.abs(row-x)<2)&&(Math.abs(col-y)<2) )
			continue;
			
		//지뢰중복 제거
		if(underground[row][col] < 0)
			continue;
		
		underground[row][col] = -1 ;//지뢰 매설
		counts--;
	}
	
}


//지뢰주변에 숫자를 +1 뿌리기위해 지뢰를 찾는 함수
function settingNum(){
	
	function sprinkle(row,col){//지뢰 주변 3*3으로 +1을 뿌리는 함수
		for(var i=-1; i<2 ; i++){
			for(var j=-1; j<2;j++){	
				if( (row+i<0)||(col+j<0)||(row+i>=tableSize)||(col+j>=tableSize))//벽(게임판 밖 제거)
					continue;
				if(underground[row+i][col+j] === -1)
					continue;
				underground[row+i][col+j]++;
			}
		}
	}
	
	
	for(var i=0; i<tableSize ; i++){ 
		for(var j=0;j<tableSize;j++){
			if(underground[i][j]<0)
				sprinkle(i,j);
		}
	}
	
}

//2차 배열을 보여주는 디버깅용 함수(인데....console에서는 그냥 보여주네....)
function showArray( array ){
    
	for(var i=0; i<tableSize ; i++){
		var line=[];
		
		for(var j=0;j<tableSize;j++){	
			line.push( Number(array[i][j]) );
		}
		console.log(line);
	}
	
}


//underground 시각으로 디버깅위한 함수 (only console)(show())
function show(){
	var temp=[];
	for(var i =0;i< tableSize; i++){
			var rowTag = document.createElement('tr');
		
			temp.push([]);
		for(var j=0;j<tableSize; j++){
			var cell=document.createElement('td');
			cell.addEventListener('click',Fclick);
			temp[i].push(cell);
			cell.textContent = underground[i][j];
			rowTag.appendChild(cell);
		
		
		}
	
		table.appendChild(rowTag);
		
	}
	body.appendChild(table);
}
