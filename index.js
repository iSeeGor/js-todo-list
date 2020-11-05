let btnAdd = $$('.js-add-todo-btn');
let userName = $$('.js-user-name');
let userPhone = $$('.js-user-phone');
let userTime = $$('.js-user-time');
let todoTable = $$('.js-todo-table');

let data = [
	{name: 'Igor', phone: '33 66 87888', time: '15:01'},
	{name: 'Jora', phone: '99 00 87555', time: '11:41'},
];

if(!localStorage.getItem('todoList')){
	setTodoData(data);
}

function setTodoData(data){
	localStorage.setItem('todoList', JSON.stringify(data));
}

function getTodoData(){
	return JSON.parse(localStorage.getItem('todoList'));
}

renderTodo();

$$('.js-add-todo-form').addEventListener('submit', (e)=>{
	e.preventDefault();
	addTodoItem();
})

function deleteButtonsInit(){
	let deleteButtons = document.querySelectorAll('.js-delete-todo');

	deleteButtons.forEach((button, index) => {
		button.addEventListener('click', function(e){
			e.preventDefault();
			delateTodoItem(e.target, index);
		});
	});
	
}

function resetValues(){
	userName.value = '';
	userPhone.value = '';
	userTime.value = '';
}

function createTodoItem(name, phone, time){
	return `
		<td>${name}</td>
		<td>${phone}</td>
		<td>${time}</td>
		<td><a href="#" class="js-delete-todo">delete</a></td>
		<td>
			<div class="form-check form-check-inline">
				<input class="form-check-input" type="checkbox" value="">
			</div>
		</td>
	`
}

function addTodoItem(){
	let todoItem = createTodoItem(userName.value, userPhone.value, userTime.value);
	let tableTr = document.createElement('tr')
	let tableBody = todoTable.querySelector('tbody');
	
	tableBody.append(tableTr);
	tableBody.querySelectorAll('tr')[tableBody.querySelectorAll('tr').length-1].innerHTML = todoItem;
	let button = tableBody.lastChild.querySelector('.js-delete-todo');
	let index = tableBody.querySelectorAll('tr').length-1;
	
	button.addEventListener('click', function(e){
		e.preventDefault();
		delateTodoItem(e.target, index);
	});

	updateTodoData(userName.value, userPhone.value, userTime.value);
	resetValues();
}

function renderTodoItems(index){
	let data = getTodoData();
	let name = data[index].name,
		phone = data[index].phone,
		time = data[index].time;
	let tableTr = document.createElement('tr')
	let tableBody = todoTable.querySelector('tbody');
	let todoItem = createTodoItem(name, phone, time);
	
	tableBody.append(tableTr);
	tableBody.querySelectorAll('tr')[tableBody.querySelectorAll('tr').length-1].innerHTML = todoItem;

	
}

function delateTodoItem(target, index){
	let data = getTodoData();
	console.log(data);
	target.parentNode.parentNode.remove();
	let result = data.filter(function(e, i){
		console.log(i);
		return !i == index;
	});
	console.log(result);
	console.log(target);
	console.log(index);
	setTodoData(result);
}

function renderTodo(){
	let data = getTodoData();

	for(let i = 0; i < data.length; i++){
		renderTodoItems(i)
	}

	deleteButtonsInit();

}

function updateTodoData(name, phone, time){
	let data = getTodoData();

	data.push({
		name: name,
		phone: phone,
		time: time
	})

	setTodoData(data);
}


