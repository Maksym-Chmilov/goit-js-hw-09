const t={body:document.querySelector("body"),start:document.querySelector("button[data-start]"),stop:document.querySelector("button[data-stop]")};let e=0;function o(){t.body.style.backgroundColor=`#${Math.floor(16777215*Math.random()).toString(16)}`}t.start.addEventListener("click",(function(){e=setInterval(o,1e3),t.start.disabled=!0,t.stop.disabled=!1})),t.stop.addEventListener("click",(function(){clearInterval(e),t.stop.disabled=!0,t.start.disabled=!1}));
//# sourceMappingURL=01-color-switcher.3caa143e.js.map