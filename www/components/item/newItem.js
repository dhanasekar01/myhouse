'use strict';

app.newItem = kendo.observable({
    onShow: function () { },
    afterShow: function () { }
});
app.localization.registerView('newItem');

(function (parent) {
    var
        newItemModel = kendo.observable({
            username: "",
            category:"",
            amount:"",
            password: "",
            type:"",
            expensedate:"",
            item:"",
            description:"",
            nocategory:0,
            addNewItem: function () {
                app.mobileApp.navigate("components/item/newitem.html");
            },saveInlocalnoid : function(label,newdata){
                var data = [];
                if (localStorage.getItem(label) != undefined && localStorage.getItem(label) != null) {
                    data = $.parseJSON(localStorage.getItem(label))
                }
                data.push(newdata);
                localStorage.setItem(label,JSON.stringify(data));
            },
            saveInlocal : function(label,newdata){
                var data = [];
                if (localStorage.getItem(label) != undefined && localStorage.getItem(label) != null) {
                    data = $.parseJSON(localStorage.getItem(label))
                }
                newdata["id"]= data.length+1;
                data.push(newdata);
                localStorage.setItem(label,JSON.stringify(data));
            },
            saveLastdata : function(label, newdata){
                localStorage.setItem(label,JSON.stringify(newdata));
            },
            clearModel: function(){
                newItemModel.set("category","");
                newItemModel.set("amount","");
                newItemModel.set("type","");
                newItemModel.set("expensedate","");
                newItemModel.set("item","");
            },
            add: function () {
                if(newItemModel.item && newItemModel.amount){

                    if(!newItemModel.category){
                        newItemModel.saveInlocalnoid("notcategory",newItemModel.item)
                    }

                    var date =newItemModel.expensedate;
                    if(!newItemModel.expensedate){
                        date = new Date();
                    }

                    
                    var data = {
                        item:newItemModel.item,
                        amount:newItemModel.amount,
                        type:newItemModel.type,
                        date:date,
                        desc:newItemModel.description,
                        category:newItemModel.category
                    }


                    newItemModel.saveLastdata("expense",data);
                    newItemModel.saveInlocal("expenses",data);

                    var monthNames = ["January", "February", "March", "April", "May", "June",
                    "July", "August", "September", "October", "November", "December"
                ];
                    var d = new Date();

                    newItemModel.saveInlocal("expenses-"+d.getFullYear() +"-"+monthNames[d.getMonth()],data);

                    newItemModel.clearModel();
                    app.showNotification("Expense Added");
                } else{
                    app.showNotification("Please fill item and amount");
                }
            }
        });

    parent.set('newItemModel', newItemModel);

    parent.set('onShow', function (e) {
        if(localStorage.getItem('notcategory')){
            var notcategory = JSON.parse(localStorage.getItem('notcategory'));
            newItemModel.set('nocategory',notcategory.length);
        }

        $("#mode").kendoDropDownList();

        $("#amount").kendoNumericTextBox({
            format: "₹​ #.00"
        });

        $("#expensedate").kendoDatePicker();

        $('.fixed-action-btn').floatingActionButton({
            direction: "left"
        });

        var categoryItem = [
            { name: "Lunch", cat: "Food" },
            { name: "Dinner", cat: "Food" },
            { name: "Breakfast", cat: "Food" },
            { name: "Milk", cat: "Food" },
            { name: "Vegetable", cat: "Vegetable" },
            { name: "Rent", cat: "Rent" },
            { name: "Maintenance", cat: "Rent" },
            { name: "Electricity", cat: "Bills" },
            { name: "Internet", cat: "Bills" },
            { name: "Cable", cat: "Bills" },
            { name: "Medical", cat: "Bills" },
            { name: "Amazon", cat: "Shopping" },
            { name: "Flipkart", cat: "Shopping" },
            { name: "AliExpress", cat: "Shopping" },
            { name: "Bus", cat: "Travel" },
            { name: "Ola", cat: "Travel" },
            { name: "Uber", cat: "Travel" },
            { name: "Fuel", cat: "Travel" },
            { name: "Petrol", cat: "Travel" },
            { name: "Cylinder", cat: "Food" },
            { name: "Grocery", cat: "House" },
            { name: "Snacks", cat: "Food" },
            { name: "Construction", cat: "Construction" },
            { name: "Loan EMI", cat: "EMI" }
        ];

        if (localStorage.getItem("category") != undefined && localStorage.getItem("category") != null) {
            categoryItem = $.parseJSON(localStorage.getItem("category"))
        }else {
            localStorage.setItem("category", JSON.stringify(categoryItem));
        }

        $("#category").kendoAutoComplete({
            dataTextField: "name",
            height: 400,
            dataSource: {
                type: "json",
                data: categoryItem,
                group: { field: "cat" }
            },
            select: function(e){
                var dataItem = this.dataItem(e.item.index());
                if(dataItem.cat){
                    newItemModel.set("category",dataItem.cat);
                } 
            }
        });
    });

    parent.set('afterShow', function (e) {

    });
})(app.newItem);
