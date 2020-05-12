const todoRoutes = require('./todo_routes')

module.exports = function(app, db){
    todoRoutes(app,db)
}