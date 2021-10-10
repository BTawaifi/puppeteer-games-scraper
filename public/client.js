const btnRefresh = document.querySelector('.btn-refresh');
btnRefresh.addEventListener('click', RefreshHandlerT);

function RefreshHandlerT() {
console.log(outer)
}

//placeholder
function RefreshHandler() {
    var items = JSON.parse(outer);
    itemsArray = Array.from(items);
    let i = 0;
    itemsArray.forEach(function (E) {
        const row = document.createElement('option');
        i++;
        row.setAttribute('value', i);
        // Build the template
        let releaseHolder = E.children[2].innerText;
        row.innerHTML = `
              ${E.children[1].children[0].innerText}:${releaseHolder.replace("Released: ", "")}
         `;
        // Add into the cart
        searchStatus.innerText = 'Found';
        searchStatus.style.color = "green";
        document.getElementById('found').appendChild(row);
        document.getElementById('animePic').src = itemsArray[0].children[0].firstElementChild.firstElementChild.src;
    });
}