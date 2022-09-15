const watchlistMain = document.getElementById("watchlist-main")
if(localStorage.length > 0){
    watchlistMain.innerHTML = ""
}
for (let [key, value] of Object.entries(localStorage)) {
    fetch(`https://www.omdbapi.com/?apikey=f268058d&i=${key}&plot=full`)
        .then(res => res.json())
        .then(data => {
            watchlistMain.innerHTML += `
            <div class="main-search">
                <img src="${data.Poster}">
                <div>
                    <div class="main-search-div title">
                        <p>${data.Title}</p>
                        <img style="width:10px ; height: 10px;"  src="https://th.bing.com/th/id/OIP.Ke98jsu1AKFMjZSI7-QjCAHaHa?w=178&h=180&c=7&r=0&o=5&dpr=1.25&pid=1.7">
                        <p>${data.imdbRating}
                    </div>
                    <div class="main-search-div genre">
                        <p>${data.Runtime}</p>
                        <p>${data.Genre}</p>
                        <button class="add-movies" id="${key}" onclick="remove(${key})">
                            <img style="width:10px ; height: 10px;" src="https://encrypted-tbn0.gstatic.com/images?q=tbn:ANd9GcQ4HWr7ioUDXNVzOWiVx7KTmnz3fYV9t7ww3g&usqp=CAU">
                            <p>Remove</p>
                        </button>
                    </div>
                    <div class="main-search-div plot">
                        <p  class="plot">${data.Plot.substr(0, 120)} <span>continue reading</span></p>
                    </div>
                <div>
            </div>
        `
    })
}

function remove(x){
    localStorage.removeItem(x.id)
    window.location.reload(true)
}