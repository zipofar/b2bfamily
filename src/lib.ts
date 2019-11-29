

interface Task {
  element_id: number,
  element_type: number,
  task_type: number,
  text: string,
  complete_till_at: string,
  responsible_user_id: number,
  created_by: number,
  is_completed: boolean,
}

class amoCrm {
  login: string;
  password: string;
  address: string;

  constructor(login: string, password: string) {
    this.login = login;
    this.password = password;
    this.address = 'https://adminzipofarru.amocrm.ru/private/api/auth.php?type=json';
  }

  auth() {

  }

  getTasks(id: string = '') {

  }

  addTask(task: Task) {

  }
}

export default amoCrm;