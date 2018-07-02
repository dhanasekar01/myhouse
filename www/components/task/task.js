'use strict';

app.task = kendo.observable({
    onShow: function () { },
    afterShow: function () { }
});
app.localization.registerView('task');

(function (parent) {

    var task = kendo.data.Model.define({
        fields: {
          "item": {
            type: "string"
          },
          "date": {
            type: "string"
          },
          "checked": {
            type: "boolean"
          }
        }
      });


    var taskModel = kendo.observable({
        newitem: "",
        source : [],
        nocategory:0,
        add: function(){
            var val = taskModel.newitem;
            taskModel.set('newitem','');
            if(val){
                var data = new task({
                    item: val,
                    date: new Date(),
                    checked: false
                });
                taskModel.source.push(data);

                localStorage.setItem('tasklist',JSON.stringify(taskModel.source));
            }
        },
        delete: function(e) {
            var task = e.data;
            var tasks = taskModel.source;
            var index = tasks.indexOf(task);
            tasks.splice(index, 1);
            localStorage.setItem('tasklist',JSON.stringify(taskModel.source));
        }
    });

    parent.set("onShow", function (e) {

        $("#tasknewitem").on("keyup",function(e){
            var code = e.which;
            if (code==13) {
                taskModel.add();
            }
        })
       
        if(localStorage.getItem('notcategory')){
            var notcategory = JSON.parse(localStorage.getItem('notcategory'));
            taskModel.set('nocategory',notcategory.length);
        }

        var lists = [];

        if(localStorage.getItem('tasklist')){
            lists = JSON.parse(localStorage.getItem('tasklist'))
        }

        taskModel.set('source',lists);
      
    });


    parent.set('taskModel', taskModel);

})(app.task);
