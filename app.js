const search = document.getElementById('search');
const submit = document.getElementById('submit');
const result = document.getElementById('search-result')
const apiUrl = "https://api.lyrics.ovh/";
const simpleResult = document.querySelector('.simple-result');
const singleLyric = document.querySelector('.single-lyrics');



//search by song or artist
async function searchSongs(term) {
    const res = await fetch(`${apiUrl}/suggest/${term}`);
    const data = await res.json();

    showData(data);
}
//show data in dom
function showData(data) {
    result.innerHTML =
        `${data.data.map(song => `
                            <div class="single-result row align-items-center my-3 p-3">
                            <div class="col-md-9">
                                <h3 class="lyrics-name">${song.title}</h3>
                                <p class="author lead">Album by <span>${song.artist.name}</span></p>
                            </div>
                            <div class="col-md-3 text-md-right text-center">
                                <button class="btn btn-success" data-artist="${song.artist.name}" data-songTitle="${song.title}">Get Lyrics</button>
                            </div>
                        </div>`


        ).join('')}`;

    console.log(result);


}

//get lyrics
async function getLyrics(artist, songTitle) {
    const res = await fetch(`${apiUrl}/v1/${artist}/${songTitle}`);
    const data = await res.json();

    const lyrics = data.lyrics.replace(/(\r\n|\r|n)/g, '<br>');

    singleLyric.innerHTML = `<h2 class="text-success mb-4">${artist} - ${songTitle}</h2>
    <pre class="lyric text-white">${lyrics}</pre>`

    result.innerHTML = '';

}


//Event Listener
submit.addEventListener('click', e => {
    searchTerm = search.value.trim();

    if (!searchTerm) {
        alert('Type in a Search Item')
    } else {
        searchSongs(searchTerm);
    }

    singleLyric.innerHTML = '';

})

//get lyric on click get lyric

result.addEventListener('click', e => {
    const clickedItem = e.target;

    if (clickedItem.tagName === 'BUTTON') {
        const artist = clickedItem.getAttribute('data-artist');
        const songTitle = clickedItem.getAttribute('data-songTitle');

        getLyrics(artist, songTitle);
    }
})


//default states of results and lyrics
simpleResult.innerHTML = '';
singleLyric.innerHTML = '';
result.innerHTML = '';