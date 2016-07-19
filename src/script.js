var timeout, currentUrl;

function showLink(n) {
    if (document.querySelector(".chrome-ext-show-github-link")) {
        return;
    }
    // This is a workaround to make it work when navigating inside a repo
    // and coming back to the front page. For some reason pushState listeners
    // did not work for detecting GitHub's page transitions.
    if (typeof n !== "undefined" && n < 20) {
        clearTimeout(timeout);
        timeout = setTimeout(() => showLink(n + 1), 50);
    }
    var links = document.querySelectorAll(".input-group.js-zeroclipboard-container");
    var container = document.querySelector(".file-navigation.in-mid-page");
    if (links.length > 1 && container !== null) {
        var link = links[1]; // 0 = https, 1 = ssh
        var div = document.createElement("div");
        div.className = "chrome-ext-show-github-link";
        div.style.display = "inline-block";
        div.style.width = "250px";
        div.style.float = "right";
        div.style.margin = "0 0 0 6px";
        div.appendChild(link.cloneNode(true));
        container.insertBefore(div, container.firstChild);
    }
}

document.addEventListener("click", () => {
    if (currentUrl !== window.location.href) {
        showLink(0)
        currentUrl = window.location.href;
    }
});

showLink();
