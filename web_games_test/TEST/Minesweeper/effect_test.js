var tableSize =2;//게임판의 크기
var minecounts =4; //지뢰의 개수


var body = document.body;
var table = document.createElement('table');
//행 row 열 column / cell

var underground =[];//실제 지뢰 위치
var matrix =[];//보여지는 게임판
//var turn='X';


//본문 게임판 생성
for(var i =0;i< tableSize; i++){
	var rowTag = document.createElement('tr');
		
		matrix.push([]);
	for(var j=0;j<tableSize; j++){
		var cell=document.createElement('td');
		//cell.addEventListener('click',Fclick);
		
		//cell.addEventListner('contextmenu',Fclick);
		cell.addEventListener('contextmenu',function(e){
			
			e.preventDefault();
			console.log('우클릭');
			
		});
		matrix[i].push(cell);
		//cell.textContent = String(i)+String(j);
		rowTag.appendChild(cell);
		
		
	}
	
	table.appendChild(rowTag);
		
}
body.appendChild(table);


var boom = document.createElement('img');

boom.src = "BOOM.png";
matrix[1][0].appendChild(boom);
matrix[1][1].classList.add('flag');
/*
var src = document.getElementById("x");
src.appendChild(img);
*/

//cell 클릭시 일어나는 반응
function Fclick(e){
	console.log("click work");
	console.log(e.target);//그줄 
	//console.log(matrix.indexOf(e.target));
	console.log(Findindex(e.target));
	
	
	
	
}



/*
window.oncontextmenu = function ()
{
    showCustomMenu(); //이부분이 에러.... 없는 함수 라고 뜸
    return false;     // cancel default menu
}



document.body.onclick = function (e) {
    var isRightMB;
    e = e || window.event;

    if ("which" in e)  // Gecko (Firefox), WebKit (Safari/Chrome) & Opera
        isRightMB = e.which == 3; 
    else if ("button" in e)  // IE, Opera 
        isRightMB = e.button == 2; 

    alert("Right mouse button " + (isRightMB ? "" : " was not") + "clicked!");
} 


*/