const btn = document.getElementById("btn")
const search = document.getElementById("search")
const main = document.getElementById("main")

search.addEventListener("click", function()
{
    main.innerHTML = ""
})

btn.addEventListener("click", function(){
    fetch(`http://www.omdbapi.com/?apikey=f268058d&s=${search.value}`)
    .then(res => res.json())
    .then(data => {
        if(data.Response === "True"){
        for(let i = 0; i < data.Search.length; i++){
            let imdbID = data.Search[i].imdbID  
            if(localStorage.getItem(imdbID)){
                continue
            }          
            fetch(`http://www.omdbapi.com/?apikey=f268058d&i=${imdbID}&plot=full`)
                .then(res => res.json())
                .then(data => {
                    main.innerHTML += `
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
                                    <button class="add-movies" id="${imdbID}" onclick="watch(${imdbID})">
                                        <img style="width:10px ; height: 10px;" src="https://th.bing.com/th/id/OIP.wnCmdErC9Zh5yPoSDGL0PgHaHa?w=175&h=180&c=7&r=0&o=5&dpr=1.25&pid=1.7">
                                        <p>Watchlist</p>
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
    }
    else{
        main.innerHTML = "<p>Jebi se</p>"
    }

    })
})


function watch(x){
    const btnId = document.getElementById(x.id)
    btnId.textContent = "Done"
    btnId.style.cursor = "not-allowed"
    localStorage.setItem(x.id, x.id)
}