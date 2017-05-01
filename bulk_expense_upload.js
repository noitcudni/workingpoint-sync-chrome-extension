// payload when submit a expense : {"account_transaction":{"custom_values":{"name":"test","payment_method":""},"reference":"","posted_date":"04/30/2017","memo":"","entries":{"0":{"account":{"path":"Travel, Meals and Entertainment"},"memo":"","amount":"40.00","position":"0"}},"inventory_entries":{"0":{"item_id":"","item_qty":"","amount":"","unit_cost":"","position":"0"}},"account":{"path":"Checking Account"}},"expense":true,"authenticity_token":"pSydNvA8ShzwqfU9xRHMh3krVBZl8TVLceD9ClahTeQ=","need_widget_dom":true,"need_money_inout_chart_data":true,"need_expenses_chart_data":true,"submitting_form":true,"dont_handle_errors":true}

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
        '<tr row="'+i+'">' +
          '<td style="border: 1px solid black; border-collapse:collapse; padding: 5px;">' +
          d['Date'] +
          '</td>' +
          '<td style="border: 1px solid black; border-collapse:collapse; padding: 5px;">' +
          d['Name'] +
          '</td>' +
          '<td style="border: 1px solid black; border-collapse:collapse; padding: 5px;"><input class="my-checkbox" row="'+i+'"type="checkbox"></td>' +
          '<td style="border: 1px solid black; border-collapse:collapse; padding: 5px;">' +
          '<input size="50" data-list="#mylist" class="dropdown-input" />' + //my list is defined by $dropdownData
          '<button id="btn'+ i +'" class="dropdown-btn" type="button"><span class="caret"></span></button>' +
          '</td>' +
          '<td style="border: 1px solid black; border-collapse:collapse; padding: 5px;">' +
          Math.abs(d['Amount']) +
          '</td>' +
          '</tr>'
      );
    }
  } // for
  $sheetDom.append();
}

$(document).ready(function(){
  console.log("bulk expense upload ready");
  var $bulkExpenseBtn = $('<a id="bulk_expense" href="#" class="largegrey-button">Bulk Record Expenses<small></small></a>');
  var $csvFileInput = $('<input id="fileInput" type="file" />');
  var $sheet= $('<div id="sheet" style="z-index:1000; position: absolute; left:30%; top:5%; background-color:#ffffff; display:none;">\
<div id="my_form"></div>\
<table style="border: 1px solid black;"></table>\
<button id="import-btn" style="background-color: #4CAF50; border: none; color: white; padding: 15px 32px; text-align: center; text-decoration: none; display: inline-block; font-size: 16px;" type="button">Import Data</button>\
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
    // $("#local_nav").append($csvFileInput);
    // $("#local_nav").append($bulkExpenseBtn);
  $("body").append($sheet);
  $("body").append($dropdownData);



  $("#fileInput").change(function() {
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
            maxItems: 100
            // autoFirst: true
            // "awesomplete-select": function(e){
              // console.log(e);
            // }
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

        $(".my-checkbox").click(function(e){
          var row_id = $(e.target).attr('row');
          if (e.currentTarget.checked) {
            $("tr[row='"+row_id+"']").attr('bgcolor', '#98fb98');
          } else {
            $("tr[row='"+row_id+"']").attr('bgcolor', '#ffffff');
          }
        });

        $("#import-btn").click(function(){
          var $selectedRows = $("input.my-checkbox:checked"); //xxx
          var rows = $selectedRows.attr("row");

          console.log("selected row");
          // console.log(rows);//xxx TODO: loop throufh row
          console.log($selectedRows);//xxx
          console.log($selectedRows.length);//xxx
          $.each($selectedRows, function(i, r){
            var row_index = $(r).attr("row");
            // console.log($(r).attr("row")); //xxx
            var $td = $("tr[row='"+ row_index +"'] td");
            // console.log($td);
            console.log("-----");
            var date = $($td[0]).text();
            var paid_to = $($td[1]).text();
            var account = $($td[3]).find("input").val();
            var amount = $($td[4]).text();
            console.log(date);
            console.log(paid_to);
            console.log(account);
            console.log(amount);

            // document.getElementById("launch_adjusting_entry_transaction_action_links").click();
            // $("#launch_adjusting_entry_transaction_action_links")[0].dispatchEvent(new MouseEvent("click"));
            // $("#launch_adjusting_entry_transaction_action_links")[0].click();
            // console.log($("#launch_adjusting_entry_transaction_action_links"));
            // $(".blue-button.new_adjusting_entry_link")[0].dispatchEvent(new MouseEvent("click"));
            // $(".blue-button.new_adjusting_entry_link")[0].click(); //works in transaction

            //TODO get rid of inner label

            //inner_labeled account account_field basic-text-field full
            //inner_labeled account account_field basic-text-field full

            // setTimeout(function() {
            // $("#account_transaction_new_entries_0_account_path").removeClass("inner_label").val("Checking Account"); //checking credit
            // $("#account_transaction_new_entries_1_account_path").removeClass("inner_label").val(account); //expense debit
            // $("#account_transaction_new_entries_0_credit").removeClass("inner_label").val(amount);
            // $("#account_transaction_new_entries_1_debit").removeClass("inner_label").val(amount);
            // $("#account_transaction_new_memo").removeClass("inner_label").val(paid_to); //business name
            // $("#account_transaction_new_posted_date").val(date);
            // }, 1100);

            // $("#launch_adjusting_entry_transaction_action_links")[0].click();
            // console.log($("#launch_adjusting_entry_transaction_action_links")[0]); //xxx
            // console.log($(".new_form transaction_form"));
            // console.log($("a[href='bank_account']"));
            // console.log($("#new_expense_transaction_form_menu")).click();
            // $("a.btn-arrow.button_link").parent()[0].dispatchEvent(new MouseEvent("click"));
            // console.log($("a.btn-arrow.button_link").parent());
            var token = $("meta[name='csrf-token']").attr("content");
            console.log(token);

            $.ajax({
              type: "POST",
              headers: {
                "X-CSRF-Token": token,
                "X-Request": "JSON",
                "Content-Type": "application/json",
                "Accept": "application/json",
                "X-Requested-With": "XMLHttpRequest",
              },
              error: function(error) {
                console.log(error);
              },
              url: "https://polymorphiclabs.workingpoint.com/payment_made_transactions",
              data: JSON.stringify({"account_transaction":
                                    {"custom_values":
                                     {"name": paid_to,
                                      "payment_method":"Online/EFT"},
                                     "reference":"",
                                     "posted_date": date,
                                     "memo":"","entries":{"0":{"account":{"path":account},"memo":"","amount": amount,"position":"0"}},
                                     "inventory_entries":{"0":{"item_id":"","item_qty":"","amount":"","unit_cost":"","position":"0"}},
                                     "account":{"path":"Checking Account"}
                                    },
                                    "expense":true,"authenticity_token":"JNSo9NSV0t32SAu2WfcFAQLeqAQDDKEj2o8JfSpLxQs=","need_widget_dom":true,"need_money_inout_chart_data":true,"need_expenses_chart_data":true,"submitting_form":true,"dont_handle_errors":true})
            });
          });
        $("#sheet").hide();
        });
      });
      reader.readAsText(f);
    });
  });


});
