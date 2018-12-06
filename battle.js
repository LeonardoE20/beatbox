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
    
    $.getJSON('https://api.airtable.com/v0/appUPAzb0MxNy4F7A/BEATBOX%20BATTLES?api_key=keyjafBekvjEMp3cm&view=Grid%20view',
      function (airtable) {
        var html = [];
        $.each(airtable.records, function (index, record) {
         var id = record.id;
         var name = record.fields['Name'];
         var title = record.fields['Title'];
          var pictures = record.fields['Pictures'];
          var videos = record.fields['Videos'];
          html.push(listView(id, name, title, pictures, videos));
          console.log(html);
        });
          $('.content').append(html);
          
      }
    );
  }



  var getOneRecord = function (id) {
    $.getJSON(`https://api.airtable.com/v0/appUPAzb0MxNy4F7A/BEATBOX%20BATTLES?${id}?api_key=keyjafBekvjEMp3cm`,
      function (record) {
        var html = [];
        var videos = record.fields['Videos'];
        var name = record.fields['Name'];
        var title = record.fields['Title'];
        html.push(detailView(videos, name, title));
      $('.detail').append(html);
      }
    );
  }

  var listView = function (id, name, title, pictures, videos) {
    return `
    <div class="card" style="width: 50rem;">
    ${pictures ? `<img class="card-img-top" src="${pictures[0].url}">` : ``}
         <div class="card-body">
           <div class="mic">
             <h2><a href="index.html?id=${id}">${title} </h2>
           </div>
         </div>
       </div>
    `}
//     <div class="card" style="width: 50rem;">
//     ${pictures ? `<img class="card-img-top" src="${pictures}">
//     <div class="card-body">
//       <div class="mic">
//         <h2><a href="index.html?id=${id}">${title}   </a>${levels ? `<img src="${levels[0].url}">` : ``}</h2>
//       </div>
//     </div>
//   </div>


  var detailView = function (  videos, name, title, ) {
    return `
    <p>${videos}</p>
    <p>${name}</p>
    <h2>${title}</h2>
    `;
  }
  
  var id = getParameterByName('id');
  if (id) {
    getOneRecord(id);
  } else {
    getAllRecords();
  }

