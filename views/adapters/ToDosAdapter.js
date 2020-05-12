class ToDosAdapter {
    constructor(){
        this.baseUrl =
        'https://todo-list-abagailh.herokuapp.com/todos'
        //'http://localhost:8080/todos'
    }

     async getTodos() {
        try {
             const res = await fetch(this.baseUrl);
             const out = await res.json();
             return out;
         }
         catch (err) {
             throw err;
         }
         
     }

    async removeTodo(configObject, toRemove){
        const res = await fetch(this.baseUrl + "/" + toRemove, configObject);
        return await res.json();
    }

    async updateTodo(configObject, toUpdate){
        const res = await fetch(this.baseUrl + "/" + toUpdate, configObject);
        return await res.json();
    }

}