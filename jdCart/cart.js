//footer实现固定定位
var fixedFt = document.getElementById('fixed-ft');
var iTop = document.documentElement.clientHeight - fixedFt.offsetHeight;
fixedFt.style.top = iTop + 'px';
window.onscroll = function() {
	var scrollT = document.documentElement.scrollTop || document.body.scrollTop;
	fixedFt.style.top = scrollT + iTop + 'px';
}
function getCookie(key) {
	var acookie = document.cookie;
	var arr = acookie.split('; ');
	for(let i = 0; i < arr.length; i++) {
		var newArr = arr[i].split('=');
		if(newArr[0] == key) {
			return newArr[1];
		}
	}
}
function setCookie(key,val,expires) {
	var d = new Date();
	d.setDate(d.getDate() + expires);
	document.cookie = key + '=' + val + ';path=/;expires=' + d;
}
//通过类名找到元素，实现了兼容
function getEleByclassName(parent,name) {
	var arr = parent.getElementsByTagName('*');
	var newArr = [];
	for (var i = 0; i < arr.length; i++) {
		var reg = new RegExp('\\b' + name + '\\b');
		if(reg.test(arr[i].className)) {
			newArr.push(arr[i]);
		}
	}
	return newArr;
}
var data = [
	{'id':'01','img':'imgs/listpro1.jpg', 'pName': '小米MIX2 全面屏游戏手机 6GB+64GB 黑色 全网通4G手机 双卡', 'color':'黑', 'size': '6GB 64GB', 'unitPrice': '¥2899.00', 'num': '1', 'sum':'¥2899.00'},
	{'id':'02','img': 'imgs/hengshi.jpg', 'pName': '亨氏 (Heinz) 宝宝辅食 婴儿米粉 婴儿营养米粉超值装 (辅食添加初期-36个月适用)400g', 'color': '婴儿原味-400g', 'unitPrice':'¥40.00', 'num':'4', 'sum': '¥160.00'},
	{'id':'03','img': 'imgs/xifa.jpg', 'pName': '沙宣无硅油洗发水轻润裸感500ml（即享沙龙级净澈）', 'color': '轻润裸感500ml', 'unitPrice': '¥59.80', 'num': '1', 'sum':'¥59.80'},
	{'id': '04', 'img': 'imgs/apple.jpg', 'pName': 'Apple 苹果 iPhone X 全面屏手机 深空灰色 全网通 64GB', 'color': '深空灰色', 'unitPrice': '¥7528.00', 'num': '1', 'sum': '¥7528.00'}
];
var str = '';
var fixedSum = document.getElementById('fixed-sum');
//保留两位小数
function returnFloat(value) {
	value = Math.round(value*100) / 100;
	var arr = value.toString().split('.');
	if(arr.length == 1) {
		value = value.toString() + '.00';
		return value;
	}
	if(arr.length > 1) {
		if(arr[1].length == 1) {
			value = value.toString() + '0';
		}
		return value;
	}
}
if(getCookie('init')) {
	var obj = JSON.parse(getCookie('init'));//{"01":6} => {01: 6} json字符串转json对象
	for(var key in obj) {//for in 循环对象属性
		for(var i = 0; i < data.length; i++) {
			if(data[i].id == key) {
				let uPrice = data[i].unitPrice.slice(1);
				let sunPrice = returnFloat(obj[key]*uPrice);
				str += '<div class="cart-item clearfix">\
									<div>\
										<input type="checkbox" class="checkBtn">\
									</div>\
									<div class="product">\
										<div class="pro-img">\
											<a href="#">\
												<img src="'+data[i].img+'">\
											</a>\
										</div>\
										<div>\
											<p class="p-name">\
												<a href="#">\
													<span class="jd-market">京东超市</span>\
													'+data[i].pName+'\
												</a>\
											</p>\
											<p class="p-return">支持7天无理由退货</p>\
										</div>\
									</div>\
									<div class="p-color">\
										<p>颜色：'+data[i].color+'</p>\
										<p>尺码：'+data[i].size+'</p>\
									</div>\
									<div class="unit-price">\
										<p>'+data[i].unitPrice+'</p>\
										<p class="mark-down">降价：¥10.10</p>\
									</div>\
									<div class="p-num-box">\
										<p class="p-num" id="j-add">\
											<a href="#" class="reduce">-</a>\
											<input type="text" class="inum" value="'+obj[key]+'">\
											<a href="#" class="add">+</a>\
										</p>\
										<p class="has-pro">有货</p>\
									</div>\
									<div class="sum" id="sum">￥'+sunPrice+'</div>\
									<div class="del-box">\
										<a href="#" class="del-btn">删除</a>\
										<a href="#" class="move-btn">移到我的关注</a>\
										<a href="#" class="add-btn">加到我的关注</a>\
									</div>\
								</div>'
				fixedSum.innerHTML = '￥' + sunPrice;				
			}
		}
	}	
	var oList = document.getElementById('cart-list');
	oList.innerHTML = str;
	setCookie('second',obj);
	// 全选
	var acheckAll = document.querySelectorAll('.checkAll');
	let asingleCheck = getEleByclassName(oList,'checkBtn');
	for(let i = 0; i < acheckAll.length; i++) {
		acheckAll[i].onclick = function() {
			if(this.checked) {
				for(let i = 0; i < acheckAll.length; i++) {
					acheckAll[i].checked = true;
				}
				for(let i = 0; i < asingleCheck.length; i++) {
					asingleCheck[i].checked = true;
				}
			} else {
				for(let i = 0; i < acheckAll.length; i++) {
					acheckAll[i].checked = false;
				}
				for(let i = 0; i < asingleCheck.length; i++) {
					asingleCheck[i].checked = false;
				}
			}
		}
	}
	//事件代理
	oList.onclick = function(e) {
		var e = e || event;
		var target = e.target || e.srcElement;
		//用事件代理做反选
		if(target.tagName == 'INPUT' && target.className == 'checkBtn') {
			var flag = false;
			for(let i = 0; i < asingleCheck.length; i++) {
				//判断只要有一个没选中，就不能全选
				if(!asingleCheck[i].checked) {
					flag = true;
					break;
				}
			}
			//flag为true说明存在一个没选中
			if(flag) {
				for(let i = 0; i < acheckAll.length; i++) {
					acheckAll[i].checked = false;
				}
			} else {
				for(let i = 0; i < acheckAll.length; i++) {
					acheckAll[i].checked = true;
				}
			}
		}
		//加减功能
		var sumBtn = document.getElementById('sum');
		if(target.tagName == 'A' && target.className == 'reduce') {
			let val = target.nextElementSibling.value;
			if(val <= 2) {
				val = 1;
				target.nextElementSibling.value = val;
			} else {
				val--;
				target.nextElementSibling.value = val;
			}
			//点击-时计算总价
			let singlePrice = target.parentNode.parentNode.previousElementSibling.firstElementChild;
			let sumVal = val * singlePrice.innerHTML.substr(1);
			sumBtn.innerHTML = '￥' + returnFloat(sumVal);
			fixedSum.innerHTML = '￥' + returnFloat(sumVal);
		}
		if(target.tagName == 'A' && target.className == 'add') {
			let val = target.previousElementSibling.value;
			val++;
			target.previousElementSibling.value = val;
			//点击+时计算总价
			let singlePrice = target.parentNode.parentNode.previousElementSibling.firstElementChild;
			let sumVal = 	val * (singlePrice.innerHTML.substr(1));
			sumBtn.innerHTML = '￥' + returnFloat(sumVal);
			fixedSum.innerHTML = '￥' + returnFloat(sumVal);
		}
		//删除功能
		if(target.tagName == 'A' && target.className == 'del-btn') {
			target.parentNode.parentNode.parentNode.remove();
		}
		
	}
	
}
//固定footer上的删除事件
var ofixDel = document.getElementById('fix-del');
console.log(1)
ofixDel.onclick = function() {
	var acheckBtn = document.querySelectorAll('.checkBtn');
	for(let i = 0; i < acheckBtn.length; i++) {
		if(acheckBtn[i].checked) {
				acheckBtn[i].parentNode.parentNode.remove();
		}
	}
}