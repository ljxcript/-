

var candidates = new Array('abc', 'abcd', 'acc', 'dda', 'ccc', 'aaa');

var arrToShow = new Array();

var currentItem = null;

function clearList() {
	var listContainer = document.getElementById("list-container");
	listContainer.innerHTML = "";
	listContainer.style.opacity = "0";
	arrToShow.length = 0;
}

function handleKeyUp(e) {
	var ev = e || window.event;
	if (ev.keyCode === 38 || ev.keyCode === 40 || ev.keyCode === 13) {
		processKeySelect(e.keyCode);
		return;
	} else {
		currentItem = null; //每次处理非上下方向键和非enter键，置空item下标方便方向键选择	
		clearList();
		var value = document.getElementById("search").value;
		if (value === "")  {
			showList(candidates);
			return;
		}
		var arrLength = candidates.length;
		for (var i = 0; i < arrLength; i++) {
			inspectCandidates(i, value);
		}
		if (arrToShow.length !== 0 ){
			showList(arrToShow);
		}
	}
}


function inspectCandidates(i, value) {
	var index = candidates[i].indexOf(value.trim());
	if (arrToShow.indexOf(candidates[i]) !== -1 && index !== -1) {
		index = -1;
	}
	if (index ===  0) {
		arrToShow.push(candidates[i]);
	}

}

function showList(arr) {
	var fragment = document.createDocumentFragment();
	var arrLength = arr.length;
	for (var i = 0; i < arrLength; i++) {
		var listItem = document.createElement("div");
		listItem.setAttribute("class", "list-item");
		listItem.innerHTML = arr[i];
		fragment.appendChild(listItem);
	}
	var listContainer = document.getElementById("list-container");
	listContainer.appendChild(fragment);
	listContainer.style.opacity = "1";

}

function showAfterFocus() {
	if (document.getElementById('search').value === "")
		showList(candidates);
	else
		handleKeyUp();
}

function chooseItem(e) {

	var ev = e || window.event;
	var target = ev.srcElement || ev.target;
	if (target.getAttribute("class") === "list-item-focus") {
		document.getElementById("search").value = target.innerHTML;

	}
	currentItem = null;
	clearList();
}

function processKeySelect(keyCode) {

	if (keyCode === 38 || keyCode === 40) {
		if (keyCode === 38) processUpKey();
		if (keyCode === 40) processDownKey();
		var item = (document.getElementById("list-container").childNodes)[currentItem];
		changeItemColor(item);
	}
	//enter键选中非空item
	if (currentItem !== null && keyCode == 13) {
		selectItemByKey(currentItem);
	}
}


function processUpKey() {
	if (currentItem === null) {
		currentItem = arrToShow.length == 0? candidates.length - 1: arrToShow.length - 1;
	} else {
		if (arrToShow.length == 0) {
			currentItem = currentItem <=0? candidates.length - 1:currentItem - 1;
		} else {
			currentItem = currentItem <= 0? arrToShow.length - 1:currentItem - 1;
		}
	}
}

function processDownKey() {
	if (currentItem === null) {
		currentItem = 0;
	} else {
		if (arrToShow.length == 0) {
			currentItem = (currentItem + 1) % candidates.length;
		} else {
			currentItem = (currentItem + 1) % arrToShow.length;
		}
	}

}


function changeColorDelegate(e) {
	var ev = e || window.event;
	var target = ev.srcElement || ev.target;
	if (target.getAttribute("class") == "list-item") {
		changeItemColor(target);
	}
}


function changeItemColor(item) {
	clearOthersColor();
	if (typeof item !== "undefined") {
		item.setAttribute("class", "list-item-focus");
	}
}
	

function clearOthersColor() {
	var items = document.getElementsByClassName("list-item-focus");
	var len = items.length;
	for (var i = 0; i < len; i++) {
		items[i].setAttribute('class', 'list-item');
	}
}



function selectItemByKey(index) {
	var search = document.getElementById("search");
	search.value = arrToShow.length == 0? candidates[index] : arrToShow[index];
	clearList();
	currentItem = null;
}


function whenInputBlur() {
	currentItem = null;
	setTimeout(clearList, 200);//鼠标选取List-item的时候也会出发blur事件，因此需要延迟100ms清空list-container,否则点击选取不到
}


//封装了添加事件的方法达到兼容ie8及更老版本ie的效果
function addEvent(ele, evType, fn, useCapture) {
	if (ele.addEventListener) {
		ele.addEventListener(evType, fn, useCapture); //DOM2.0
	} else {
		if (ele.attachEvent) {
			var r = ele.attachEvent('on'+evType, fn);
		} else {
			ele['on' + evType] = fn;
		}
	}
		
}
	

window.onload = function() {

	var listContainer = document.getElementById("list-container");
	var sinput = document.getElementById("search");

	addEvent(listContainer, 'mouseover', changeColorDelegate, false);
	addEvent(listContainer, 'click', chooseItem, false);
	addEvent(sinput, 'keyup', handleKeyUp, false);
	addEvent(sinput, 'focus', showAfterFocus, false);
	addEvent(sinput, 'blur', whenInputBlur, false);

}