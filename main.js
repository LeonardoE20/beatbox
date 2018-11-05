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



