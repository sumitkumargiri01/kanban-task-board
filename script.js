let tasksdata ={

}

const todo=document.querySelector('#todo');
const progress=document.querySelector('#progress');
const done = document.querySelector('#done');
const columns = [todo ,progress ,done ];

let dragElement =null;


function addTask(title,desc,column){
    const div =document.createElement("div");

    div.classList.add("task")
    div.setAttribute("draggable","true")

    div.innerHTML=`
                    <h2>${title} </h2>
                        
                    <p>${desc}</p>
                        
                    <button>Delete</button>
    `
    column.appendChild(div);

    div.addEventListener("dragstart" ,(e)=>{
        dragElement=div;
    })

    const deleteButton = div.querySelector("button");

    deleteButton.addEventListener("click",()=>{
    div.remove();
    updateTaskCount();
    })
    return div;

}


function updateTaskCount(){
    columns.forEach(col =>{
            const task =col.querySelectorAll(".task");
            const count =col.querySelector(".right");

           tasksdata[col.id] = Array.from(task).map(t =>{
            return{
                title:t.querySelector("h2").innerHTML,
                desc :t.querySelector("p").innerHTML
            }
           })

           localStorage.setItem("tasks" ,JSON.stringify(tasksdata));
           //console.log(tasksdata);

            count.innerHTML =task.length;
        })


}

if (localStorage.getItem("tasks")){

    const data = JSON.parse(localStorage.getItem("tasks"));

    for(const col in data){
       // console.log(col ,data[col]);
       const column = document.querySelector(`#${col}`);
       data[col].forEach(task =>{
        addTask(task.title,task.desc,column);
       })
    }
}
updateTaskCount();

console.log(todo ,progress ,done);


const tasks =document.querySelectorAll('.task');

tasks.forEach(task => {
    task.addEventListener("drag",(e)=> {
        console.log("dragging",e);
        dragElement=task;

    })
    
})

function addDrageEventOnColumn(column){
    column.addEventListener("dragenter",(e)=>{
        e.preventDefault();
        column.classList.add("hover-over");
    })
    column.addEventListener("dragleave",(e)=>{
       e.preventDefault();
        column.classList.remove("hover-over");
    })
    column.addEventListener("dragover",(e)=>{
        e.preventDefault();

    })
    column.addEventListener("drop",(e)=>{
        e.preventDefault();

        column.appendChild(dragElement);
        column.classList.remove("hover-over");

        updateTaskCount();


    })


}
addDrageEventOnColumn(todo);
addDrageEventOnColumn(progress);
addDrageEventOnColumn(done);

// modal 
const togglemodalbutton=document.querySelector("#toggle-modal");
const modal=document.querySelector(".modal");

const modalbg =document.querySelector(".modal .bg");
const addTaskbutton=document.querySelector("#add-new-task");

togglemodalbutton.addEventListener("click",()=>{
    modal.classList.toggle("active");
    // classlist me new classlist add ke liye
    // toggle is available then remove and not then add
})

modalbg.addEventListener("click" ,()=>{
    modal.classList.remove("active");
})

addTaskbutton.addEventListener("click",(e)=>{
    e.preventDefault();
    const tasktitle =document.querySelector("#task-title-input").value;
    const taskdesc =document.querySelector("#task-desc-input").value;

        addTask(tasktitle,taskdesc,todo);

        updateTaskCount();
   
    modal.classList.remove("active");

    document.querySelector("#task-title-input").value;
    document.querySelector("#task-desc-input").value;


})