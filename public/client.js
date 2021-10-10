const btnRefresh = document.querySelector('.btn-refresh');
btnRefresh.addEventListener('click', RefreshHandler);

function RefreshHandlerT() {
console.log(outer)
}

//placeholder
function RefreshHandler() {
    var itemsArray = JSON.parse(outer);
    itemsArray.forEach(function (E) {
        const link = document.createElement('a');
        const pic = document.createElement('img');
        link.setAttribute('href', E.link);
        link.setAttribute('src', E.pic);
        // Build the template
        link.innerHTML = `
              ${E.link}
         `
         ;
         //${E.children[1].children[0].innerText}:${releaseHolder.replace("Released: ", "")}

        document.getElementsByClassName('Container').appendChild(link);
        document.getElementsByClassName('Container').appendChild(pic);
    });
}