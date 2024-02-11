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
        
        $(this).toggleClass("clicked");
        $(this).closest('.flex-container').find(".image img").toggle(); // Updated line

        var zoomLevel = $('.latLong.clicked').length > 0 ? 6 : 2; // Zoom level 10 if any element is opened, else 13

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
        var target = $(this).attr('href'); // Get the target element's id
        $('html, body').animate({
            scrollTop: $(target).offset().top // Scroll to the target element
        }, 1000); // Duration of the scroll animation in milliseconds
    });


    // Function to update references text color
    function updateReferencesTextColor() {
      var hasBlackBox = $('.latLong.clicked').length > 0;
      $('#references p').css('color', hasBlackBox ? 'white' : 'black');
      $('.relevantInfo').toggle(!hasBlackBox); // Hide or show .relavant-info
    }

    // Initialize Leaflet Map
    var map = L.map('mapid').setView([51.505, -0.09], 13);
    L.tileLayer('https://{s}.tile.openstreetmap.org/{z}/{x}/{y}.png', {
        maxZoom: 6,
        attribution: '© OpenStreetMap contributors'
    }).addTo(map);

  });


