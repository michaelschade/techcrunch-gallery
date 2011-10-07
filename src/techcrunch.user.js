// ==UserScript==
// @name          TechCrunch Image Gallery
// @namespace     http://mschade.me/userscripts
// @description   Adds image gallery capabilities to TechCrunch by Michael Schade (@michaelschade, http://mschade.me/)
// @match         http://techcrunch.com/*
// @include       http://techcrunch.com/*
// ==/UserScript==

// via http://erikvold.com/blog/index.cfm/2010/6/14/using-jquery-with-a-user-script
function addJQuery(callback) {
    var script = document.createElement("script");
    script.setAttribute("src", "http://ajax.googleapis.com/ajax/libs/jquery/1.4.2/jquery.min.js");
    script.addEventListener('load', function() {
            var script = document.createElement("script");
            script.textContent = "(" + callback.toString() + ")();";
            document.body.appendChild(script);
            }, false);
    document.body.appendChild(script);
}

function main() {
    // Basic init
    var   gitem     = ".gallery-item"
        , firstItem = false
        , gallery   = $("#gallery-1")
        ;
    gallery.prepend('<div style="text-align: center;"><img id="gallery-1-preview"></img>');
    var preview = $("#gallery-1-preview");

    // Sets the navigation elements
    function setGNav(container, item) {
        $("#gallery-1-" + item).unbind('click').click(function() {
            var nav, wrap;
            // Find next/prev accordingly
            if (item == 'prev') {
                wrap = ":last";
                nav  = container.prevAll(gitem + ":first");
            } else {
                wrap = ":first";
                nav  = container.nextAll(gitem + ":first");
            }
            // Wrap to other side if no next/previous
            if (!nav.length) {
                nav = gallery.find(gitem + wrap);
            }
            nav.click();
        });
    }

    $(gitem).click(function() {
        // Add previous and next if necessary
        if (firstItem == false) {
            preview.parent().append('<br /><a id="gallery-1-prev" href="javascript:void(0);"><< Prev</a> <a id="gallery-1-next" href="javascript:void(0);">Next >></a></div>');
            firstItem = true;
        }

        // Get image and update gallery preview
        var   container = $(this)
            , img       = container.find("img").first()
            , src       = img.attr('src').replace(/\?.*$/, '')
            ;
        $("#gallery-1-preview").attr('src', src);

        // Set next/previous
        setGNav(container, 'prev');
        setGNav(container, 'next');

        return false;
    });
}

addJQuery(main);
