    // Create an instance of the audio context
var audioCtx = new (window.AudioContext || window.webkitAudioContext)();


// Get the audio element and create a media element source
var audioElement = document.getElementById('backgroundAudio');
var audioSourceNode = audioCtx.createMediaElementSource(audioElement);


// Create a biquad filter
var biquadFilter = audioCtx.createBiquadFilter();
biquadFilter.type = 'lowpass';
biquadFilter.frequency.setValueAtTime(440, audioCtx.currentTime); // Start with a low frequency to muffle

// Connect the audio source to the filter, and the filter to the destination
audioSourceNode.connect(biquadFilter);
biquadFilter.connect(audioCtx.destination);

// Function to muffle the audio
function muffleAudio() {
    biquadFilter.frequency.linearRampToValueAtTime(440, audioCtx.currentTime + 0.2); // Lower frequency to muffle
}

// Function to unmuffle the audio
function unmuffleAudio() {
    // Set the frequency to its current value instantly for a smooth start
    biquadFilter.frequency.setValueAtTime(biquadFilter.frequency.value, audioCtx.currentTime);
    // Smooth transition to the higher frequency
    biquadFilter.frequency.linearRampToValueAtTime(22050, audioCtx.currentTime + 0.4); // Adjust the duration as needed
}

// Function to toggle mute/unmute
function toggleMute() {
    var audio = document.getElementById('backgroundAudio');
    if (audio.muted) {
        document.getElementById('muteButton').textContent = "mute";
        audio.muted = false;
    } else {
        document.getElementById('muteButton').textContent = "unmute";
        audio.muted = true;
    }
}

// Add event listeners to paragraphs
document.querySelectorAll('p, img, .metadata').forEach(function(element) {
    element.addEventListener('mouseenter', unmuffleAudio);
    element.addEventListener('mouseleave', muffleAudio);
});

        var button = document.getElementById('muteButton');

        // Plays the Audio when user clicks anywhere cause most browsers dont fk w autoplay
        button.addEventListener('click', function() {
            if (audioCtx.state === 'suspended') {
                audioCtx.resume();
            }
            var audio = document.getElementById('backgroundAudio');
            if (audio.readyState >= 1) { // Check if enough of the audio file has been downloaded to play
                audio.currentTime = Math.random() * audio.duration;
                audio.play();
            }
        });


       // Initialize Leaflet Map
       var map = L.map('mapid').setView([0, 0], 2);
       L.tileLayer.provider('CartoDB.DarkMatterNoLabels', {
           maxZoom: 6,
           attribution: '© OpenStreetMap contributors'
       }).addTo(map);
