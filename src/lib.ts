import axios from 'axios';
import { cookiesParse } from './utils';

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
  url: string;
  userId: number;
  cookies: string = '';

  constructor(login: string, password: string) {
    this.login = login;
    this.password = password;
    this.url = 'https://adminzipofarru.amocrm.ru/private/api/auth.php?type=json';
  }

  async auth() {
    const res = await axios.post(this.url, {
      USER_LOGIN: this.login,
      USER_HASH: this.password,
    });
    this.cookies = cookiesParse(res.headers['set-cookie']).join('; ');
    this.userId = res.data.response.user.id;
  }

  getTasks(id: string = '') {

  }

  async addTask(tasks: Task[]) {
    if (this.cookies === '') {
      await this.auth();
    }
    const res = await axios({
      method: 'POST',
      url: 'https://adminzipofarru.amocrm.ru/api/v2/tasks',
      data: {
        add: tasks
      },
      headers: {
        cookie: this.cookies,
      } 
    });
    return res.data._embedded.items;
  }
}

export default amoCrm;