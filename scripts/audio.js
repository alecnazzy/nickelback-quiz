var audio = $("#audio")[0];
$("#kroeger").mouseenter(function () {
  audio.play();
});

$("#kroeger").mouseleave(function () {
  audio.pause();
  audio.currentTime = 0;
});
