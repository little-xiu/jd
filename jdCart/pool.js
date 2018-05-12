function setCookie(key,val,expires) {
	var d = new Date();
	d.setDate(d.getDate() + expires);
	document.cookie = key + '=' +  val + ';path=/;expires=' + d;
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