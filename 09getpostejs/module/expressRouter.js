
const url = require('url');
const ejs = require('ejs');

//暴露的模块
let server = () => {
    let G = this;

    //注册get 和 post 请求处理方法
    this.get = {};
    this.post = {};
    //404页面
    this.get.page404 = (request,response) => {

        ejs.renderFile('./views/404.ejs', {}, (err, data) => {

            response.send(data);

        });
    }
    

    let app = (request, response) => {

        //个response里添加一个send方法 
        response.send = (data) => {
            response.writeHead(200,{'ContentType':'text/html;charset=utf-8'});
            response.end(data);
        };
        
        
        let pathname = url.parse(request.url).pathname;

        //过滤无效请求
        if( pathname !== '/favicon.ico'){

            

        //判断是get还是post请求
        let method = request.method.toLowerCase() ; 

            //给传来的路由前后都加 / 
            if( !pathname.startsWith('/') ) {
    
                pathname = '/' + pathname;
    
            }
            if( !pathname.endsWith('/') ) {
    
                pathname = pathname + '/' ;
    
            }

            if( G[ method ][ pathname ] ) {

                switch(method){
                    
                    case 'post' : 
                        let result = '';
                        //获取post传来的值
                        request.on('data', (data) => {

                            result += data;

                        });

                        request.on('end', (err) => {
                            //把post传来的值存到request.body里
                            request.body = result;

                            G[ method ][ pathname ] (request, response) ;
                        }); 
                    break;

                    default :

                        G[ method ][ pathname ] (request, response) ;

                    break;

                }
    
            }else{
                G.get.page404(request,response);
            }
        }
    }   



    app.get = (string,callback) => {
        
        //在G里注册方法

        //判断传来的路由前后是否有 ‘ / ’ 如果没有就给他加上 ‘ / ’
        if( !string.endsWith('/') ) { 

            string = string + '/' ;

        }
        if( !string.startsWith('/') ) {

            string = '/' + string ;

        }

        //在 G 里注册方法，这个方法就是 调用app.get('/homgt',()=>{})方法后传进来的方法

        //往G.get 对象里注册方法
        G.get[ string ] = callback;

    };


    app.post = (string, callback) => {

        if( !string.endsWith('/') ) {

            string = string + '/' ;

        }
        if( !string.startsWith('/') ) {

            string = '/' + string ;

        }

        //往G._post里注册post方法
        G.post[string] = callback;

    };

    return app;
};

module.exports = server();