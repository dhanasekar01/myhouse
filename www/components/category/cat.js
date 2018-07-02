'use strict';

app.cat = kendo.observable({
    onShow: function () { },
    afterShow: function () { }
});
app.localization.registerView('cat');

(function (parent) {
    var
        catModel = kendo.observable({
            source: [],
            selectedCategory: "",
            onlyCategory:[],
            update: function(e){
                var category = catModel.selectedCategory;
                
                if(catModel.newcategory){
                    category = catModel.newcategory;
                    catModel.onlyCategory.push({"text":category});
                    localStorage.setItem('category',JSON.stringify(catModel.onlyCategory));
                }
                
                var categorylist = [];

                if(localStorage.getItem('category')){
                    categorylist = JSON.parse(localStorage.getItem('category'));
                }

                var notcatlist = document.getElementsByName("notcat");
                
                for(var i = 0 ;i < notcatlist.length;i++){
                    if(notcatlist[i].checked){
                        categorylist.push({"name" : notcatlist[i].value, "cat":category });
                        var selectedvalue = { "item": notcatlist[i].value };
                        var sources = catModel.source;
                        var index = sources.indexOf(selectedvalue);
                        sources.splice(index, 1);
                        localStorage.setItem('notcategory',JSON.stringify(catModel.source));
                    }
                }

                localStorage.setItem('category',JSON.stringify(categorylist));
            }
        });

    parent.set('catModel', catModel);

    parent.set('onShow', function (e) {
        if(localStorage.getItem('notcategory')){
            var notcategory = JSON.parse(localStorage.getItem('notcategory'));
            catModel.set('source',notcategory);
        }

        catModel.set('onlyCategory',JSON.parse(localStorage.getItem('onlyCategory')));
        $("#categorylist").kendoDropDownList({
            dataSource: catModel.onlyCategory,
            dataTextField: "text",
            dataValueField: "text"
        });
    });

    parent.set('afterShow', function (e) {

    });
})(app.cat);
