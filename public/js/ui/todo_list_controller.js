//todo_listをコントロールする
define(
    ['js/util/dump'],
    function(dump){
        return TodoListController;
        function TodoListController(){
            this.defaultAttrs({
                list_container:''
            });

            function createListItem(item){
                return $("<div/>",{
                    id:item._id
                })
                    .append($("<div/>", {style:"font-size:x-small;"}).append(item.addDate)
                    ,$("<div/>",{
                        class:"input-append",
                        style:"border-left:15px #888 solid;cursor:move;"
                    })
                        .append($("<input/>", {
                            type:"text",
                            class:"input-xxlarge",
                            value:item.todo,
                            id:item._id+"_todo"
                        })
                        ,$("<button/>",{
                            type:"button",
                            class:"btn btn-primary",
                            "data-toggle":"button",
                            id:item._id+"_done"
                            }).append("done!")
                        ,$("<img/>",{
                            id:item._id+"_remove",
                            src:"img/trash.gif",
                            style:"margin-left:5px;cursor:pointer;"
                        }))
                    );

            }

            this.appendTodoList = function(event, data){
                var container = $(this.attr.list_container);
                for(var i = 0; i < data.length; i++){
                    var element = createListItem(data[i]);
                    container.append(element);

                    this.trigger("appendedListItem", [data[i]]);
                }
            }
            this.prependTodoList = function(event, data){
                var container = $(this.attr.list_container);
                for(var i = 0; i < data.length; i++){
                    var element = createListItem(data[i]);
                    container.prepend(element);

                    this.trigger("appendedListItem", [data[i]]);
                }
            }
            this.appendedListItem = function(event, data){
                var id = data._id;
                require(
                    [
                        'js/components/remove_list',
                        'js/components/update_list',
                        'js/components/done_list'
                    ],
                    function(remove_list, update_list, done_list){
                        console.log("attach:"+id);
                        remove_list.attachTo("#"+id+"_remove", null);
                        update_list.attachTo("#"+id+"_todo", null);
                        done_list.attachTo("#" + id + "_done", null);
                    }
                );
                this.updateListItem(null, data);

            }
            this.removeListItem = function(event, id){
                $("#"+id).remove();
            }
            this.updateListItem = function(event, data){
                //updateListItem
                if(data.status){
                    //done
                    $("#"+data._id+"_todo").attr("disabled", "disabled");
                }
                else{
                    $("#"+data._id+"_todo").removeAttr("disabled");
                }
            }
            this.after('initialize', function(){
                this.on("appendTodoList", this.appendTodoList);
                this.on("prependTodoList", this.prependTodoList);
                this.on("appendedListItem", this.appendedListItem);
                this.on("removeListItem", this.removeListItem);
                this.on("updateListItem", this.updateListItem);
            });
        }
    }
)