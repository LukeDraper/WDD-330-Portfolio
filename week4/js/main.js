const links = [
    {
        label: "Chapter 8: Forms",
        url: "notes/ch8.html"
    },
    {
        label: "Chapter 12: Object Oriented Programming",
        url: "notes/ch12.html"
    },
    {
        label: "Chapter 15: Modern Javascript",
        url: "notes/ch15.html"
    },
    {
        label: "Team Activity",
        url: "team-activity/team.html"
    },
    {
        label: "Search Example",
        url: "notes/search.html"
    },
    {
        label: "Hero Example",
        url: "notes/hero.html"
    },
    {
        label: "MVC Example",
        url: "notes/list.html"
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