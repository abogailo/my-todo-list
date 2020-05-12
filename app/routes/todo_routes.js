module.exports = function(app,db){
    app.post('/todos', (req, res) => {
        const todo = { text: req.body.body, title: req.body.title}
        db.collection('todo').insert(todo, (err, result) => {
                if(err){
                    res.send({'error': 'An error has occured'})
                } else{
                    res.send(result.ops[0])
                }
        })
    })
}