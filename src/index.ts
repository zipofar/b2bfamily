import amoCrm from "./lib";

const login = "admin@zipofar.ru";
const password = "415ecf366f230269925fe0dd8dd1b6a3687c5aaa";
const subdomain = "adminzipofarru";

const start = async () => {
  try {
    const completeDate = Date.now() + (3600 * 24);
    const dateNow = new Date().toUTCString();

    const libAmo = new amoCrm(login, password, subdomain);
    await libAmo.auth();
    const { userId } = libAmo;

    const newTasks = [
      {
        "element_id": 8941,
        "element_type": 2,
        "task_type": 1,
        text: `First task ${dateNow}`,
        "complete_till_at": completeDate.toString(),
        "responsible_user_id": userId,
        "created_by": userId,
        "is_completed": false,
      },
      {
        "element_id": 8941,
        "element_type": 2,
        "task_type": 1,
        text: `Second task ${dateNow}`,
        "complete_till_at": completeDate.toString(),
        "responsible_user_id": userId,
        "created_by": userId,
        "is_completed": false,
      },
    ];
    const resOfAdding = await libAmo.addTask(newTasks);
    console.log(resOfAdding);
    const selectedTasks = await libAmo.getTasks({ "limit_rows": 2 });
    console.log(selectedTasks);
  } catch (err) {
    console.log(err);
  }
};

start();