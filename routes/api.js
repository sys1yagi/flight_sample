
var todoModel = require("../model/todo_model");

/**
 * 返却するJSONの為のヘッダを出力する
 * @param res
 */
function writeJsonHeader(res){
    res.writeHead(200, {'Content-Type':'text/json; charset=utf-8'});
}
/**
 * JSON形式のデータを生成する
 * @param status
 * @param body
 * @return {*}
 */
function makeResponseBody(status, body){
    return JSON.stringify({status:status, body:body});
}

/**
 * 認証トークンの検証
 * @param req
 * @param res
 * @return {Boolean}
 */
function validateToken(req, res){

    return true;
}


//追加
exports.add_todo = function (req, res) {
    if(!validateToken(req, res)){
        return;
    }
    //TODO parentの考慮

    var todo = req.query["todo"] || "";

    console.log("add_todo!");
    //init json
    var record = todoModel.createModel(
        todo,
        new Date(),
        false,
        0,
        null,
        []
    );
    //TODO set order
    record.order = 0;

    //add todo
    todoModel.Todo.create(record, function(err, small){
        //console.log(small);
        if(err){
            res.write(makeResponseBody("error", "add error."));
        }
        else{
            res.write(makeResponseBody("success", small));
        }
        res.end();
    });
    writeJsonHeader(res);
}
/**
 * Todoリストを読み込む
 * @param req
 * @param res
 */
exports.load_todo_list = function (req, res) {
    if(!validateToken(req, res)){
        return;
    }
    //TODO user_idを導入する
    console.log("load_todo_list!");

    todoModel.Todo.find().sort({addDate:"desc"}).exec(function (err, docs) {
        console.log("load_todo_list loaded!");
        if(err){
            res.write(makeResponseBody("error", "load error!"+err));
        }
        else{
            res.write(makeResponseBody("success", docs));
        }
        res.end();
    });
    writeJsonHeader(res);
}
/**
 * 更新
 * @param req
 * @param res
 */
exports.update_todo = function (req, res) {
    if(!validateToken(req, res)){
        return;
    }
    writeJsonHeader(res);
    console.log("update_todo!");
    var id = req.query['id'];
    if(id === undefined){
        res.write(makeResponseBody("error", "id is undefined"));
        res.end();
        return;
    }
    todoModel.Todo.findOne({"_id":id}, function(err, todo){
        //console.log("findOne:" + err + " " + todo);
        if(err){
            res.write(makeResponseBody("error", "update failed! invalid id " + err));
            res.end();
        }
        else{
            var param_todo = req.query['todo'];
            var param_tags = req.query['tags'];
            var param_status = req.query['status'] === "true";
            var param_parent = req.query['parent'];
            var param_order = req.query['order'];
            if(param_todo !== undefined){
                this.todo = param_todo;
            }
            todo.tags = param_tags === undefined ? [] : param_tags.split(",");
            if(param_status !== undefined && param_status !== ""){
                todo.status =  param_status;
            }
            todo.parent = param_parent;
            if(param_order !== undefined && param_order !== ""){
                this.order = param_order;
            }

            todo.save(function(update_err, updated){
                if(update_err){
                    res.write(makeResponseBody("error", update_err));
                }
                else{
                    res.write(makeResponseBody("success", updated));
                }
                res.end();
            });
        }
    });
}
/**
 * 削除
 * @param req
 * @param res
 */
exports.remove_todo = function (req, res) {
    console.log("delete_todo!");
    if(!validateToken(req, res)){
        return;
    }
    var id = req.query['id'];
    if(id === undefined){
        res.write(makeResponseBody("error", "id is undefined"));
        res.end();
        return;
    }
    todoModel.Todo.remove({"_id":id}, function(err){
        if(err){
            res.write(makeResponseBody("error", err));
        }
        else{
            res.write(makeResponseBody("success", id));
        }
        res.end();
    });

    writeJsonHeader(res);
}
/**
 * オーダー変更
 * @param req
 * @param res
 */
exports.move_to = function (req, res) {
    if(!validateToken(req, res)){
        return;
    }
    console.log("move_to!");
    writeJsonHeader(res);



    res.end();
}