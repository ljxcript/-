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
				document.write(msg);
			}
		}


		var Model = {


		}
		function init() {
			let counter = 1;
			return function (time) {
		    	return new Promise(function(resolve, reject) {
					setTimeout(
						function() {
							document.write('the '+(counter++)+' asynchronized request....I want an INT larger than 5');
							let result = Math.ceil(Math.random()*10);
							console.log(result);
							if(result > 5) {
								resolve(result);
							} else {
								reject(result);
							}
						},
						time
					);
		    	});
			}
		}



		var asynchronizedRequest = init();
		var promise1 = asynchronizedRequest(500);

		promise1
		.then(
			value => {
				Controller.writeMsg(View.resolvedMsg(value))
				return asynchronizedRequest(2000)
		    }
		)
		.then(
			value => {
				Controller.writeMsg(View.resolvedMsg(value))
				return asynchronizedRequest(3000)
		    }
		)
		.then(
		    value => Controller.writeMsg(View.resolvedMsg(value))
		)
		.catch(
		    error => Controller.writeMsg(View.rejectedMsg(error))
		);
