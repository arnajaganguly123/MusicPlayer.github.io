let now_playing = document.querySelector('.now-playing');
let track_art = document.querySelector('.track-art');
let track_name = document.querySelector('.track-name');
let track_artist = document.querySelector('.track-artist');

let playpause_btn = document.querySelector('.playpause-track');
let next_btn = document.querySelector('.next-track');
let prev_btn = document.querySelector('.prev-track');

let seek_slider = document.querySelector('.seek_slider');
let volume_slider = document.querySelector('.volume_slider');
let curr_time = document.querySelector('.current-time');
let total_duration = document.querySelector('.total-duration');
let wave = document.getElementById('wave');
let randomIcon = document.querySelector('.fa-random');
let curr_track = document.createElement('audio');

let track_index = 0;
let isPlaying = false;
let isRandom = false;
let updateTimer;

const music_list = [
    {
        img:'whisper.jpg',
        name:'Whisper - 陈文非《平行恋爱时差》OST',
        artist:'陈文非',
        music:'🎵Whisper－陈文非《平行恋爱时差》OST.mp3'
    },
    {
        img:'arms.jpg',
        name:'Arms',
        artist:'Christina Perri',
        music:'Christina+Perri+-+Arms+[Official+Music+Video] - Copy (2).mp3'
    },
    {
        img:'bolna.jpg',
        name:'Bolna',
        artist:'Arijit Singh and Asees Kaur',
        music:'Bolna+-+Kapoor+&amp;+Sons+-+Sidharth+Malhotra+-+Alia+Bhatt+-+Fawad+Khan+-+Arijit+Singh+-+Asees+-+Tanishk - Copy - Copy.mp3'
    },
    {
        img:'boombox.jpg',
        name:'BoomBox',
        artist:'Laura Marano',
        music:'Laura+Marano+-+Boombox.mp3'
    },
    {
        img:'buddhu.jpg',
        name:'Buddhu Sa Mann',
        artist:'Amaal Malik and Armaan Malik',
        music:'Buddhu+Sa+Mann+-+Kapoor+&amp;+Sons+-+Sidharth+-+Alia+-+Fawad+-+Rishi+Kapoor+-+Armaan+-+Amaal - Copy (2).mp3'
    },
    {
        img:'chittakukkad.jpg',
        name:'Chitta Kukkad',
        artist:'Gippy Gerwal and Neha Kakkar',
        music:'Chitta+Kukkad+-+Loveshhuda+-+Latest+Bollywood+Wedding+Song+-+Girish,+Navneet+-+19th+Feb+2016 - Copy - Copy.mp3'
    },
    {
        img:'davidguetta.jpg',
        name:'Bang My Head',
        artist:'David Guetta',
        music:'David+Guetta+-+Bang+My+Head+(Official+Video)+feat+Sia+&amp;+Fetty+Wap - Copy.mp3'
    },
    {
        img:'davidguetta.jpg',
        name:'Hey Mama',
        artist:'David Guetta',
        music:'David+Guetta+-+Hey+Mama+(Official+Video)+ft+Nicki+Minaj,+Bebe+Rexha+&amp;+Afrojack - Copy.mp3'
    },
    {
        img:'davidguetta.jpg',
        name:'Play Hard',
        artist:'David Guetta',
        music:'David+Guetta+-+Play+Hard+ft.+Ne-Yo,+Akon+(Official+Video).mp3'
    },
    {
        img:'davidguetta.jpg',
        name:'Without YOu',
        artist:'David Guetta',
        music:'David+Guetta+-+Without+You+ft.+Usher+(Official+Video).mp3'
    },
    {
        img:'davidguetta.jpg',
        name:'Bad',
        artist:'David Guetta',
        music:'David+Guetta+&amp;+Showtek+-+Bad+ft.+Vassy+(Lyrics+Video) - Copy (2).mp3'
    },
    {
        img:'dooriyan.jpg',
        name:'Dooriyan',
        artist:'Arijit Singh',
        music:'Dooriyaan+Song+-+Arijit+Singh+-+Sidharth+Malhotra,+Alia,+Fawad+Khan+-+Kapoor+&amp;+Sons+-+New+Song+2016 - Copy.mp3'
    },
    {
        img:'enjoy.jpg',
        name:'Enjoy The Ride',
        artist:'Krewella',
        music:'Krewella+-+Enjoy+the+Ride (1) - Copy.mp3'
    },
    {
        img:'gfbf.jpg',
        name:'GF BF',
        artist:'Gurinder Seagal and Jacqueline Fernandez',
        music:'GF+BF+VIDEO+SONG+-+Sooraj+Pancholi,+Jacqueline+Fernandez+ft.+Gurinder+Seagal+-+T-Series - Copy.mp3'
    },
    {
        img:'whisper.jpg',
        name:'Whisper - 陈文非《平行恋爱时差》OST',
        artist:'陈文非',
        music:'🎵Whisper－陈文非《平行恋爱时差》OST.mp3'
    },
    {
        img:'heart.jpg',
        name:'Heartbeat',
        artist:'Kelly Clarkson',
        music:'Kelly+Clarkson+-+Heartbeat+Song.mp3'
    },
    {
        img:'myheart.jpg',
        name:'My Heart Will GO On',
        artist:'Celine Dion',
        music:'celine+dion+my+heart+will+go+on+lyrics - Copy.mp3'
    }
];

