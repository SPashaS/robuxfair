// Подключение функционала "Чертогов Фрилансера"
import { isMobile } from "./functions.js";
// Подключение списка активных модулей
import { flsModules } from "./modules.js";


new Vlitejs('#player',{
    options: {
      // auto play
      autoplay: false,
      // enable controls
      controls: true,
      // enables play/pause buttons
      playPause: true,
      // shows progress bar
      progressBar: true,
      // shows time
      time: true,
      // shows volume control
      volume: true,
      // shows fullscreen button
      fullscreen: false,
      // path to poster image
      poster: '../../img/poster.jpg',
      // shows play button
      bigPlay: true,
      // hide the control bar if the user is inactive
      autoHide: false,
      // add the playsinline attribute to the video
      playsinline: false,
      // loop the current media
      loop: false,
      // mute the current media
      muted: false,
      // Youtube/Vimeo player parameters
      providerParams: {},
    }
    
});
