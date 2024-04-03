const  ApiRoutes = {
    USER_LOGIN : {
        path:'/users/login',
        authenticate:false
    },
    USER : {
        path : '/users',
        authenticate:false
    }
}
   
export default ApiRoutes