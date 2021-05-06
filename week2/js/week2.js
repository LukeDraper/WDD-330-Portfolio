const links = [
    {
        label: "Javascript Exercise",
        url: "notes/objectMethods.html"
    },
    {
        label: "Ch2: Programming Basics",
        url: "notes/ch2.html"
    },
    {
        label: "Ch3: Arrays, Logic, and Loops",
        url: "notes/ch3.html"
    },
    {
        label: "Ch4: Functions",
        url: "notes/ch4.html"
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