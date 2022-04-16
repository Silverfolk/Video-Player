const player=document.querySelector('.player');
const video=document.querySelector('video');
const progressRange=document.querySelector('.progress-range');
const progressBar=document.querySelector('.progress-bar');
const playpauseBtn=document.getElementById('play-pause-button');
const volumeIcon=document.getElementById('volume-icon');
const volumeRange=document.querySelector('.volume-range');
const volumeBar=document.querySelector('.volume-bar');
const currentTime=document.querySelector('.time-elapsed');
const duration=document.querySelector('.time-duration');
const fullscreenbtn=document.querySelector('#fullscreen');
const speed = document.querySelector('select');
// Read html audio video Methods before starting

// Play & Pause
  function showPlayIcon(){
    playpauseBtn.classList.replace('fa-pause','fa-play');
    playpauseBtn.setAttribute('title','Play');
  }
function TogglePlay(){
    if(video.paused){
        video.play();
        playpauseBtn.classList.replace('fa-play','fa-pause');//when it will be playing will see the option to pause the video and vice-versa
        playpauseBtn.setAttribute('title','Pause');
    }
    else{
        video.pause();
        showPlayIcon()
    }
}

// On video End,show play button icon
video.addEventListener('ended',showPlayIcon);



// Progress Bar

// Calculate Display time format 
function displayTime(time){
  //Math.floor is basically used to round off a number to closest whole number
  const minutes=Math.floor(time / 60);
  let seconds =Math.floor(time % 60);
   seconds=seconds<10?'0'+seconds:seconds;
  return `${minutes}:${seconds}`;
}
// update the progress bar as the video plays
function updateProgress(){
    progressBar.style.width=`${(video.currentTime/video.duration)*100}%`;
    currentTime.textContent=`${displayTime(video.currentTime)}`;//to change text of video current progress
    duration.textContent=`${displayTime(video.duration)}`;
  }

// Click to see within the video
 function setProgress(Event){
   const newTime =Event.offsetX/progressRange.offsetWidth;
   progressBar.style.width='${newTime*100}%'
   video.currentTime=newTime*video.duration;
  //here offsetx is a part of event which tells that how fat we are from the parent in x direction
  // offsetwidth they just refering to entire width of progress range
  // now we will divide offsetx with offsetwidth

 }
// Volume Controls

// Volume bar
let lastvolume=1;//by default value of volume is 1.

function changeVolume(Event){
  let volume =Event.offsetX/volumeRange.offsetWidth;
  // Rounding Volume up or down
  if(volume<0.1){
    volume=0;
  }
  if(volume >0.9){
    volume=1;
  }
  volumeBar.style.width=`${volume*100}%`;
  video.volume=volume;//from this attribute volume of the video is being actually decreased

  console.log(volume);

  // Change icon depinding upon the volume 
volumeIcon.classList='';
if(volume>0.7){
  volumeIcon.classList.add('fas','fa-volume-up');
}
else if (volume<0.7 && volume>0){
  volumeIcon.classList.add('fas','fa-volume-down');
}
else if(volume==0){
  volumeIcon.classList.add('fas','fa-volume-off');
}
lastvolume=volume;
}

// Mute/Unmute
function toggleMute(){
  volumeIcon.classList='';
  if(video.volume!=0){//unmute to mute 
 lastvolume =video.volume;
 video.volume=0;
 volumeBar.style.width=0;
 volumeIcon.classList.add('fas','fa-volume-mute');
 volumeIcon.setAttribute('title','Unmute');
  }
  else{//mute to unmute 
    video.volume=lastvolume;
    volumeBar.style.width=`${lastvolume * 100}%`;
    if(lastvolume>0.7){
      volumeIcon.classList.add('fas','fa-volume-up');
    }
    else if (lastvolume<0.7 && lastvolume>0){
      volumeIcon.classList.add('fas','fa-volume-down');
    }
    else if(lastvolume==0){
      volumeIcon.classList.add('fas','fa-volume-off');
    }
    volumeIcon.setAttribute('title','mute');
  }
}



// Change PlayBack Speed
function changeSpeed(){
 // console.log('video playback rate',video.playbackRate);-->given in docs
 // console.log('selected value',speed.value);-->changed by us using options 
 video.playbackRate=speed.value;
}

// FullScreen-->depends on which browser are we using 

/* View in fullscreen */
function openFullscreen(elem) {
  if (elem.requestFullscreen) {
    elem.requestFullscreen();
  } else if (elem.webkitRequestFullscreen) { /* Safari */
    elem.webkitRequestFullscreen();
  } else if (elem.msRequestFullscreen) { /* IE11 */
    elem.msRequestFullscreen();
  }
  video.classList.add('video-fullscreen');
}

/* Close fullscreen */
function closeFullscreen() {
  if (document.exitFullscreen) {
    document.exitFullscreen();
  } else if (document.webkitExitFullscreen) { /* Safari */
    document.webkitExitFullscreen();
  } else if (document.msExitFullscreen) { /* IE11 */
    document.msExitFullscreen();
  }
  video.classList.remove('video-fullscreen');
}

let fullscreen=false;
function toggleFullscreen(){
  !fullscreen ? openFullscreen(player) : closeFullscreen();
  fullscreen=!fullscreen;
}


// Event Listners 
playpauseBtn.addEventListener('click',TogglePlay);
video.addEventListener('click',TogglePlay);
video.addEventListener('timeupdate',updateProgress);
video.addEventListener('canplay',updateProgress);
progressRange.addEventListener('click',setProgress);
volumeRange.addEventListener('click',changeVolume);
volumeIcon.addEventListener('click',toggleMute);
speed.addEventListener('change',changeSpeed);
fullscreenbtn.addEventListener('click',toggleFullscreen);