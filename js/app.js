var INTERVAL = 1000;//1000mm秒ごとに、INTEERVALを設定する
var DEFAULT_MESSAGE = "終了";//messageの初期設定を「終了」にする

var alarm = {
		duration: -1,//durationの数値が１ずつカウントが減っていく
		message: ""//messageは自由に記入を行うこととする
};

var formatCounterAsString //動作の定義付け
= function(){
		return "あと" + alarm.duration + "秒";//残り時間の表示。."alarm.duration"の値の周囲に"あと"と"秒"をつけることで、残り秒数の表示になっている
};

var updateCounter //動作の定義付け
= function(){
		alarm.output.textContent = formatCounterAsString();//２７段目のalarm.output.textContentにformatCounterAsStringのメッセージを反映させる
};

var showAlarmMessage = function(){
		var message = DEFAULT_MESSAGE;//２段で設定したメッセージを表示させる
		if(alarm.message.length > 0){
				message = alarm.message;//残りの秒数が０以上のとき、messageはalarm.messageを表示する
		}
		if(Notification.permission == "granted"){//表示させる条件がそろったとき、別枠メッセージを表示する
				var notification = new Notification(message);
		}
		alarm.output.textContent = message;//16段目の通り、９段目のformatCounterAsStringのメッセージを表示させる
};

var update = function(){ 
		alarm.duration = alarm.duration - 1;//alarm.durationの値から１減った数値が40段目のisReadyToCountdownに該当するかどうかの条件づけ

		if(isReadyToCountdown()){
				updateCounter();
				window.setTimeout(update, INTERVAL);//isReadyToCountdownに該当する場合、//1000mm秒経過したら、updateという関数を呼び出す
		}else{
				showAlarmMessage();
		}//該当しない場合、AlarmMessageを表示させる
};

var isReadyToCountdown = function(){
		return Number.isInteger(alarm.duration)		 &&		  alarm.duration 
		  > 0;//残り秒数かつ減らす秒数の残りが０以上の場合、カウントダウンを行う
};

var setupAlarm = function(durationString, message){ //=alarm.durationSelect.value, alarm.messageInput.value
		alarm.duration = Number(durationString),//durationStringは数字であるということを説明している
		alarm.message = message;//alarm.messageInput.valueで記入したmessageをalarm.messageとして使用する
};

var startAlarm = function(){
		setupAlarm(alarm.durationSelect.value, alarm.messageInput.value);
		if(isReadyToCountdown())//isReadyToCountdownの条件がそろっているかの条件付け
		{
				updateCounter();
				window.setTimeout(update, INTERVAL);//1000mm秒のINTERVALが経過したとき、したとき、updateの動作を行う
		}
};

var initApp = function(){
		alarm.durationSelect = document.querySelector("#duration");//選択式の部分の表示文をdurationと名付ける
		alarm.messageInput = document.querySelector("#message");//記入式の部分の表示文をmessageと名付ける
		alarm.output = document.querySelector("#countdown");//alarmを終えたときの表示文をcountdownと名付ける

		Notification.requestPermission(function(status){
				if(Notification.permission != status){//Nortification.permissionがstatusでない場合、
						Notification.permission = status;//別枠で告知を行う
				}
		});

		var startButton = document.querySelector("#start");
		startButton.addEventListener("click", startAlarm);
//クッリク時にstartAlarmの関数を呼び出す。
};

initApp();
