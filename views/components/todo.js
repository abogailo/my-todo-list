class ToDo {
    
    constructor(_id,name, description , expected_date, completed, completed_date) {
        this.name = name;
        this.description = description;
        this.id = _id;
        this.expected_date = expected_date;
        this.completed = completed;
        this.completed_date = completed_date;
    }

    renderToDoCard(){
        const card = document.createElement('div');
        card.className = "card";
        const todo_card = document.createElement('div');
        todo_card.className = "todo_card";
        const nameElement = document.createElement("p");
        const descriptionElement = document.createElement("p");
        const dateElement = document.createElement("p");
        const card_remove = document.createElement('div');
        const para_remove = document.createElement('p');
        para_remove.className = "para-remove"
        const materialCloseicon = document.createElement('i');
        card_remove.className = "card-remove";
        materialCloseicon.className = "material-icons";
        materialCloseicon.innerHTML = "delete_outline";
        para_remove.appendChild(materialCloseicon)
        card_remove.appendChild(para_remove);
        const card_update = document.createElement('div');
        const card_complete_date = document.createElement('div');
        const todo_div = document.createElement('div');
        todo_div.className = "todo-info"
        const para_update = document.createElement('p');
        para_update.className = "para-update"
        const materialUpdateicon = document.createElement('i');
        const str = "Yay! You completed this task on " + this.completed_date + "🥳"

        if(this.completed == true){
            card_update.className = "hidden"
            card_complete_date.className = "date-completed"
            card_complete_date.innerHTML = str
        }
        else{
            card_update.className = "card-update";
        materialUpdateicon.className = "material-icons";
        materialUpdateicon.innerHTML = "check_circle_outline";
        para_update.appendChild(materialUpdateicon);

        }
        card_update.appendChild(para_update);
        
        nameElement.appendChild(document.createTextNode(this.name));

        nameElement.id = this.id;
        nameElement.className = "card-paragraph";
        todo_div.appendChild(nameElement)
        todo_div.appendChild(descriptionElement)
        todo_div.appendChild(dateElement)
        todo_card.appendChild(todo_div)
        todo_div.appendChild(card_remove)
        todo_card.appendChild(card_update)
        todo_div.appendChild(card_complete_date)
        card.appendChild(todo_card)
        document.getElementById("new-todo-container").appendChild(card);
        card.style.border = "1px solid white";

        card.onclick = function() {

            let collection = document.getElementsByClassName("checked")
            for (var j = collection.length-1; j >= 0; j--) {
                collection[j].classList.add("hidden")
            }

            let collection2 = document.getElementsByClassName("checked")
            for (var j = collection2.length-1; j >= 0; j--) {
                collection[j].classList.remove("checked")
            }
            
            let para = card.getElementsByTagName('p')[0].innerText;
            let cardCollection = document.getElementsByClassName("card")
            for (let e of cardCollection)
            {
                let currentCard = e.getElementsByTagName('p')[0].innerText;
                if (currentCard !== para){
                    e.style.border = "1px solid white";
                }
                else {
                    card.style.border = "1px solid #FBBC05";
                }
            }
                    
            let element = document.getElementById(para)
            if(element.classList.contains("hidden")){
                    element.classList.remove("hidden")
                    element.classList.value += " checked"
                }
                else{
                    element.classList.value += " hidden"
                }
            
        }
    }
    renderDescription(){
        const desc_div = document.createElement('div');
        desc_div.className = this.id + " hidden";
        desc_div.id = this.name;
        const desc_desc = document.createElement('p');
        desc_desc.className = 'description'
        desc_desc.innerHTML = this.description
        const desc_date = document.createElement('p');
        desc_date.className = 'expected_date'
        desc_date.innerHTML = "Expected date to be done: " + this.expected_date
        const desc_complete = document.createElement('p');
        desc_complete.className = 'completed'
        desc_complete.innerHTML = "Has been completed: " + this.completed
        const description = document.getElementById("description-view")
        

        desc_div.appendChild(desc_desc);
        desc_div.appendChild(desc_date);
        desc_div.appendChild(desc_complete);
        description.appendChild(desc_div);
    }
}