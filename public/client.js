const btnRefresh = document.querySelector('.btn-refresh');
btnRefresh.addEventListener('click', RefreshHandler);

function RefreshHandlerT() {
console.log(outer)
}

//placeholder
function RefreshHandler() {
    console.log(outer.outer)
    var itemsArray = outer.outer;
    itemsArray.forEach(function (E) {
        const link = document.createElement('a');
        const div = document.createElement('div');
        const pic = document.createElement('img');
        link.setAttribute('href', E.link);
        pic.setAttribute('src', E.pic);
        div.setAttribute('class', "element");
        // Build the template
        link.innerHTML = `
              ${E.link}
         `
         ;
         //${E.children[1].children[0].innerText}:${releaseHolder.replace("Released: ", "")}
         div.appendChild(pic);
         div.appendChild(link);
        document.querySelector('.Container').appendChild(div);
    });
}