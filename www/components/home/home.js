'use strict';

app.home = kendo.observable({
    onShow: function () { },
    afterShow: function () { }
});
app.localization.registerView('home');

(function (parent) {
    var
        homeModel = kendo.observable({
            salary: "₹ 0.0",
            month: "",
            totalexp:"₹ 0.0",
            nocategory: 0,
            monthNames : ["January", "February", "March", "April", "May", "June",
        "July", "August", "September", "October", "November", "December"
      ],
            addNewItem: function () {
                app.mobileApp.navigate("components/item/newitem.html");
            },
            saveSalary: function () {
                var salary = [];

                if(localStorage.getItem('salary')){
                    salary  = JSON.parse(localStorage.getItem('salary'));
                }

                var month = homeModel.month;

                if($("input[type='radio']:checked" ).val()){
                    month = $( "input[type='radio']:checked").val();
                }

                if(salary.length > 0){
                    var foundSalary = false;
                    $.each(salary,function(k,v){
                        if(v.month == month && v.year == new Date().getFullYear()){
                            v.salary = homeModel.newsalary;
                            foundSalary = true;
                        }
                    });
                    if(foundSalary){
                        localStorage.setItem('salary',JSON.stringify(salary));
                    } else{
                        var data = {
                            month: month,
                            year: new Date().getFullYear(),
                            salary:homeModel.newsalary
                        }
                        salary.push(data);
                        localStorage.setItem('salary',JSON.stringify(salary));
                    }
                   
                }else{
                    var data = {
                        month: month,
                        year: new Date().getFullYear(),
                        salary:homeModel.newsalary
                    }
                    salary.push(data);
                    localStorage.setItem('salary',JSON.stringify(salary));
                    
                }

                if(month == homeModel.monthNames[new Date().getMonth()]){
                    homeModel.set('salary',homeModel.newsalary);
                }
                
            }
        });

    parent.set('homeModel', homeModel);

    parent.set('onShow', function (e) {
        var onlyCategory = [
        {text : "Food"},
            {text : "House"},
            {text : "Vegetable"},
            {text : "Bills"},
            {text : "Construction"},
            {text : "EMI"},
            {text : "Travel"},
            {text : "Shopping"},
            {text : "Rent"}];

            if(!localStorage.getItem('onlyCategory')){
                localStorage.setItem("onlyCategory",JSON.stringify(onlyCategory));
            }

        if(localStorage.getItem('notcategory')){
            var notcategory = JSON.parse(localStorage.getItem('notcategory'));
            homeModel.set('nocategory',notcategory.length);
        }

        var d = new Date();
        homeModel.set('month', homeModel.monthNames[d.getMonth()]);
        homeModel.set('prevmonth', homeModel.monthNames[d.getMonth()-1]);
        homeModel.set('nextmonth', homeModel.monthNames[d.getMonth()+1]);


        var currentSalary = 0.0;

        if(localStorage.getItem('salary')){
            var salary = JSON.parse(localStorage.getItem('salary'));

            $.each(salary, function(k,v){
                if(v.month == homeModel.monthNames[d.getMonth()] && v.year == d.getFullYear() ){
                    currentSalary = v.salary;
                }
            });
        }

        homeModel.set('salary',currentSalary);

        $("#salary").kendoNumericTextBox({
            format: "₹​ #.00"
        });

        $("#modal1").modal();
        $("#salaryedit").kendoButton({
            click: function(){
                $('#modal1').modal('open');
            }
        });

        $('.fixed-action-btn').floatingActionButton();

        
        var expenses = localStorage.getItem("expenses-"+d.getFullYear() +"-"+homeModel.monthNames[d.getMonth()],data);

        if(expenses){
            var data = JSON.parse(expenses);
            var totalExpense = 0;
            $.each(data,function(k,v){
                totalExpense += v.amount;
            });

            homeModel.set("totalexp","₹ "+totalExpense);

            var subdata = {
                data: data
            }
            
            var template = kendo.template($("#expenseTemplate").html());
            var result = template(subdata);
            $("#expenses").html(result);


        }
        
    });

    parent.set('afterShow', function (e) {

    });
})(app.home);
