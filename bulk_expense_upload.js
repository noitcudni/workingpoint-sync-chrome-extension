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

// <li>Accumulated Depreciation</li>
// <li>Bank Service Charges</li>
// <li>Business Services</li>
// <li>Printing</li>
// <li>Shipping</li>
// <li>Car and Truck</li>
// <li>Gas & Fuel</li>
// <li>Parking</li>
// <li>Public Transportation</li>
// <li>Service & Parts</li>
// <li>Charitable Contributions</li>
// <li>Cost of Sales</li>
// <li>Labor</li>
// <li>Materials and Supplies</li>
// <li>Shipping</li>
// <li>Credit Card Account</li>
// <li>Customer Credits</li>
// <li>Depreciation Expense</li>
// <li>Dues and Subscriptions</li>
// <li>Equipment</li>
// <li>Estimated and Income Tax Payments</li>
// <li>Fees & Charges</li>
// <li>Health & Fitness</li>
// <li>Pharmacy</li>
// <li>Insurance</li>
// <li>Inventory Asset</li>
// <li>Jenny's Credit Card</li>
// <li>Licenses, Permits and Fees</li>
// <li>Lih's Credit Card</li>
// <li>Marketing and Advertising</li>
// <li>Merchant Fees</li>
// <li>Office Supplies</li>
// <li>Opening Balance Equity</li>
// <li>Other Expense</li>
// <li>Owner's Equity</li>
// <li>Draw</li>
// <li>Investment</li>
// <li>Payroll</li>
// <li>Professional Fees</li>
// <li>Rent or Lease</li>
// <li>Repairs and Maintenance</li>
// <li>Revenue</li>
// <li>Discounts</li>
// <li>Sales</li>
// <li>Shipping</li>
// <li>Sales Tax Payable</li>
// <li>Shopping</li>
// <li>Electronics & Software</li>
// <li>Travel, Meals and Entertainment</li>
// <li>Alcohol & Bars</li>
// <li>Coffee Shops</li>
// <li>Deductible Meals and Entertainment</li>
// <li>Fast Food</li>
// <li>Groceries</li>
// <li>Hotel</li>
// <li>Music</li>
// <li>Rental Car & Taxi</li>
// <li>Restaurants</li>
// <li>Travel</li>
// <li>Utilities</li>

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
          '<input size="50" data-list="#mylist" class="dropdown-input" />' + //my list is defined by $dropdownData
          '<button id="btn'+ i +'" class="dropdown-btn" type="button"><span class="caret"></span></button>' +
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

var $dropdownData = $('<div style="display:none">\
<ul id="mylist">\
<li>Accumulated Depreciation</li>\
<li>Bank Service Charges</li>\
<li>Business Services</li>\
<li>Business Services:Printing</li>\
<li>Business Services:Shipping</li>\
<li>Car and Truck</li>\
<li>Car and Truck:Gas & Fuel</li>\
<li>Car and Truck:Parking</li>\
<li>Car and Truck:Public Transportation</li>\
<li>Car and Truck:Service & Parts</li>\
<li>Charitable Contributions</li>\
<li>Cost of Sales</li>\
<li>Cost of Sales:Labor</li>\
<li>Cost of Sales:Materials and Supplies</li>\
<li>Cost of Sales:Shipping</li>\
<li>Credit Card Account</li>\
<li>Customer Credits</li>\
<li>Depreciation Expense</li>\
<li>Dues and Subscriptions</li>\
<li>Equipment</li>\
<li>Estimated and Income Tax Payments</li>\
<li>Fees & Charges</li>\
<li>Health & Fitness</li>\
<li>Health & Fitness:Pharmacy</li>\
<li>Insurance</li>\
<li>Inventory Asset</li>\
<li>Jenny\'s Credit Card</li>\
<li>Licenses, Permits and Fees</li>\
<li>Lih\'s Credit Card</li>\
<li>Marketing and Advertising</li>\
<li>Merchant Fees</li>\
<li>Office Supplies</li>\
<li>Opening Balance Equity</li>\
<li>Other Expense</li>\
<li>Owner\'s Equity</li>\
<li>Owner\'s Equity:Draw</li>\
<li>Owner\'s Equity:Investment</li>\
<li>Payroll</li>\
<li>Professional Fees</li>\
<li>Rent or Lease</li>\
<li>Repairs and Maintenance</li>\
<li>Revenue</li>\
<li>Revenue:Discounts</li>\
<li>Revenue:Sales</li>\
<li>Revenue:Shipping</li>\
<li>Sales Tax Payable</li>\
<li>Shopping</li>\
<li>Shopping:Electronics & Software</li>\
<li>Travel, Meals and Entertainment</li>\
<li>Travel, Meals and Entertainment:Alcohol & Bars</li>\
<li>Travel, Meals and Entertainment:Coffee Shops</li>\
<li>Travel, Meals and Entertainment:Deductible Meals and Entertainment</li>\
<li>Travel, Meals and Entertainment:Fast Food</li>\
<li>Travel, Meals and Entertainment:Groceries</li>\
<li>Travel, Meals and Entertainment:Hotel</li>\
<li>Travel, Meals and Entertainment:Music</li>\
<li>Travel, Meals and Entertainment:Rental Car & Taxi</li>\
<li>Travel, Meals and Entertainment:Restaurants</li>\
<li>Travel, Meals and Entertainment:Travel</li>\
<li>Utilities</li>\
</ul></div>');

  $("#add_panel .side-box-padding").append($csvFileInput);
  $("#add_panel .side-box-padding").append($bulkExpenseBtn);
  $("body").append($sheet);
  $("body").append($dropdownData);

  $("#fileInput").change(function() {
    console.log("did I get here?");
    $.each(this.files, function (i, f) {
      var reader = new FileReader();
      reader.onload = (function (e) {
        var rawTxt = e.target.result;
        Papa.parse(rawTxt, {
          header: true,
          complete: function(r) {
            console.log(r);
            var data = r['data'];
            // constructHeader($("#sheet"), data[0]);
            constructSheet($("#sheet table"), data);
            $("#sheet").show();
          }});


        var dropdownInputArry = $("input.dropdown-input");

        $.each(dropdownInputArry, function(i, input_dom) {
          var comboplete = new Awesomplete(input_dom, {
	          minChars: 0,
            sort: true,
            maxItems: 100,
            autoFirst: true
          });
          Awesomplete.$('#btn'+i).addEventListener("click", function() {
	          if (comboplete.ul.childNodes.length === 0) {
		          comboplete.minChars = 0;
		          comboplete.evaluate();
	          }
	          else if (comboplete.ul.hasAttribute('hidden')) {
		          comboplete.open();
	          }
	          else {
		          comboplete.close();
	          }
          });
        });

      });
      reader.readAsText(f);
    });
  });


});
