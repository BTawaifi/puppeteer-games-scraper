const btnRefresh = document.querySelector('.btn-refresh');
btnRefresh.addEventListener('click', RefreshHandler);

function RefreshHandlerT() {
    fetch('./GameList.json')
        .then(response => response.json())
        .then(data => console.log(data))
        .catch(error => console.log(error));
}

//placeholder
function RefreshHandler() {
    document.querySelector('.container').innerHTML = "";
    fetch('./GameList.json')
        .then(response => response.json())
        .then(data => {
            if (data == "") {
                document.querySelector('.container').innerHTML = "Server Still Fetching";
            }

            else
                data.forEach((mainArr) => {
                    mainArr.forEach(function (E) {
                        const link = document.createElement('a');
                        const div = document.createElement('div');
                        const pic = document.createElement('img');
                        link.setAttribute('href', E.link);
                        pic.setAttribute('src', E.pic);
                        div.setAttribute('class', "card");
                        div.appendChild(link);
                        link.appendChild(pic);
                        document.querySelector('.container').appendChild(div);
                    }
                    )
                });
        })
        .catch(error => {
            document.querySelector('.container').innerHTML = "Server Still Fetching";
            console.log(error)

        });

}