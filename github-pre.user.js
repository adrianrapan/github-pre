// ==UserScript==
// @name        Github Word Wrapping for CODE blocks
// @namespace   gihubpre
// @description Switches word wrapping for CODE blocks in comments on github.com
// @author		Mak Alexey (S-ed, Sedokun)
// @include     http://github.com/*
// @include     https://github.com/*
// @version     0.150606.3
// @grant       none
// @license		MIT License
// @updateURL	https://github.com/S-ed/github-pre/raw/master/github-pre.user.js
// ==/UserScript==

// if Local Storage used, uncomment to reset default setting or type line in console
// localStorage.removeItem("wrapDefault")

// wrapDefault = true; if no Local Storage available, will enable word wrapping by default
// will reset on script update obviously

var wrapDefault = false;

preCSS = '\
.preButtonDiv {\
	cursor: pointer;\
	display: block;\
	right: 0px;\
	margin: 5px 35px 0 0;\
	position: absolute;\
	width: 16px;\
	height: 16px;\
	line-height: 16px;\
	border-radius: 8px;\
	text-align: center;\
	transition: .5s;\
}\
.comment-body .preButtonDiv{\
	margin-right: 20px\
}\
.preButtonDiv:hover {\
	transition: .3s;\
	background-color: #ccc;\
}'

if(typeof(localStorage) !== "undefined") {
	wrapDefault = localStorage.getItem("wrapDefault");
    if( wrapDefault == null ){
		if(confirm("github-pre userscript:\nWould You like to set word wrapping to 'enabled' by default?")){
			wrapDefault = true;
		} else wrapDefault = false;
		localStorage.setItem("wrapDefault", wrapDefault);
	}
} else console.warn("Sorry, no Local Storage Available\n\
Hardcoded 'wrapDefault' variable will be used instead (edit script to set)");

var preStyleSheet = document.createElement("style");
preStyleSheet.type = "text/css";
preStyleSheet.appendChild(document.createTextNode(preCSS));
document.head.appendChild(preStyleSheet);

document.addEventListener("DOMContentLoaded", initGithubPre);

function initGithubPre(){
	document.removeEventListener("DOMContentLoaded", initGithubPre);
	var preCollection = document.querySelectorAll(".markdown-body pre");
	for (var i = 0; i < preCollection.length; ++i) {
		addPreButton(preCollection[i]);
		if (wrapDefault) preCollection[i].firstChild.style.whiteSpace = "pre-wrap";
	}
}

function addPreButton(element){
	var preButtonDiv = document.createElement("div");
	var preButtonText = document.createTextNode("▾");
	preButtonDiv.appendChild(preButtonText);
	preButtonDiv.className = "preButtonDiv";
	element.parentNode.insertBefore(preButtonDiv, element);
	preButtonDiv.addEventListener("click", switchPreStyle, false);
}

function switchPreStyle(){
	var pre = this.nextSibling.firstChild.style;
	pre.whiteSpace = (pre.whiteSpace != "pre-wrap")?"pre-wrap":"pre";
}
