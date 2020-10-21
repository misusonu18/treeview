const data = [
    {
        id: 1,
        name: 'Item 1',
        parent_id: null,
    },
    {
        id: 2,
        name: 'Item 1.0',
        parent_id: 1,
    },
    {
        id: 3,
        name: 'Item 1.1',
        parent_id: 2,
    },
    {
        id: 4,
        name: 'Item 2',
        parent_id: null,
    },
    {
        id: 5,
        name: 'Item 2.0',
        parent_id: 4,
    },
    {
        id: 6,
        name: 'Item 2.1',
        parent_id: 5,
    },
    {
        id: 7,
        name: 'Item 2.2',
        parent_id: 5,
    },
];

// Referenced
// https: //stackoverflow.com/questions/56698859/how-to-populate-list-and-create-a-tree-view-from-json-object-javascript

function createTreeView(data) {
    var tree = [], object = {}, parent, child;

    for (let i = 0; i < data.length; i++) {
        parent = data[i]

        object[parent.id] = parent;
        object[parent.id]["children"] = [];
    }

    for (var one in object) {
        child = object[one];

        if (child.parent_id && object[child["parent_id"]]) {
            object[child["parent_id"]]["children"].push(child);
        } else {
            tree.push(child);
        }
    }

    return tree;
}

function CreateUlTreeView(items, parent) {
    var ul = document.createElement("ul");
    if (parent)
    {
        parent.appendChild(ul);
    }
    items.forEach((x) => {
        var li = document.createElement("li");
        var text = document.createElement("span");
        text.innerHTML = x.name;
        li.appendChild(text);
        if (x.children && x.children.length > 0)
        {
            CreateUlTreeView(x.children, li);
        }
        ul.append(li);
    });
    return ul;
}

var root = createTreeView(data);
CreateUlTreeView(root, document.getElementById("demo"))

function getEventTarget(e) {
    e = e || window.event;
    return e.target || e.srcElement;
}

var ul = document.getElementById('demo');
ul.onclick = function (event) {
    var target = getEventTarget(event);

    alert(target.innerHTML);
};