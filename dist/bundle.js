(()=>{const t=()=>"_"+Math.random().toString(36).substr(2,9),e=(()=>{let e=("projects",JSON.parse(localStorage.getItem("projects"))||[]);const o=()=>{return t=e,localStorage.setItem("projects",JSON.stringify(t));var t};return{addProject:n=>{const d=(e=>({id:t(),name:e,todos:[]}))(n);e.push(d),o()},addTodoToProject:(n,{name:d,priority:r,date:c,details:s,checked:a})=>{const i=e.find((t=>t.id===n));if(i){const e=((e,o,n,d,r=!1)=>({id:t(),name:e,priority:o,date:n,details:d,checked:r}))(d,r,c,s,a);i.todos.push(e),o()}},getProjects:()=>e}})(),o=()=>{const t=e.getProjects(),o=document.getElementById("projects-container");o.innerHTML="",t.forEach((t=>{const e=document.createElement("div");e.textContent=t.name,o.appendChild(e)}))},n=()=>{o()};document.addEventListener("DOMContentLoaded",n)})();