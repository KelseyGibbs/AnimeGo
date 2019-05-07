// build a function that takes an argument of the name of the anime and passes to the ajax call

function getAnime(...arr) {
    for (let i = 0; i < arr.length; i++) {
        // ajax call is made for each anime passed as an argument and it sends the anime data to each img tag
        $.ajax("/api/" + arr[i]).then(function(response) {
            const info = {
                title: response.data[0].attributes.titles.en,
                rating: response.data[0].attributes.averageRating,
                poster: response.data[0].attributes.posterImage.original,
                synopsis: response.data[0].attributes.synopsis,
                apiLink: response.data[0].links
            };

            // create clickable elements that will hold the animes
            const newPoster = $(
                "<a href='#' data-toggle='modal' data-target='#mymodal'></a>"
            );
            newPoster.attr("id", "poster" + i);
            newPoster.attr("data-info", JSON.stringify(info));
            newPoster.addClass(
                "col-4 card bg-danger p-2 offset-1 mb-1 badge-info"
            );
            // create anime title
            const title = $("<h5></h5>");
            title.text(info.title);
            // create image
            const img = $("<img/>");
            img.attr({
                id: "grid_" + i,
                style: "max-height:75%;",
                src: info.poster
            });

            // store the info object into a data attribute to be accessed later
            img.addClass("img-fluid");

            // appending elements
            newPoster.append(img);
            newPoster.append(title);

            $("#anime_grid").append(newPoster);
        });
    }
}

getAnime(
    "naruto",
    "bleach",
    "totoro",
    "one piece",
    "death note",
    "attack on titan"
);

$("document").ready(function() {
    $("#anime_grid").on("click", "a", function() {
        const info = $(this).data("info");
        // remove the last piece of the array

        // logs of info
        console.log("Object: ", info);

        console.log("Title: ", info.title);
        console.log("Rating: ", info.rating);
        // console.log("Synopsis: ", info.synopsis);
        console.log("Poster: ", info.poster);

        // MODAL

        // title
        $(".modal-title").text(info.title);

        // image
        $(".modal-image").attr("src", info.poster);
        // modal body text, removing the last part of the paragraph which says credits to who wrote it.
        $(".modal-synopsis").text(
            info.synopsis
                .split(".")
                .slice(0, -1)
                .join(". ") + "."
        );
    });
});
