import axios from "axios";
import { cookiesParse } from "./utils";

interface Task {
  element_id: number;
  element_type: number;
  task_type: number;
  text: string;
  complete_till_at: string;
  responsible_user_id: number;
  created_by: number;
  is_completed: boolean;
}

class AmoCrm {
  fqdn: string;
  login: string;
  password: string;
  userId: number;
  cookies = "";

  constructor(login: string, password: string, subdomain: string) {
    this.login = login;
    this.password = password;
    this.fqdn = `https://${subdomain}.amocrm.ru`;
  }

  async auth() {
    const url = `${this.fqdn}/private/api/auth.php?type=json`;
    const res = await axios.post(url, {
      USER_LOGIN: this.login,
      USER_HASH: this.password,
    });
    this.cookies = cookiesParse(res.headers["set-cookie"]).join("; ");
    this.userId = res.data.response.user.id;
  }

  async getTasks(filters: object) {
    if (this.cookies === "") {
      await this.auth();
    }
    const res = await axios({
      method: "GET",
      url: `${this.fqdn}/api/v2/tasks`,
      params: { ...filters },
      headers: {
        cookie: this.cookies,
      } 
    });
    return res.data._embedded.items;
  }

  async addTask(tasks: Task[]) {
    if (this.cookies === "") {
      await this.auth();
    }
    const res = await axios({
      method: "POST",
      url: `${this.fqdn}/api/v2/tasks`,
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

export default AmoCrm;