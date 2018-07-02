'use strict';

app.cat = kendo.observable({
    onShow: function () { },
    afterShow: function () { }
});
app.localization.registerView('cat');

(function (parent) {
    var
        catModel = kendo.observable({
            username: "",
            password: "",
            addNewItem: function () {
                app.mobileApp.navigate("components/item/newitem.html");
            },
            signin: function () {
               
            }
        });

    parent.set('catModel', catModel);

    parent.set('onShow', function (e) {
        var data = [
            {text : "Food"},
            {text : "House"},
            {text : "Vegetable"},
            {text : "Bills"},
            {text : "Construction"},
            {text : "EMI"},
            {text : "Travel"},
            {text : "Shopping"},
            {text : "Rent"}
        ];

        $("#categorylist").kendoDropDownList({
            dataTextField: "text",
            dataValueField: "text",
            valueTemplate: '<span class="selected-value" style="background-image: url(\'components/home/nocat.png\')"></span><span>Unknown Category</span>',
            template: '<span class="k-state-default" style="background-image: url(\'components/home/#:data.text#.png\')">#:data.text#</span>',
            dataSource: data,
            height: 200
        });

        var dropdownlist = $("#categorylist").data("kendoDropDownList");
    });

    parent.set('afterShow', function (e) {

    });
})(app.cat);
