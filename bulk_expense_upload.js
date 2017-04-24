// var row_tmpl = _.template(
//   "\
// <% _.each(jsonData, function(rowData){%>\
// <tr>\
// <td><%=rowData['Name']%></td>\
// </tr>\
// <% }); %>\
// <tr>\
// </tr>\
// ");

function constructHeader($sheetDom, jsonData){
  console.log(Object.keys(jsonData)); //xxx
  //TODO: use a template
  // $sheetDom.append("<tr><td>foo</td><td>bar</td></tr>");
}

function constructSheet($sheetDom, jsonData) {
  for(var i = 0 ; i < jsonData.length; i++) {
    var d = jsonData[i];

    if (!(d['Date'] == undefined || d['Date'] == '')) {
      $sheetDom.append(
        '<tr>' +
          '<td style="border: 1px solid black; border-collapse:collapse; padding: 5px;">' +
          d['Date'] +
          '</td>' +
          '<td style="border: 1px solid black; border-collapse:collapse; padding: 5px;">' +
          d['Name'] +
          '</td>' +
          '<td style="border: 1px solid black; border-collapse:collapse; padding: 5px;">' +
          d['Amount'] +
          '</td>' +
          '</tr>'
      );
    }
  }
}

$(document).ready(function(){
  console.log("bulk expense upload ready");
  var $bulkExpenseBtn = $('<a id="bulk_expense" href="#" class="largegrey-button">Bulk Record Expenses<small></small></a>');
  var $csvFileInput = $('<input id="fileInput" type="file" />');
  var $sheet= $('<div id="sheet" style="z-index:1000; position: absolute; left:50%; top:5%; background-color:#ffffff; display:none;">\
<table style="border: 1px solid black;"></table>\
</div>');

  $("#add_panel .side-box-padding").append($csvFileInput);
  $("#add_panel .side-box-padding").append($bulkExpenseBtn);
  $("body").append($sheet);

  // $("#bulk_expense").click(function(){
  // });


  $("#fileInput").change(function() {
    console.log("did I get here?");
    $.each(this.files, function (i, f) {
      var reader = new FileReader();
      reader.onload = (function (e) {
        var rawTxt = e.target.result;
        // console.log(rawTxt);
        Papa.parse(rawTxt, {
          header: true,
          complete: function(r) {
            console.log(r);
            var data = r['data'];
            // constructHeader($("#sheet"), data[0]);
            constructSheet($("#sheet table"), data);
            $("#sheet").show();
          }});
      });
      reader.readAsText(f);
    });
  });


});
