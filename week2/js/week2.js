const links = [
    {
        label: "Object Methods: this notes",
        url: "notes/objectMethods.html"
    },
    {
        label: "Ch5: Objects notes",
        url: "notes/ch5.html"
    },
    {
        label: "Ch6: Document Object Model",
        url: "notes/ch6.html"
    },
    {
        label: "Ch7: Events",
        url: "notes/ch7.html"
    },
    {
        label: "Team Activity",
        url: "team-activity/team.html"
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