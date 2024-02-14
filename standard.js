// standard.js script referenced and iterated via GPT-4

$(document).ready(function(){
    // Existing click event

    $(".latLong").click(function(){
        

        // Remove previously added classes
        $(".recentlyClickedLatLong").removeClass("recentlyClickedLatLong");
        $(".recentlyClickedpID").removeClass("recentlyClickedpID");

        // Add 'recentlyClickedLatLong' class to the clicked element
        $(this).addClass("recentlyClickedLatLong");

        // Find the corresponding <p> element and add 'recentlyClickedpID' class
        var target = $(this).data("target");
        $("#" + target).addClass("recentlyClickedpID");

        $("#" + target).toggleClass("visible");

        $('#mapid').toggleClass('activeMap');
        $(this).toggleClass("clicked");
        $(this).closest('.flex-container').find(".image img").toggle(); // Updated line

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

    });

    // Smooth scrolling for inLinks
    $('a.inLinks').click(function(e) {
        e.preventDefault(); // Prevent the default anchor behavior
        var targetId = $(this).attr('href'); // Get the target element's id
        var targetElement = document.querySelector(targetId);

        if (targetElement) {
            targetElement.scrollIntoView({
                behavior: 'smooth', // Smooth scroll
                block: 'start'      // Align to the top
            });
        }
    });


    // Function to update references text color
    function updateReferencesTextColor() {
      var hasBlackBox = $('.latLong.clicked').length > 0;
      $('#references p').css('color', hasBlackBox ? 'white' : 'black');
      $('.relevantInfo').toggle(!hasBlackBox); // Hide or show .relavant-info
    }

    // Initialize Leaflet Map
    var map = L.map('mapid', {attributionControl: false}).setView([0, 0], 2);
    L.tileLayer.provider('Stadia.StamenTonerBackground', {
        maxZoom: 20,
        attribution: '© OpenStreetMap contributors',
        scrollWheelZoom: false, 
        zoomAnimation: true,
        zoomAnimationThreshold: 20,
    }).addTo(map);

  });


