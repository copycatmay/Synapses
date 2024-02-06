$(document).ready(function(){
    // Existing click event
    $(".latLong").click(function(){
        var target = $(this).data("target");
        $("#" + target).toggleClass("visible");
        

      $(this).toggleClass("clicked");
      $(this).next(".image").find("img").toggle();
      updateReferencesTextColor(); // Call this function after toggling the class
    });

    // Function to increase spacing
    function increaseSpacing() {
      $('.latLong').each(function(i) {
        // Increase the bottom margin for each .latLong element
        // The multiplier (i + 1) ensures that the margin increases for each element
        $(this).css('margin-bottom', (i + 1) * 120 + 'px');
      });
    }

    // Function to update references text color
    function updateReferencesTextColor() {
      var hasBlackBox = $('.latLong.clicked').length > 0;
      $('#references p').css('color', hasBlackBox ? 'white' : 'black');
      $('.relevantInfo').toggle(!hasBlackBox); // Hide or show .relavant-info
    }

    // Initial call to set the spacing on page load
    increaseSpacing();

    // Optional: If you want to recalculate the spacing when the window is resized
    $(window).resize(increaseSpacing);
  });
