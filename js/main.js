const links = [
    {
        label: "Week 1 notes",
        url: "week1/index.html"
    },
    {
        label: "Week 2 notes",
        url: "week2/index.html"
    },
    {
        label: "Week 3 notes",
        url: "week3/index.html"
    },
    {
        label: "Week 4 notes",
        url: "week4/index.html"
    },
    {
        label: "Week 5 notes",
        url: "week5/index.html"
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