loadTrack(track_index);

function loadTrack(track_index){
    clearInterval(updateTimer);
    reset();

    curr_track.src = music_list[track_index].music;
    curr_track.load();

    track_art.style.backgroundImage = "url(" + music_list[track_index].img + ")";
    track_name.textContent = music_list[track_index].name;
    track_artist.textContent = music_list[track_index].artist;
    now_playing.textContent = "Playing music " + (track_index + 1) + " of " + music_list.length;

    updateTimer = setInterval(setUpdate, 1000);

    curr_track.addEventListener('ended', nextTrack);
    random_bg_color();
}

function random_bg_color(){
    let hex = ['0', '1', '2', '3', '4', '5', '6', '7', '8', '9', 'a', 'b', 'c', 'd', 'e'];
    let a;

    function populate(a){
        for(let i=0; i<6; i++){
            let x = Math.round(Math.random() * 14);
            let y = hex[x];
            a += y;
        }
        return a;
    }
    let Color1 = populate('#');
    let Color2 = populate('#');
    var angle = 'to right';

    let gradient = 'linear-gradient(' + angle + ',' + Color1 + ', ' + Color2 + ")";
    document.body.style.background = gradient;
}
function reset(){
    curr_time.textContent = "00:00";
    total_duration.textContent = "00:00";
    seek_slider.value = 0;
}
function randomTrack(){
    isRandom ? pauseRandom() : playRandom();
}
function playRandom(){
    isRandom = true;
    randomIcon.classList.add('randomActive');
}
function pauseRandom(){
    isRandom = false;
    randomIcon.classList.remove('randomActive');
}
function repeatTrack(){
    let current_index = track_index;
    loadTrack(current_index);
    playTrack();
}
function playpauseTrack(){
    isPlaying ? pauseTrack() : playTrack();
}
function playTrack(){
    curr_track.play();
    isPlaying = true;
    track_art.classList.add('rotate');
    wave.classList.add('loader');
    playpause_btn.innerHTML = '<i class="fa fa-pause-circle fa-5x"></i>';
}
function pauseTrack(){
    curr_track.pause();
    isPlaying = false;
    track_art.classList.remove('rotate');
    wave.classList.remove('loader');
    playpause_btn.innerHTML = '<i class="fa fa-play-circle fa-5x"></i>';
}
function nextTrack(){
    if(track_index < music_list.length - 1 && isRandom === false){
        track_index += 1;
    }else if(track_index < music_list.length - 1 && isRandom === true){
        let random_index = Number.parseInt(Math.random() * music_list.length);
        track_index = random_index;
    }else{
        track_index = 0;
    }
    loadTrack(track_index);
    playTrack();
}
function prevTrack(){
    if(track_index > 0){
        track_index -= 1;
    }else{
        track_index = music_list.length -1;
    }
    loadTrack(track_index);
    playTrack();
}
function seekTo(){
    let seekto = curr_track.duration * (seek_slider.value / 100);
    curr_track.currentTime = seekto;
}
function setVolume(){
    curr_track.volume = volume_slider.value / 100;
}
function setUpdate(){
    let seekPosition = 0;
    if(!isNaN(curr_track.duration)){
        seekPosition = curr_track.currentTime * (100 / curr_track.duration);
        seek_slider.value = seekPosition;

        let currentMinutes = Math.floor(curr_track.currentTime / 60);
        let currentSeconds = Math.floor(curr_track.currentTime - currentMinutes * 60);
        let durationMinutes = Math.floor(curr_track.duration / 60);
        let durationSeconds = Math.floor(curr_track.duration - durationMinutes * 60);

        if(currentSeconds < 10) {currentSeconds = "0" + currentSeconds; }
        if(durationSeconds < 10) { durationSeconds = "0" + durationSeconds; }
        if(currentMinutes < 10) {currentMinutes = "0" + currentMinutes; }
        if(durationMinutes < 10) { durationMinutes = "0" + durationMinutes; }

        curr_time.textContent = currentMinutes + ":" + currentSeconds;
        total_duration.textContent = durationMinutes + ":" + durationMinutes;
    }
}