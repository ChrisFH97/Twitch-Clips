
document.addEventListener("DOMContentLoaded", function() {
    loadClipData((clips)=>{
        populateClipContainer(clips)
    })
});


/**
 * 
 * @param {*} clips - JSON Array of Twitch Clips 
 */
function loadClipData(clips) {   

    var xobj = new XMLHttpRequest();
        xobj.overrideMimeType("application/json");
        xobj.open('GET', 'data', true);
        xobj.onreadystatechange = function () {
          if (xobj.readyState == 4 && xobj.status == "200") {
            // Required use of an anonymous callback as .open will NOT return a value but simply returns undefined in asynchronous mode
            clips(JSON.parse(xobj.responseText));
          }
    };
    xobj.send(null);  
}

function populateClipContainer(clips){
    for(var i = 0; i < clips.length; i++) {
        var obj = clips[i];
        var container = document.getElementById("container");
        container.appendChild(createClipElement(obj));
    }
}

function createClipElement(obj){
    var file = obj.download_url +"";
    var fileE = file.split("/")[3]
    var clip = document.createElement("article");
    clip.setAttribute("class","container__clip")
    clip.setAttribute('data-title',obj.title)
    clip.setAttribute('data-author',obj.creator_name)
    clip.setAttribute('data-created',obj.created_at)
    clip.innerHTML = `            
    <figure>
        <a onclick="setVideo('${fileE.replace(".mp4","")}','${obj.title.replace("'","").replace("\n","").split("\"").join("")}')" href="javascript:void(0)">
        <img class="videoThumb" src="${obj.thumbnail_url}"></a>
    </figure>
    <h2 class="container__clip__title">${obj.title}</h2>
    <h3 class="container__clip__subtitle">Clipped By <b>${obj.creator_name}</b></h3>
    <h3 class="container__clip__subtitle">Category: <b>${obj.game.name}</b></h3>
    `

    return clip;
}
