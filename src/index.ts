import amoCrm from './lib';

const login: string = 'admin@zipofar.ru';
const password: string = '415ecf366f230269925fe0dd8dd1b6a3687c5aaa';

const start = async () => {
  try {
    const completeDate = Date.now() + (3600 * 24);
    const dateNow = new Date().toUTCString();

    const libAmo = new amoCrm(login, password);
    await libAmo.auth();
    const { userId } = libAmo;

    const newTasks = [
      {
        element_id: 8941,
        element_type: 2,
        task_type: 1,
        text: `First task ${dateNow}`,
        complete_till_at: completeDate.toString(),
        responsible_user_id: userId,
        created_by: userId,
        is_completed: false,
      },
      {
        element_id: 8941,
        element_type: 2,
        task_type: 1,
        text: `Second task ${dateNow}`,
        complete_till_at: completeDate.toString(),
        responsible_user_id: userId,
        created_by: userId,
        is_completed: false,
      },
    ];
    const items = await libAmo.addTask(newTasks);
    console.log(items)
    //const tasks = libAmo.getTasks();
  } catch (err) {
    console.log(err)
  }
};

start();