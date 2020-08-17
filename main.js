searchButton.addEventListener('click',function(){
    const searchSong = document.getElementById('searchSong').value;

    fetch(`https://api.lyrics.ovh/suggest/${searchSong}/`)
    .then(res => res.json())
    .then(data => getSong(data));
})

function getSong(mySong){
    let fullLyric = document.getElementById('fullLyric');
    for(let i = 0; i<10 ;i++){
        let title = mySong.data[i].title;
        let albumTitle = mySong.data[i].album.title;
        let artist = mySong.data[i].artist.name;
        let img = mySong.data[i].artist.picture_small;
        
        let result = `<div class="single-result row align-items-center my-3 p-3">
            <div class="col-md-8">
                <h3 class="lyrics-name" id="title">${title}</h3>
                <p class="author lead">Album by <span id="artistName">${artist}</span></p>
                <p class="author lead">Album Title :  <span id="artistName">${albumTitle}</span></p>
            </div>
            <div class="col-md-1">
                <img src="${img}" alt="">
            </div>
            <div class="col-md-3 text-md-right text-center">
                <button  onclick="myArtistTitle('${artist}','${title}')" class="btn btn-success">Get Lyrics</button>
            </div>
        </div>`;
        fullLyric.innerHTML += result;
        
    }
}

function myArtistTitle(artist,title){
    fetch(`https://api.lyrics.ovh/v1/${artist}/${title}`)
    .then(res => res.json())
    .then(song => getLyrics(song,title));
}

function getLyrics(song,title){
    if(song.lyrics == undefined){
        document.getElementById('showLyrics').innerText = "lyrics name not found.";
    }else{
        document.getElementById('showLyrics').innerText = song.lyrics;
    }
    document.getElementById('songName').innerText = title;
}