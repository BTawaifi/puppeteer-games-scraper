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
        const pic = document.createElement('img');
        link.setAttribute('href', E.link);
        pic.setAttribute('src', E.pic);
        // Build the template
        link.innerHTML = `
              ${E.link}
         `
         ;
         //${E.children[1].children[0].innerText}:${releaseHolder.replace("Released: ", "")}

        document.querySelector('.Container').appendChild(link);
        document.querySelector('.Container').appendChild(pic);
    });
}