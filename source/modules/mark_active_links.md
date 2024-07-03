<script>
  document.addEventListener('DOMContentLoaded', function() {
    // Get the current page's URL
    var currentPageURL = window.location.href;

    // Select all anchor elements on the page
    var links = document.querySelectorAll('a');

    // Loop through each link
    links.forEach(function(link) {
        // Check if the href of the link matches the current page's URL
        if (link.href === currentPageURL) {
            // Change the color of the link to red
            link.style.color = 'red';
        }
    });
});
<script>
