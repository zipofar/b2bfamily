import amoCrm from './lib';

const login: string = 'admin@zipofar.ru';
const password: string = '415ecf366f230269925fe0dd8dd1b6a3687c5aaa';
const completeDate = Date.now() + (3600 * 24);
const newTask = {
  add: [{
    element_id: "8941",
    element_type: "2",
    task_type: "1",
    text: "First task",
    complete_till_at: completeDate.toString(),
    responsible_user_id: "3986335",
    created_by: "3986335",
    is_completed: "false",
  }]
};

const libAmo = new amoCrm(login, password);
const { href, id: idNewTask } = libAmo.addTask(newTask);
const tasks = libAmo.getTasks();