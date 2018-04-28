import { User } from './model/index';

const appDiv: HTMLElement = document.getElementById('app');
appDiv.innerHTML = `<h1>Waiting for result...</h1>`;

class UserService {
  private USER_API_URL = 'https://api.myjson.com/bins/te31j';
  getUser(id: number): Promise<User> {
    return fetch(this.USER_API_URL)
      .then((response: Response) => response.json());
  }
}

class Component {
  user: User;
  constructor(private userService: UserService) { }
  async onInit(): Promise<void> {
    this.user = await this.userService.getUser(1);
  }
}

const component = new Component(new UserService);

component.onInit()
 .then(() => appDiv.innerHTML = 'User name is: ' + component.user.name);
