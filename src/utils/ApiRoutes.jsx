const  ApiRoutes = {
    USER_LOGIN : {
        path:'/users/login',
        authenticate:false
    },
    USER : {
        path : '/users',
        authenticate:true
    }
}
   
export default ApiRoutes