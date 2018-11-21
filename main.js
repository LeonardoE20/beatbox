function getParameterByName(name, url) {
  if (!url) url = window.location.href;
  name = name.replace(/[\[\]]/g, '\\$&');
  var regex = new RegExp('[?&]' + name + '(=([^&#]*)|&|#|$)'),
      results = regex.exec(url);
  if (!results) return null;
  if (!results[2]) return '';
  return decodeURIComponent(results[2].replace(/\+/g, ' '));
}

var getAllRecords = function() {
$.getJSON('https://api.airtable.com/v0/appUPAzb0MxNy4F7A/Table%201?api_key=keyjafBekvjEMp3cm',
  function(airtable){
    var html = [];
    $.each(airtable.records, function(index, record) {
      var name = record.fields['Name'];
      var description = record.fields['Description'];
      var levels = record.fields['Levels'];
      var learning = record.fields['Learning'];
      html.push(`<button type="button" class="btn btn-primary">${name}</button>`);
    });
    $('body').append(html);
  }
);
}

style="width: 100%; height: 500px;"

var getOneRecord = function(id) {
  $.getJSON(`https://api.airtable.com/v0/appSrgke7E0ElZhMY/Locations/${id}?api_key=key2m8VgwGT2iztad`,
    function(record){
      var html = [];
      var name = record.fields['Name'];
      var address = record.fields['Address'];
      var rating = record.fields['Rating'];
      var picture = record.fields['Pictures'];
      var cost = record.fields['Cost'];
      var type = record.fields['Type'];
      html.push(detailView(name, address, rating, picture, cost, type ));
      $('body').append(html);
    }
  );
}

var listView = function(id, name, rating, picture) {
  return `
    <h2><a href="index.html?id=${id}">${name}</a></h2>
    <p>${rating}</p>
    ${picture ? `<img src="${picture[0].url}">` : ``}
  `;
}

var detailView = function(name, address, rating, picture, cost, type) {
  return `
    <h2>${name}</h2>
    <p>${address}</p>
    <p>${rating}</p>
    <p>${cost}</p>
    <p>${type}</p>
    ${picture ? `<img src="${picture[0].url}">` : ``}
  `;
}

var id = getParameterByName('id');
if (id) {
  getOneRecord(id);
} else {
  getAllRecords();
}