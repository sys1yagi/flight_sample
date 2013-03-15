'use strict';

define(
    [
        'components/flight/lib/component',
        'js/ui/todo_list_controller',
        'js/util/dump'
    ],
    function (defineComponent, ListController, dump) {
        return defineComponent(UpdateList, ListController);

        function UpdateList() {
            this.defaultAttrs({
                load_url:'update'
            });
            this.lastData = null;
            this.update = function (id, todo) {
                var self = this;
                $.ajax({
                    type:"GET",
                    url:this.attr.load_url,
                    data:"id=" + id + "&todo=" + todo,
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
            this.updateList = function (event) {
                if ((event.which && event.which === 13) || (event.keyCode && event.keyCode === 13)) {
                    this.update(this.$node.attr("id").replace("_todo", ""), this.$node.val());
                    this.lastData = this.$node.val();
                }
            }
            this.onBlur = function (event) {
                //変更チェック
                if (this.$node.val() !== this.lastData) {
                    this.update(this.$node.attr("id").replace("_todo", ""), this.$node.val());
                }
            }
            this.after("initialize", function () {
                console.log("init update_list");
                this.lastData = this.$node.val();
                this.on('keydown', this.updateList);
                this.on('blur', this.onBlur);
            });
        }
    }
);