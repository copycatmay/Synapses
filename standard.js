// standard.js script referenced and iterated via GPT-4

$(document).ready(function(){
    var audioCtx = new (window.AudioContext || window.webkitAudioContext)();
    var biquadFilter = audioCtx.createBiquadFilter();
    biquadFilter.type = 'lowpass';
    biquadFilter.frequency.setValueAtTime(440, audioCtx.currentTime); // Start with a low frequency to muffle
    var audioSourceNode; // Declare audioSourceNode at the top of the script

    function muffleAudio(muffleLevel) {
        console.log("Muffling audio with muffleLevel:", muffleLevel); // Debugging line
        var maxFrequency = 4400; // Less muffled
        var minFrequency = 150; // More muffled
        var frequency = maxFrequency - ((maxFrequency - minFrequency) / 13) * (muffleLevel - 1);
        console.log("Calculated frequency for muffle:", frequency); // Debugging line
        biquadFilter.frequency.linearRampToValueAtTime(frequency, audioCtx.currentTime + 0.2);
    }

    // Existing click event

    $(".latLong").click(function(){
        console.log("latLong clicked"); // Debugging line

        // Attempt to resume the AudioContext
        if (audioCtx.state === 'suspended') {
            audioCtx.resume().then(() => {
                console.log("AudioContext resumed!");
                // Place the rest of your audio playback logic here
            });
        }

        // Remove previously added classes
        $(".recentlyClickedLatLong").removeClass("recentlyClickedLatLong");
        $(".recentlyClickedID").removeClass("recentlyClickedID");

        // Add 'recentlyClickedLatLong' class to the clicked element
        $(this).addClass("recentlyClickedLatLong");

        // Find the corresponding <div> element and add 'recentlyClickedpID' class
        var target = $(this).data("target");
        console.log("Target class:", target); // Debugging line
        $("div." + target).addClass("recentlyClickedID");

        $("div." + target).toggleClass("visible");

        $('#mapid').toggleClass('activeMap');
        $(this).toggleClass("clicked");
     
        var isOpened = $('.latLong.clicked').length > 0;
        if(isOpened) {
            $("#blackBar").show();
        } else {
            $("#blackBar").hide();
        }

        var zoomLevel = $('.latLong.clicked').length > 0 ? Math.floor(Math.random() * (16 - 6 + 1)) + 6 : 2; //random view between 16-6; else 2

        // New logic to change map location
        var lat = parseFloat($(this).find('h2').eq(0).text());
        var lng = parseFloat($(this).find('h2').eq(1).text());

        if(!isNaN(lat) && !isNaN(lng)) {
            map.setView([lat, lng], zoomLevel);
        } 

        updateReferencesTextColor(); // Call this function after toggling the class

        // Scroll to the top of the clicked element
        $('html, body').animate({
            scrollTop: $(this).offset().top
        }, 1000); // Duration of the scroll animation in milliseconds

        // Check if any .latLong elements are active
        if ($('.latLong.clicked').length > 0) {
            // If there are active elements, increase width to 600px
            $(".sticky").css("width", "600px");
        } else {
            // If there are no active elements, revert width
            $(".sticky").css("width", ""); // Set to empty string to revert to CSS-defined width
        }

        // Determine the clicked element's id and play audio with fade-in effect
        var targetId = $(this).attr('id'); // e.g., 'coords1'
        var muffleLevel = parseInt(targetId.replace(/[^\d]/g, ''), 10); // Extracts number, e.g., 1
        console.log("Muffle level extracted:", muffleLevel); // Debugging line
        var audioSrc;
        switch(targetId) {
            case 'coords1':
                audioSrc = 'subsite/audio/coords-Daniel Caeser Freudian.mp3';
                break;
            case 'coords2':
                audioSrc = 'subsite/audio/coords-Beauty.mp3';
                break;
            case 'coords3':
                audioSrc = 'subsite/audio/coords-Daniel Caesar Ocho Rios.mp3';
                break;
            case 'coords4':
                audioSrc = 'subsite/audio/coords-PARTY.mp3';
                break;
            case 'coords5':
                audioSrc = 'subsite/audio/coords-JUNNY.mp3';
                break;
            case 'coords6':
                audioSrc = 'subsite/audio/coords-POWFU.mp3';
                break;
            case 'coords7':
                audioSrc = 'subsite/audio/coords-JUNNY21.mp3';
                break;
            case 'coords8':
                audioSrc = 'subsite/audio/coords-JB.mp3';
                break;
            case 'coords9':
                audioSrc = 'subsite/audio/coords-Always.mp3';
                break;
            case 'coords10':
                audioSrc = 'subsite/audio/coords-FLUME.mp3';
                break;
            case 'coords11':
                audioSrc = 'subsite/audio/coords-DEN.mp3';
                break;
            case 'coords12':
                audioSrc = 'subsite/audio/coords-Jay.mp3';
                break;
            case 'coords13':
                audioSrc = 'subsite/audio/coords-Nan.mp3';
                break;
            case 'coords14':
                audioSrc = 'subsite/audio/coords-Hou.mp3';
                break;
        }

        console.log("Selected audio source:", audioSrc); // Debugging line

        if(audioSrc) {
            var audioElement = document.getElementById('audio1');
            audioElement.src = audioSrc;

            // Ensure the audio context is not suspended
            if (audioCtx.state === 'suspended') {
                audioCtx.resume().then(() => {
                    playAudioWithFadeIn(audioElement, muffleLevel);
                });
            } else {
                playAudioWithFadeIn(audioElement, muffleLevel);
            }

            // Adjust the muffle based on the element's position
            muffleAudio(muffleLevel);
        }

        function playAudioWithFadeIn(audioElement, muffleLevel) {
            audioElement.onloadedmetadata = function() {
                audioElement.currentTime = Math.random() * audioElement.duration;

                var gainNode = audioCtx.createGain();
                
                var maxGain = 1; // Maximum volume
                var minGain = 0.1; // Minimum volume, adjust as needed
                var gainValue = maxGain - ((maxGain - minGain) / 13) * (muffleLevel - 1);
                
                gainNode.gain.setValueAtTime(0, audioCtx.currentTime);
                gainNode.gain.linearRampToValueAtTime(gainValue, audioCtx.currentTime + 1); // Fade in over 1 second

                if (!audioSourceNode) {
                    audioSourceNode = audioCtx.createMediaElementSource(audioElement);
                }
                audioSourceNode.disconnect(); // Disconnect first to ensure clean state
                audioSourceNode.connect(gainNode); // Connect the source to the gain node
                gainNode.connect(biquadFilter); // Connect the gain node to the biquad filter
                biquadFilter.connect(audioCtx.destination); // Connect the biquad filter to the destination
                console.log("Audio source connected to gain node, biquad filter, and destination."); // Debugging line

                audioElement.play().catch(e => console.error("Error playing audio:", e));
            };
        }
    });

    $(".latLong").click(function(){
        var targetId = $(this).attr('id'); // Get the id attribute
        var targetClass = 'p' + targetId.replace('coords', ''); // Assuming id is like 'coords6', we want 'p6'
        var container = $('.metadata'); // The container you want to scroll in
        var scrollTo = $("." + targetClass); // The target element you want to scroll to
    
        if(scrollTo.length > 0) { // Check if the element exists
            // Calculate the position of the target element relative to the container
            var position = scrollTo.offset().top - container.offset().top + container.scrollTop();
    
            // Animate the scroll
            container.animate({
                scrollTop: position
            }, 1000); // Adjust the duration (1000ms) as needed
        } else {
            console.log("Element not found:", targetClass);
        }
    });

    // Smooth scrolling for inLinks
    $('a.inLinks').click(function(e) {

        e.preventDefault(); // Prevent default anchor behavior

        var targetHref = $(this).attr('href'); // Get the href attribute, e.g., #coords1
        var targetElement = $(targetHref);
        var targetClass = targetHref.replace('#coords', 'p'); // Transform #coords1 to p1, #coords2 to p2, etc.

        // Remove previously added 'recentlyClickedID' class from all elements
        $(".recentlyClickedID").removeClass("recentlyClickedID");

        // Add 'recentlyClickedID' class to the corresponding class
        $("." + targetClass).addClass("recentlyClickedID");

        // Extract latitude and longitude from the target .latLong div
        var lat = parseFloat(targetElement.find('h2').eq(0).text());
        var lng = parseFloat(targetElement.find('h2').eq(1).text());

        // Check if lat and lng are valid numbers before updating the map view
        if(!isNaN(lat) && !isNaN(lng)) {
            var zoomLevel = Math.floor(Math.random() * (16 - 6 + 1)) + 6; // Example zoom level logic
            map.setView([lat, lng], zoomLevel);
        }

        // Scroll to the target element
        $('html, body').animate({
            scrollTop: $(targetHref).offset().top
        }, 1000);


        var container = $('.metadata'); // The container you want to scroll in
        var scrollTo = $("." + targetClass); // The target element you want to scroll to
    
        // Calculate the position of the target element relative to the container
        var position = scrollTo.offset().top - container.offset().top + container.scrollTop();
    
        // Animate the scroll
        container.animate({
            scrollTop: position
        }, 1000); // Adjust the duration (1000ms) as needed

        // Determine the clicked element's id and play audio with fade-in effect
        var targetId = targetHref.replace('#', ''); // e.g., 'coords1'
        var muffleLevel = parseInt(targetId.replace(/[^\d]/g, ''), 10); // Extracts number, e.g., 1
        console.log("Muffle level extracted from inLinks:", muffleLevel); // Debugging line
        var audioSrc;
        switch(targetId) {
            case 'coords1':
                audioSrc = 'subsite/audio/coords-Daniel Caeser Freudian.mp3';
                break;
            case 'coords2':
                audioSrc = 'subsite/audio/coords-Beauty.mp3';
                break;
            case 'coords3':
                audioSrc = 'subsite/audio/coords-Daniel Caesar Ocho Rios.mp3';
                break;
            case 'coords4':
                audioSrc = 'subsite/audio/coords-PARTY.mp3';
                break;
            case 'coords5':
                audioSrc = 'subsite/audio/coords-JUNNY.mp3';
                break;
             case 'coords6':
                audioSrc = 'subsite/audio/coords-POWFU.mp3';
                break;
            case 'coords7':
                audioSrc = 'subsite/audio/coords-JUNNY21.mp3';
                break;
            case 'coords8':
                audioSrc = 'subsite/audio/coords-JB.mp3';
                break;
            case 'coords9':
                audioSrc = 'subsite/audio/coords-Always.mp3';
                break;
            case 'coords10':
                audioSrc = 'subsite/audio/coords-FLUME.mp3';
                break;
            case 'coords11':
                audioSrc = 'subsite/audio/coords-DEN.mp3';
                break;
            case 'coords12':
                audioSrc = 'subsite/audio/coords-Jay.mp3';
                break;
            case 'coords13':
                audioSrc = 'subsite/audio/coords-Nan.mp3';
                break;
            case 'coords14':
                audioSrc = 'subsite/audio/coords-Hou.mp3';
                break;

        }

        console.log("Selected audio source from inLinks:", audioSrc); // Debugging line

        if(audioSrc) {
            var audioElement = document.getElementById('audio1');
            audioElement.src = audioSrc;

            // Ensure the audio context is not suspended
            if (audioCtx.state === 'suspended') {
                audioCtx.resume().then(() => {
                    playAudioWithFadeIn(audioElement, muffleLevel);
                });
            } else {
                playAudioWithFadeIn(audioElement, muffleLevel);
            }

            // Adjust the muffle based on the element's position
            muffleAudio(muffleLevel);
        }

        function playAudioWithFadeIn(audioElement, muffleLevel) {
            audioElement.onloadedmetadata = function() {
                audioElement.currentTime = Math.random() * audioElement.duration;

                var gainNode = audioCtx.createGain();
                var maxGain = 1; // Maximum volume
                var minGain = 0.1; // Minimum volume, adjust as needed
                var gainValue = maxGain - ((maxGain - minGain) / 13) * (muffleLevel - 1);
                
                gainNode.gain.setValueAtTime(0, audioCtx.currentTime);
                gainNode.gain.linearRampToValueAtTime(gainValue, audioCtx.currentTime + 1); // Fade in over 1 second

                if (!audioSourceNode) {
                    audioSourceNode = audioCtx.createMediaElementSource(audioElement);
                }
                audioSourceNode.disconnect(); // Disconnect first to ensure clean state
                audioSourceNode.connect(gainNode); // Connect the source to the gain node
                gainNode.connect(biquadFilter); // Connect the gain node to the biquad filter
                biquadFilter.connect(audioCtx.destination); // Connect the biquad filter to the destination
                console.log("Audio source connected to gain node, biquad filter, and destination from inLinks."); // Debugging line

                audioElement.play().catch(e => console.error("Error playing audio:", e));
            };
        }
    });

    document.querySelectorAll('a.inLinks').forEach(link => {
      link.addEventListener('click', function(event) {
        event.preventDefault(); // Prevent the default anchor click behavior
        const targetHref = this.getAttribute('href');
        const targetId = targetHref.substring(1); // Remove the '#' from the href
        const targetElement = document.getElementById(targetId);

        // Check if the target .latLong element is not visible and click it to open
        if (targetElement && !$(targetElement).hasClass('clicked')) {
          $(targetElement).click();
        }
      });
    });

    // Function to update references text color
    function updateReferencesTextColor() {
      var hasBlackBox = $('.latLong.clicked').length > 0 || $('.inLinks.clicked').length > 0;
      $('#references p').css('color', hasBlackBox ? 'white' : 'black');
      $('.relevantInfo').toggle(!hasBlackBox); // Hide or show .relavant-info
    }

    // Initialize Leaflet Map without zoom controls
    var map = L.map('mapid', {
        attributionControl: false,
        zoomControl: false, // Disable zoom controls
    }).setView([35, -80], 3);

    L.tileLayer.provider('Stadia.StamenTonerBackground', {
        maxZoom: 20,
        attribution: '© OpenStreetMap contributors',
        scrollWheelZoom: false, 
        zoomAnimation: true,
        zoomAnimationThreshold: 20,
    }).addTo(map);

    // Add click event listener for the mute button
    $('#mute').click(function() {
        var audioElement = document.getElementById('audio1');
        if (audioElement.muted) {
            audioElement.muted = false;
            $(this).text('mute'); // Update button text to "mute"
        } else {
            audioElement.muted = true;
            $(this).text('unmute'); // Update button text to "unmute"
        }
    });

  });
