		var View = {

			resolvedMsg: function (value) { 
				return "<h1 style = 'background-color: lightseagreen; border-radius: 5px; color: white; padding:5px 10px;'>resolved value: <span'>" + value + "</span> <strong>&nbsp(wanted)</strong></h1>";
			},
			rejectedMsg: function (error) {
				return "<h1 style = 'background-color: lightpink; border-radius: 5px; color: white; padding:5px 10px;'>rejected value: <span >" + error + "</span> <strong>&nbsp(unwanted)</strong></h1>";
			},

			fatalErrMsg: function (error) { 
				return "<h1 style = 'background-color: lightcoral; border-radius: 50%; color: white; padding:5px 10px;'>Fatal Error: &nbsp<span style='color:red;'>" + error +"</span></h1>";
			}, 
			init: function() {

			}
		}


		var Controller = {

			writeMsg: function (msg) {
				
				document.getElementById("btn-container").innerHTML += msg;
				// document.write(msg);
			}
		}


		var Model = {


		}

		//***************************************jsonp experiment********************************************
		// window.onload =  function () {

		// 	$.ajax(
		// 	{
		// 		url:'/test',
		// 		type:'get',
		// 		dataType : 'json',
		// 		data: {
		// 			status: "status",
		// 			actid: "",
		// 			uin: ""
		// 		},
		// 		cache : false,
		// 		success:function(res){
		// 			if (res.ret == -1) $.alert(res.msg);
		// 		},
		// 		fail:function(ret){
		// 			$.alert(ret);
		// 		},
		// 		error:function(ret){
		// 			$.alert(ret);
		// 		}
		// 	}
		// 	)
		// }
		
		// var url = "http://localhost:3002/fordomain1";

		// function getJsonFrom_Domain2 () {
		// 	alert("hell");
		// 	var head = document.getElementsByTagName("head")[0];
		// 	var scriptTag = document.createElement("script");
		// 	scriptTag.setAttribute("src", url);
		// 	head.appendChild(scriptTag);
		// }     
		//***************************************jsonp experiment********************************************



		//***************************************chain promising********************************************
		// function init() {
		// 	let counter = 1;
		// 	return function (time) {
		//     	return new Promise(function(resolve, reject) {
		// 			setTimeout(
		// 				function() {
		// 					document.write('the '+(counter++)+' asynchronized request....I want an INT larger than 5');
		// 					let result = Math.ceil(Math.random()*10);
		// 					console.log(result);
		// 					if(result > 2) {
		// 						resolve(result);
		// 					} else {
		// 						reject(result);
		// 					}
		// 				},
		// 				time
		// 			);
		//     	});
		// 	}
		// }

		// var asynchronizedRequest = init();
		// var promise1 = asynchronizedRequest(500);
		// promise1
		// .then(
		// 	value => {
		// 		Controller.writeMsg(View.resolvedMsg(value))
		// 		return asynchronizedRequest(2000)
		//     }
		// )
		// .then(
		// 	value => {
		// 		Controller.writeMsg(View.resolvedMsg(value))
		// 		return asynchronizedRequest(3000)
		//     }
		// )
		// .then(
		//     value => Controller.writeMsg(View.resolvedMsg(value))
		// )
		// .catch(
		//     error => Controller.writeMsg(View.rejectedMsg(error))
		// );  
		//***************************************chain promising********************************************
		


		var code2MsgRes = {
			1: '读取文件成功',
			2: '网络通信成功',
			3: '数据库查询成功',
			4: '子进程计算成功'
		}

		var code2MsgRej = {
			1: '读取文件失败',
			2: '网络通信失败',
			3: '数据库查询失败',
			4: '子进程计算失败'			
		}

		var asynchronizedRequest = code => {
			return new Promise((resolve, reject) => {
				let seed = Math.ceil(Math.random()*10)
				if (seed > 2) {
					setTimeout(() => {
						resolve(code)
					}, code*1000)
				} else {
					setTimeout(() => {
						reject(code)
					}, code*1000)
				}
			})
		}
		var fileReading = () => asynchronizedRequest(1)

		var xhrSending = () => asynchronizedRequest(2)

		var dbQuerying = () => asynchronizedRequest(3)

		var childProComputing = () => asynchronizedRequest(4)

		var operation_1 = () => {
			return new Promise((resolve, reject) => {
				fileReading()
				.then (
					value => { 
						Controller.writeMsg(View.resolvedMsg(code2MsgRes[value]))
						return dbQuerying()
					}
				)
				.then (
					value => {
						resolve(code2MsgRes[value])
					}
				)
				.catch (
					error => {
						reject(code2MsgRej[error])
					}
				)
					
			});
		}

		var operation_2 = () => {
			return new Promise((resolve, reject) => {
				xhrSending()
				.then (
					value => {
						Controller.writeMsg(View.resolvedMsg(code2MsgRes[value]))
						return childProComputing()
					}
				)
				.then (
					value => {
						resolve(code2MsgRes[value])
					}
				)
				.catch (
					error => {
						reject(code2MsgRej[error])
					}
				)
			})
		}

		var begin_time = +new Date()

		setInterval(function() {
			let now = +new Date()
			let delta_time = ((now - begin_time) - (now - begin_time) % 100)/ 1000
			delta_time % 1 === 0? delta_time += ".0" : delta_time += ""
			document.getElementById("time-container").innerText = "异步操作开始了 " + delta_time + " 秒"
		}, 100)

		operation_1()
		.then( value => {
			Controller.writeMsg(View.resolvedMsg(value))
			return operation_2()
		})
		.then( value => {
			Controller.writeMsg(View.resolvedMsg(value))
		})
		.catch( error => {
			Controller.writeMsg(View.rejectedMsg(error))
		})

