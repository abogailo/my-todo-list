class ToDos {
        constructor() {
          this.todos = [];
          this.adapter = new ToDosAdapter();
          this.todoContainer = document.getElementById('todos-container');
          this.todoDescriptionContainer = document.getElementById('description-view');
          //set it to a random div just to load all the descriptions, they are all hidden at this point
          this.removeCard = document.getElementById('card-wrapper');
          this.updateCard = document.getElementById('card-wrapper');
          this.bindingsAndEventListeners();
          this.fetchAndLoadTodos();
        }
  
        bindingsAndEventListeners(){
          this.removeCard.addEventListener('click', function (e) {
            if (this.elementMatch(e.target, '.card-remove, .card-remove i')) {
              this.removeItem(e);
            }
          }.bind(this));
          this.updateCard.addEventListener('click', function (e) {
            if (this.elementMatch(e.target, '.card-update, .card-update i')) {
              this.updateItem(e);
            }
          }.bind(this));
        }
  
        elementMatch(element, selector){
          var p = Element.prototype;
          return (p.matches || p.matchesSelector || p.webkitMatchesSelector || p.mozMatchesSelector || p.msMatchesSelector || p.oMatchesSelector).call(element, selector);
        }
  
        removeItem(e){
         const elementsParent = e.target.parentNode;
         const parentParent = elementsParent.parentNode;
         const parentParentParent = parentParent.parentNode;
         const para2 = parentParentParent.getElementsByClassName('card-paragraph')[0];
         (para2.id)
         const toRemove = para2.id;
         const cardToRemove = parentParent.parentNode;
  
         cardToRemove.parentNode.removeChild(cardToRemove); //gets the cards parent to remove the child evidently deleting the card
         this.removeData(toRemove);
        }

        updateItem(e){
            const elementsParent = e.target.parentNode;
            const parentParent = elementsParent.parentNode;
            const parentParentParent = parentParent.parentNode;
            const para2 = parentParentParent.getElementsByClassName('card-paragraph')[0];
            const toUpdate = para2.id;
            this.patchData(toUpdate);
           }
  
        hideContainer(){
            var childNodes = document.getElementById('new-todo-container').childNodes;
            for(var i=childNodes.length-1;i >= 0;i--){ //go backward through the nodes 
                var childNode = childNodes[i];
                    childNode.parentNode.removeChild(childNode);
            }
        }

        hideDescriptions(){
          var childNodes = document.getElementById('description-view').childNodes;
          for(var i=childNodes.length-1;i >= 0;i--){ //go backward through the nodes 
              var childNode = childNodes[i];
                  childNode.parentNode.removeChild(childNode);
          }
        }
    
        fetchAndLoadTodos(){
          this.todos.length = 0; //clears the object that was previously created
          this.adapter
          .getTodos()
          .then(todos => this.listTodos(todos))
          .then(() => {
              this.renderDescription()
              })
          .then(() => {
            this.createCard();
          })
        }

        listTodos(todos){
          for (let todo of todos){
            this.todos.push(new ToDo(todo._id, todo.name, todo.description, todo.expected_date, todo.completed, todo.completed_date))
          }
        }
  
        removeData(toRemove){
          const configObject = {
            method: "DELETE",
            headers: {
              "Content-Type": "application/json",
              "Accept": "application/json"
            },
            body: JSON.stringify({
             "_id": toRemove
            })
          };
          this.adapter.removeTodo(configObject, toRemove);
          this.hideContainer();
          this.hideDescriptions();
          this.fetchAndLoadTodos();
        }

        patchData(toUpdate){
            const configObject = {
              method: "PATCH",
              headers: {
                "Content-Type": "application/json",
                "Accept": "application/json"
              },
              body: JSON.stringify({
               "_id": toUpdate
              })
            };
            this.adapter.updateTodo(configObject, toUpdate);
            this.hideContainer();
            this.hideDescriptions();
            this.fetchAndLoadTodos();
          }
  
        createCard() {
          this.todos.map(todo => todo.renderToDoCard()).join('');
        }

        renderDescription(){
            this.todos.map(todo => todo.renderDescription())
        }
      }
    