const btnRefresh = document.querySelector('.btn-refresh');
const inputRefresh = document.getElementById('input-refresh')
btnRefresh.addEventListener('click', RefreshHandler);

//placeholder
function RefreshHandler() {
    document.querySelector('.container').innerHTML = "";
    document.querySelector('.status').innerHTML = `Server Fetching 
    <div class="status-sub">Please Wait</div>`;
    if (inputRefresh.value==""||inputRefresh.value==undefined) {
        inputRefresh.value=1
    }
    fetch(`http://localhost:5000/fetch:${inputRefresh.value}`,{method:'GET'})
        .then(response => response.json())
        .then(data => {
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
                        document.querySelector('.status').innerHTML = "";
                        document.querySelector('.container').appendChild(div);
                    }
                    )
                });
        })
        .catch(error => {
            document.querySelector('.status').innerHTML = "ERROR";
            console.log(error)
        });

}