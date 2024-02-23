// standard.js script referenced and iterated via GPT-4

$(document).ready(function(){
    // Existing click event

    $(".latLong").click(function(){
        console.log("latLong clicked"); // Debugging line

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
    });


    // Function to update references text color
    function updateReferencesTextColor() {
      var hasBlackBox = $('.latLong.clicked').length > 0;
      $('#references p').css('color', hasBlackBox ? 'white' : 'black');
      $('.relevantInfo').toggle(!hasBlackBox); // Hide or show .relavant-info
    }

    // Initialize Leaflet Map
    var map = L.map('mapid', {attributionControl: false}).setView([0, 0], 3);
    L.tileLayer.provider('Stadia.StamenTonerBackground', {
        maxZoom: 20,
        attribution: '© OpenStreetMap contributors',
        scrollWheelZoom: false, 
        zoomAnimation: true,
        zoomAnimationThreshold: 20,
    }).addTo(map);

  });


