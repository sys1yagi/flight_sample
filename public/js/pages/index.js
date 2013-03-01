'use strict';
/** 依存のある部分 */
define(
    [
        "js/components/add_list"
        ,"js/components/load_list"
    ],
    function(add_list, load_list){
        function initialize(){
            add_list.attachTo("#add_list", {
                input_value: '#todo',
                list_container: '#list'
            });
            load_list.attachTo("#list", {list_container: '#list'});
        }
        return initialize;
    }
);