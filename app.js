const findSongs = () => {
    const searchText = document.getElementById('lyric-search').value;
    const url = `https://api.lyrics.ovh/suggest/${searchText}`;
    toggleSpinner();
    fetch(url)
    .then(response => response.json())
    .then(data => showSongs(data.data));
}

document.getElementById('lyric-search')
    .addEventListener('keypress', event => {
        if(event.key == 'Enter'){
            // document.getElementById('search-btn').click();
            findSongs();
        }
    });

const showSongs = songs => {
    const songContainer = document.getElementById('song-container');
    document.getElementById('lyrics-container').innerText = "";
    songContainer.innerHTML = '';
    songs.forEach(song => {
        const title = song.title;
        const artist = song.artist.name;
        const preview = song.preview;

        const singleSongDiv = document.createElement('div');
        singleSongDiv.className = "single-result row align-items-center my-3 p-3";

        const details = `
            <div class="col-md-9">
                <h3 class="lyrics-name">${title}</h3>
                <p class="author lead">Album by <span>${artist}</span></p>
                <audio controls src="${preview}" type="audio/mpeg" ></audio>
            </div>
            <div class="col-md-3 text-md-right text-center">
                <button onclick="getLyrics('${artist}', '${title}')" class="btn btn-success">Get Lyrics</button>
            </div>
        `;

        singleSongDiv.innerHTML = details;
        songContainer.appendChild(singleSongDiv);
    });
    toggleSpinner();
}

const getLyrics = (artist, title) => {
    const url = `https://api.lyrics.ovh/v1/${artist}/${title}`;
    fetch(url)
        .then(response => response.json())
        .then(data => showLyrics(data.lyrics))
        .catch(error => alert("Sorry! Lyrics not found for this song."));
}

const showLyrics = lyrics => {
    if (lyrics.length > 0) {
        const lyricsContainer = document.getElementById('lyrics-container');
        lyricsContainer.innerText = lyrics;
        lyricsContainer.scrollIntoView();
    }
    else { 
        document.getElementById('lyrics-container').innerText = "";
        alert("Sorry! Lyrics not found for this song."); 
    }
}

const toggleSpinner = () => {
    const spinner = document.getElementById('loading-spinner');
    spinner.classList.toggle('d-none');
    const songs = document.getElementById('song-container');
    songs.classList.toggle('d-none');
}