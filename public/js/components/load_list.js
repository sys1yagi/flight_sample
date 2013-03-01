'use strict';

define(
    [
        'components/flight/lib/component',
        'js/ui/todo_list_controller'
    ],
    function(defineComponent, ListController){
        return defineComponent(LoadList, ListController);

        function LoadList(){
            this.defaultAttrs({
                load_url: 'load'
            });
            this.after("initialize", function(){
                var self = this;
                //データロード
                $.ajax({
                        type:"GET",
                        url:this.attr.load_url,
                        success:function(json){
                            console.log(json);
                            if(json.status === "error"){

                            }
                            else{
                                self.trigger("appendTodoList", [json.body]);
                            }
                        }
                    });
            });
        }
    }
);