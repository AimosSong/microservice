const Seneca = require('seneca');
const seneca = Seneca();

//服务中心 服务注册上
seneca.add({role: 'math', cmd: 'sum'}, function (msg, respond) {
    var sum = msg.left + msg.right
    respond(null, {answer: sum})
})

const homePromise = () => {
    return new Promise(function(resolve,reject){
        seneca.act({role: 'math', cmd: 'sum', left: 1, right: 2}, function (err, result) {
            console.log('错误的值',err);
            if(err){
                reject(err)
            }else{
                resolve(result)
            }
        })
    });
}
const senecaPromise = () => {
    return new Promise(function(resolve,reject){
        seneca.act({role:'math',cmd:'sum',left:2,right:3},function(err,result){
            console.log('错误的值',err);
            if(err){
                reject(err)
            }else{
                resolve(result)
            }
        })
    });
}

const Routes = [
    {
        method: 'GET',
        path: '/',
        handler: function(request, h) {
            return homePromise();
        }
    },{
        method: 'GET',
        path: '/hello',
        handler: function(request, h) {
            return senecaPromise();
        }
    }
]

module.exports = Routes;