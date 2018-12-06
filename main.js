function getParameterByName(name, url) {
  if (!url) url = window.location.href;
  name = name.replace(/[\[\]]/g, '\\$&');
  var regex = new RegExp('[?&]' + name + '(=([^&#]*)|&|#|$)'),
    results = regex.exec(url);
  if (!results) return null;
  if (!results[2]) return '';
  return decodeURIComponent(results[2].replace(/\+/g, ' '));
}

var getAllRecords = function () {
  $.getJSON('https://api.airtable.com/v0/appUPAzb0MxNy4F7A/BEATBOX%20TUTORIALS?api_key=keyjafBekvjEMp3cm&view=Grid%20view',
    function (airtable) {
      var html = [];
      $.each(airtable.records, function (index, record) {
       var id = record.id;
        var title = record.fields['Title'];
        var pictures = record.fields['Pictures'];
        var levels = record.fields['Levels'];
        html.push(listView(id, title, pictures, levels));
      });
        $('.content').append(html);
    }
  );
}

var getOneRecord = function (id) {
  $.getJSON(`https://api.airtable.com/v0/appUPAzb0MxNy4F7A/BEATBOX%20TUTORIALS/${id}?api_key=keyjafBekvjEMp3cm`,
    function (record) {
      var html = [];
      var name = record.fields['Name'];
      var title = record.fields['Title'];
      var description = record.fields['Description'];
      var pictures = record.fields['Pictures'];
      var videos = record.fields['Videos'];
      var levels = record.fields['Levels'];
      var learning = record.fields['Learning'];
      html.push(detailView(description, videos, levels, learning));
    $('.detail').append(html);
    }
  );
}
// ${videos ? `<iframe width="560" height="315" src="${videos[0].url}" frameborder="0" 
//   allow="accelerometer; autoplay; encrypted-media; gyroscope; picture-in-picture" allowfullscreen></iframe>` : ``}

var listView = function (id, title, pictures, levels) {
  return `
  <div class="card" style="width: 50rem;">
    ${pictures ? `<img class="card-img-top" src="${pictures[0].url}">` : ``}
    <div class="card-body">
      <div class="mic">
        <h2><a href="index.html?id=${id}">${title}   </a>${levels ? `<img src="${levels[0].url}">` : ``}</h2>
      </div>
    </div>
  </div>
  `;
}

// <h2><a href="index.html?id=${id}">${description}</a></h2>
  // <iframe width="560" height="315" src=${videos}> frameborder="0" 
  // allow="accelerometer; autoplay; encrypted-media; gyroscope; picture-in-picture" allowfullscreen></iframe>

var detailView = function (description, videos, levels, learning) {
  return `
  <p>${videos}</p>
  <h2>${description}</h2>
  ${levels ? `<img src="${levels[0].url}">` : ``}
  <h3>${learning}</h3>
  `;
}

var id = getParameterByName('id');
if (id) {
  getOneRecord(id);
} else {
  getAllRecords();
}

var getAllRecordsBattles = function () {
  $.getJSON('https://api.airtable.com/v0/appUPAzb0MxNy4F7A/BEATBOX%20BATTLES?keyjafBekvjEMp3cm',
  function (airtable) {
    var html = [];
    $.each(airtable.records, function (index, record) {
     var id = record.id;
      var name = record.fields['Name'];
      var title = record.fields['Title'];
      var description = record.fields['Description'];
      var pictures = record.fields['Pictures'];
      var videos = record.fields['Videos'];
       
      html.push(listView2(id, name, title, description, pictures, videos ));
    });
      $('.battle').append(html);
  }
);
}

var listView2 = function (id, name, title, description, pictures, videos) {
  return `
  <div class="card" style="width: 50rem;">
  <h2><a href="battle.html?id=${id}">${name}</a></h2> 
  ${pictures ? `<img class="card-img-top" src="${pictures[0].url}">` : ``}
    <div class="card-body">
      <div class="mic">
        <h2><a href="index.html?id=${id}">${title}   </a>${levels ? `<img src="${levels[0].url}">` : ``}</h2>
      </div>
    </div>
  </div>
  `;
}


/*var id = getParameterByName('id');
if (id) {
  getOneRecord(id);
} else {
  getAllRecords();
}*/