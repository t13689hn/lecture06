var INTERVAL = 1000;
var DEFAULT_MESSAGE = "終了";

var alarm = {
		duration: -1,
		message: ""
};

var formatCounterAsString = function(){
		return "あと" + alarm.duration + "秒";
};

var updateCounter = function(){
		alarm.output.textContent = formatCounterAsString();
};

var showAlarmMessage = function(){
		if(alarm.message.length > 0){
				alarm.output.textContent = alarm.message;
		}else{
				alarm.output.textContent = DEFAULT_MESSAGE;
		}
};

var update = function(){
		alarm.duration = alarm.duration - 1;
		if(isReadyToCountdown()){
				updateCounter();
				window.setTimeout(update, INTERVAL);
		}else{
				showAlarmMessage();
		}
};

var isReadyToCountdown = function(){
		return Number.isInteger(alarm.duration) && alarm.duration > 0;
};

var setupAlarm = function(durationString, message){
		alarm.duration = Number(durationString),
		alarm.message = message;
};

var startAlarm = function(){
		setupAlarm(alarm.durationSelect.value, alarm.messageInput.value);
		if(isReadyToCountdown()){
				updateCounter();
				window.setTimeout(update, INTERVAL);
		}
};

var initApp = function(){
		alarm.durationSelect = document.querySelector("#duration");
		alarm.messageInput = document.querySelector("#message");
		alarm.output = document.querySelector("#countdown");
		
		var startButton = document.querySelector("#start");
		startButton.addEventListener("click", startAlarm);
};

initApp();
