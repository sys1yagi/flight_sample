'use strict';

define(
    [
        'components/flight/lib/component',
        'js/ui/todo_list_controller',
        'js/util/dump'
    ],
    function (defineComponent, ListController, dump) {
        return defineComponent(DoneList, ListController);

        function DoneList() {
            this.defaultAttrs({
                load_url:'update'
            });
            this.done = function (event) {
                //TODO 戻す処理

                function getStatus(id){
                    var input = $("#"+id+"_todo");      //TODO もうちょいスマートに・・・
                    console.log(input.attr("disabled"));
                    return input.attr("disabled") === "disabled";
                }

                console.log("done.");
                var id = this.$node.attr("id").replace("_done", "")
                var status = getStatus(id);
                var self = this;
                $.ajax({
                    type:"GET",
                    url:this.attr.load_url,
                    data:"id=" + id + "&status="+!status,
                    success:function (json) {
                        if (json.status === "error") {
                            console.log("update error:" + json.body);
                        }
                        else {
                            self.trigger("updateListItem", [
                                json.body
                            ]);
                        }
                    }
                });
            }
            this.after("initialize", function () {
                console.log("init update_list");
                this.lastData = this.$node.val();
                this.on('click', this.done);
            });
        }
    }
);