var INTERVAL = 1000;
var DEFAULT_MESSAGE = "終了";

var timer = {
		duration: -1,
		message: ""
};

var formatCounterAsString = function(){
		return "あと" + timer.duration + "秒";
};

var updateCounter = function(){
		timer.output.textContent = formatCounterAsString();
};

var showAlermMessage = function(){
		if(timer.message.length > 0){
				timer.output.textContent = timer.message;
		}else{
				timer.output.textContent = DEFAULT_MESSAGE;
		}
};

var update = function(){
		timer.duration = timer.duration - 1;
		if(isReadyToCountdown()){
				updateCounter();
				window.setTimeout(update, INTERVAL);
		}else{
				showAlermMessage();
		}
};

var isReadyToCountdown = function(){
		return Number.isInteger(timer.duration) && timer.duration > 0;
};

var setupTimer = function(durationString, message){
		timer.duration = Number(durationString),
		timer.message = message;
};

var startTimer = function(){
		setupTimer(timer.durationSelect.value, timer.messageInput.value);
		if(isReadyToCountdown()){
				updateCounter();
				window.setTimeout(update, INTERVAL);
		}
};

var initApp = function(){
		timer.durationSelect = document.querySelector("#duration");
		timer.messageInput = document.querySelector("#message");
		timer.output = document.querySelector("#countdown");
		
		var startButton = document.querySelector("#start");
		startButton.addEventListener("click", startTimer);
};

initApp();
