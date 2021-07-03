const links = [
    {
        label: "Chapter 9: The Window Object",
        url: "notes/ch9.html"
    },
    {
        label: "Chapter 14: HTML5 APIs",
        url: "notes/ch14.html"
    },
    {
        label: "Team Activity",
        url: "team-activity/index-START.html"
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