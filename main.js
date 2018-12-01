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
  $.getJSON('https://api.airtable.com/v0/appUPAzb0MxNy4F7A/BEATBOX%20TUTORIALS?api_key=keyjafBekvjEMp3cm',
    function (airtable) {
      var html = [];
      $.each(airtable.records, function (index, record) {
       var id = record.id;
        var name = record.fields['Name'];
        var description = record.fields['Description'];
        var pictures = record.fields['Pictures'];
        var videos = record.fields['Videos']; 
        var levels = record.fields['Levels'];
        var learning = record.fields['Learning'];
        html.push(listView(id, name, description, pictures, videos, levels, learning));
      });
        $('body').append(html);
    }
  );
}

var getOneRecord = function (id) {
  $.getJSON(`https://api.airtable.com/v0/appUPAzb0MxNy4F7A/BEATBOX%20TUTORIALS/${id}?api_key=keyjafBekvjEMp3cm`,
    function (record) {
      var html = [];
      var name = record.fields['Name'];
      var description = record.fields['Description'];
      var pictures = record.fields['Pictures'];
      var videos = record.fields['Videos'];
      var levels = record.fields['Levels'];
      var learning = record.fields['Learning'];
      html.push(detailView(name, description, pictures, videos, levels, learning));
    $('body').append(html);
    }
  );
}
// ${videos ? `<iframe width="560" height="315" src="${videos[0].url}" frameborder="0" 
//   allow="accelerometer; autoplay; encrypted-media; gyroscope; picture-in-picture" allowfullscreen></iframe>` : ``}

var listView = function (id, name, description, pictures, videos, levels, learning) {
  return `
  <h2>${name}</h2>
  <h2><a href="index.html?id=${id}">${description}</a></h2>
  <iframe width="560" height="315" src=${videos}> frameborder="0" 
  allow="accelerometer; autoplay; encrypted-media; gyroscope; picture-in-picture" allowfullscreen></iframe>
    ${levels ? `<img src="${levels[0].url}">` : ``}
    <p>${learning}</p>
  `;
}

var detailView = function (name, description, pictures, videos, levels, learning) {
  return `
  <h2><a href="index.html?id=${name}">${description}</a></h2>
  ${pictures ? `<img src="${pictures[0].url}">` : ``}
  <p>${videos}</p>
  ${levels ? `<img src="${levels[0].url}">` : ``}
  <p>${learning}</p>
  `;
}

var id = getParameterByName('id');
if (id) {
  getOneRecord(id);
} else {
  getAllRecords();
}