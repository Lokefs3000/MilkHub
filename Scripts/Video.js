//Localhost = 12, Github = 20
var website = window.location.href;
var trimmed = website.substring(website.indexOf("/", 10) + 12);

var hasloaded = false;
var isPause = false;

function PauseAndPlay() {
    var video = document.getElementById('video');

    isPause = !isPause;

    if (isPause) {
        video.pause();
        document.getElementById("type").src = "Data/Images/Play.png";
    }
    else {
        video.play();
        document.getElementById("type").src = "Data/Images/Pause.png";
    }
}

function loadVideo() {
    if (!hasloaded) {
        var video = document.getElementById('video');

        var source720 = document.createElement('source');
        var source480 = document.createElement('source');
        var source320 = document.createElement('source');

        source720.setAttribute("src", "Data/Videos/" + trimmed + "/720.mp4");
        source480.setAttribute("src", "Data/Videos/" + trimmed + "/480.mp4");
        source320.setAttribute("src", "Data/Videos/" + trimmed + "/320.mp4");

        source720.setAttribute("type", "video/mp4");
        source480.setAttribute("type", "video/mp4");
        source320.setAttribute("type", "video/mp4");

        source720.setAttribute("size", "720");
        source480.setAttribute("size", "480");
        source320.setAttribute("size", "320");

        video.appendChild(source720);
        video.appendChild(source480);
        video.appendChild(source320);

        video.setAttribute("src", "Data/Videos/" + trimmed + "/720.mp4");

        document.getElementById("time").setAttribute("value", "0");

        var i = setInterval(function() {
            if(video.readyState > 0) {
                document.getElementById("time").setAttribute("max", video.duration);
            
                clearInterval(i);
        }
        }, 200);    

        document.getElementById("type").src = "Data/Images/Pause.png";

        hasloaded = true;

        video.play();
    }
    else {
        PauseAndPlay();
    }
}

function changeRes(res) {
    var video = document.getElementById('video');
    video.setAttribute("src", "Data/Videos/" + trimmed + "/"+res+".mp4");
    video.currentTime = document.getElementById("time").value;
    
    if (!isPause && hasloaded)
        video.play();

    document.getElementById("720").style.color = "gray";
    document.getElementById("480").style.color = "gray";
    document.getElementById("320").style.color = "gray";

    document.getElementById(res).style.color = "black";

    settings = false;
} 

var isGrabbed = false;

function updateTimeLoop() {
    var video = document.getElementById('video');
    var time = document.getElementById('time');

    setTimeout(function() {
        if (video) {
            if (!isGrabbed)
                time.value = video.currentTime;
        else
            if (video.currentTime != time.value) {
                video.currentTime = time.value;
            }
        }

        if (settings) {
            wait = 5;
            document.getElementById("settingsDiv").style.visibility = "visible";
        }
        else {
            document.getElementById("settingsDiv").style.visibility = "hidden";
        }

        if (video) {
            video.muted = isGrabbed

            var minutes = 00;
            var seconds = 00;

            seconds = video.duration % 60 - (document.getElementById("time").value % 60);
            minutes = parseInt(video.duration / 60) - (document.getElementById("time").value / 60);

            document.getElementById("timeLeft").innerHTML = Math.round(minutes) + ":" + Math.round(seconds);
        }

        if (video) {
            if (wait > 0) {
                wait -= 0.05;
    
                document.getElementById("controls").style.visibility = "visible";
                document.getElementById("type").style.visibility = "visible";
            }
            else {
                document.getElementById("controls").style.visibility = "hidden";
                document.getElementById("type").style.visibility = "hidden";
            }
        }

        updateTimeLoop();
    }, 1);
}

updateTimeLoop();

var settings = false;
var Fullscreen = false

function fullscreenButton() {
    Fullscreen = !Fullscreen

    if (Fullscreen) {
        document.getElementById("video").style.width = "100%";
        document.getElementById("video").style.height = "100%";
        document.getElementById("video").style.left = "0%";
        document.getElementById("video").style.top = "0%";
        document.getElementById("video").style.transform = "none";
        document.body.style.backgroundColor = "black";
        document.getElementById("top").style.visibility = "hidden";
        document.getElementById("controls").style.width = "100%";
        document.getElementById("controls").style.top = "calc(100% - 25px)";
    }
    else {
        document.getElementById("video").style.width = "720px";
        document.getElementById("video").style.height = "none";
        document.getElementById("video").style.left = "50%";
        document.getElementById("video").style.top = "50%";
        document.getElementById("video").style.transform = "translate(-50%, -50%)";
        document.body.style.backgroundColor = "#353541";
        document.getElementById("top").style.visibility = "visible";
        document.getElementById("controls").style.width = "720px";
        document.getElementById("controls").style.top = "calc(80% - 39px)";
    }
}

var wait = 0;