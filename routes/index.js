const Seneca = require('seneca');
const seneca = Seneca();

//服务中心 服务注册上
seneca.add('roll:math,cmd:sum',(msg,reply) => {
    reply(null,{answer:(msg.left + msg.right)})
});

const homePromise = () => {
    return new Promise(function(resolve,reject){
        seneca.act({role:'math',cmd:'sum',left:1,right:2},function(err,result){
            console.log('得到的值',err);
            if(err){
                resolve('Hello seneca')
            }else{
                resolve(result)
            }
        })
    });
}
const senecaPromise = () => {
    return new Promise(function(resolve,reject){
        seneca.act({role:'math',cmd:'sum',left:1,right:2},function(err,result){
            console.log('得到的值',err);
            if(err){
                resolve({data:'11'})
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