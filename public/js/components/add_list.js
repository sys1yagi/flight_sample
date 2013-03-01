'use strict';
//コンポーネントの定義
define(
    [
        'components/flight/lib/component',
        'js/ui/todo_list_controller',
        'js/util/dump'
    ],
    function (defineComponent, ListController, dump) {
        return defineComponent(AddListComponent, ListController);

        function AddListComponent() {
            this.defaultAttrs({
                add_url:"add",
                input_value:''
            });

            //リストへの追加処理
            this.addList = function () {
                console.log("addList");
                var self = this;
                var input = $(this.attr.input_value);
                $.ajax({
                    type:"GET",
                    url:this.attr.add_url,
                    data:"todo="+input.val(),
                    success:function (json) {
                        console.log(json);
                        if (json.status === "error") {
                            alert("error!!!" + json.body);
                        }
                        else {
                            input.val("");
                            //self.trigger("prependTodoList", [[json.body]]);
                            self.prependTodoList(null, [json.body]);
                        }
                    }});
            }

            this.before("initialize", function () {
                console.log("before initialize.");
            });
            this.after("initialize", function () {
                this.on("click", this.addList);
            });
        }
    });
