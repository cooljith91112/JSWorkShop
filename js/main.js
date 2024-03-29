(function () {

    function Movie(){
        var searchInput = document.getElementById('search-input');
        searchInput.addEventListener('input',function(event){
            var searchText = event.target.value;
            var availableMoviesRaw = localStorage.getItem('popular-movies');
            if(availableMoviesRaw){
                var availableMovies = JSON.parse(availableMoviesRaw).results;
                var filteredMovies = availableMovies.filter(function(_movie){
                    return(_movie.title.toLowerCase().indexOf(searchText.toLowerCase())>-1);
                });
                if(filteredMovies.length>0){
                    document.getElementById('renderArea').innerHTML = "";
                    this.movieListing(filteredMovies);

                }
            }
        }.bind(this))
    }

    Movie.prototype.loadPopularMovies = function(){
        const xhr = new XMLHttpRequest(),
        method = "GET",
        url = "https://api.themoviedb.org/3/discover/movie?sort_by=popularity.desc&api_key=06dcefc4c6268cb53b82f76560368636";

        xhr.open(method, url, true);
        xhr.onreadystatechange = function () {
            if (xhr.readyState === XMLHttpRequest.DONE && xhr.status === 200) {
                // console.log(xhr.responseText);
                var rawResponseData = xhr.responseText;
                localStorage.setItem('popular-movies',rawResponseData);
                var jsonData = JSON.parse(rawResponseData);
                this.movieListing(jsonData.results);
            }
        }.bind(this);
        xhr.send();
    } 

    Movie.prototype.movieListing = function(movies){
        var totalMovies = movies.length;
        var renderArea = document.getElementById('renderArea');
        var row = document.createElement('div');
        row.className = "row";
        var mytest =  `sdfsfsdf ${totalMovies}`;

        for(var i=0; i<totalMovies; i++){
            var movieContainer = document.createElement('div');
            movieContainer.className = "card col-md-4";
            movieContainer.style.width = "18rem";

            var cardBody = document.createElement('div');

            var cardTitle = document.createElement('h5');
            cardTitle.innerText = movies[i]["title"];

            var cardText = document.createElement('p');
            cardText.innerText = movies[i]["overview"];

            cardBody.appendChild(cardTitle);
            cardBody.appendChild(cardText);

            movieContainer.appendChild(cardBody)
            row.appendChild(movieContainer);
            // movieContainer.innerText = movies[i]["title"];
            renderArea.appendChild(row);
        }
    }

    var movieInstance = new Movie();
    movieInstance.loadPopularMovies();

})();