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

        updateReferencesTextColor(); // Call this function after toggling the class
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

  });

