'use strict';
define(
    [
        'components/flight/lib/component',
        'js/ui/todo_list_controller'
    ],
    function(defineComponent, ListController){
        return defineComponent(RemoveList, ListController);

        function RemoveList(){
            this.defaultAttrs({
                load_url: 'remove'
            });

            this.removeList = function(){
                var self = this;
                $.ajax({
                    type:"GET",
                    url:this.attr.load_url,
                    data:"id="+this.$node.attr("id").replace("_remove", ""),
                    success:function(json){
                        console.log(json);
                        if(json.status === "error"){
                            console.log("remove error:" + json.body);
                        }
                        else{
                            console.log("remove success");
                            self.trigger("removeListItem", [json.body]);
                            console.log("trigger end");
                        }
                    }
                });
            }

            this.after("initialize", function(){
                //データロード
                this.on("click",this.removeList);
            });
        }
    }
);