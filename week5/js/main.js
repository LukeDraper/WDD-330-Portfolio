const links = [
    {
        label: "Chapter 10: Testing and Debugging",
        url: "notes/ch10.html"
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