$.getJSON('https://api.airtable.com/v0/appUPAzb0MxNy4F7A/Table%201?api_key=keyjafBekvjEMp3cm',
  function(airtable){
    var html = [];
    $.each(airtable.records, function(index, record) {
      var name = record.fields['Name'];
      var address = record.fields['Address'];
      var levels = record.fields['Levels'];
      html.push(`<h2>${name}, ${address}, ${rating}</h2>`);
    });
    $('body').append(html);
  }
);



