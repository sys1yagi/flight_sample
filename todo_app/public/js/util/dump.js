//ダンプ用
define(
    [],
    function(){
        return dump;
        function dump(obj, prefix){
            if(prefix === undefined){
                prefix = " ";
            }
            for(var o in obj){
                if(typeof o === 'object'){
                    dump(o, prefix+prefix);
                }
                else{
                    console.log(prefix+o+"="+obj[o]);
                }
            }
        }
    }
);