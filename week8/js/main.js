const links = [
    {
        label: "Chapter 8: Transforms and Transitions",
        url: "notes/ch8.html"
    },
    {
        label: "Chapter 12: Canvas, SVG, and Drag and Drop",
        url: "notes/ch12.html"
    },
    {
        label: "Team Activity",
        url: "team-activity/index.html"
    }
];

var contents = document.getElementById("contents");

function generateContents () {
    links.forEach(function (item, index) {
        console.log(index, item);
        let listItem = "<li><a href=\"" + item.url + "\" >" + item.label + "</a></li>";
        console.log(listItem);
        contents.innerHTML += listItem;
    })
}

document.addEventListener("load", generateContents());