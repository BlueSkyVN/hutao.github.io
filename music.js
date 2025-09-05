const audio = document.getElementById('audio');
const titleEl = document.getElementById('track-title');
const seek = document.getElementById('seek');
const timeEl = document.getElementById('time');
const playBtn = document.getElementById('play');
const prevBtn = document.getElementById('prev');
const nextBtn = document.getElementById('next');
const loopBtn = document.getElementById('loop');
const shuffleBtn = document.getElementById('shuffle');
const playlistEl = document.getElementById('playlist');

// Danh sách nhạc tĩnh (đặt file trong thư mục audio/)
let playlist = [
  { name: 'track1.mp3', url: 'audio/track1.mp3' },
  { name: 'track2.mp3', url: 'audio/track2.mp3' }
];

let current = -1;
let loop = false;
let shuffle = false;

function fmt(t) {
  if (!isFinite(t)) return '00:00';
  const m = Math.floor(t / 60).toString().padStart(2, '0');
  const s = Math.floor(t % 60).toString().padStart(2, '0');
  return `${m}:${s}`;
}

function renderPlaylist() {
  playlistEl.innerHTML = '';
  playlist.forEach((it, idx) => {
    const card = document.createElement('div');
    card.className = 'card';
    const name = document.createElement('div');
    name.textContent = decodeURIComponent(it.name);
    const btn = document.createElement('button');
    btn.className = 'btn secondary';
    btn.textContent = 'Phát';
    btn.addEventListener('click', () => playIndex(idx));
    card.appendChild(name);
    card.appendChild(btn);
    playlistEl.appendChild(card);
  });
}

function updateUI() {
  titleEl.textContent = current >= 0 ? decodeURIComponent(playlist[current].name) : 'Chưa chọn bài';
  playBtn.textContent = audio.paused ? 'Play' : 'Pause';
}

function playIndex(idx) {
  current = idx;
  audio.src = playlist[current].url;
  audio.play();
  updateUI();
}

function nextTrack() {
  if (shuffle) {
    let n = current;
    while (n === current && playlist.length > 1) {
      n = Math.floor(Math.random() * playlist.length);
    }
    playIndex(n);
  } else {
    playIndex((current + 1) % playlist.length);
  }
}
function prevTrack() {
  playIndex((current - 1 + playlist.length) % playlist.length);
}

audio.addEventListener('loadedmetadata', () => {
  seek.value = 0;
  timeEl.textContent = `${fmt(0)} / ${fmt(audio.duration)}`;
});
audio.addEventListener('timeupdate', () => {
  seek.value = (audio.currentTime / audio.duration) * 100 || 0;
  timeEl.textContent = `${fmt(audio.currentTime)} / ${fmt(audio.duration)}`;
});
audio.addEventListener('ended', () => {
  if (loop) {
    audio.currentTime = 0;
    audio.play();
  } else {
    nextTrack();
  }
});

seek.addEventListener('input', () => {
  if (isFinite(audio.duration)) {
    audio.currentTime = (seek.value / 100) * audio.duration;
  }
});

playBtn.addEventListener('click', () => {
  if (!audio.src && playlist.length) playIndex(0);
  else if (audio.paused) audio.play();
  else audio.pause();
  updateUI();
});
nextBtn.addEventListener('click', nextTrack);
prevBtn.addEventListener('click', prevTrack);
loopBtn.addEventListener('click', () => {
  loop = !loop;
  loopBtn.textContent = `Loop: ${loop ? 'On' : 'Off'}`;
});
shuffleBtn.addEventListener('click', () => {
  shuffle = !shuffle;
  shuffleBtn.textContent = `Shuffle: ${shuffle ? 'On' : 'Off'}`;
});

window.addEventListener('DOMContentLoaded', () => {
  renderPlaylist();
  if (playlist.length) {
    current = 0;
    audio.src = playlist[0].url;
    updateUI();
  }
});
