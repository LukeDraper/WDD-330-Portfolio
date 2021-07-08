const links = [
    {
        label: "Chapter 11: Further Functions",
        url: "notes/c11.html"
    },
    {
        label: "Chapter 13: AJAX",
        url: "notes/ch13.html"
    },
    {
        label: "AJAX Examples: Facts APIs",
        url: "notes/ajax.html"
    },
    {
        label: "AJAX Examples: Todo List",
        url: "notes/todo/todo.html"
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