import TodoApp from "./Components/TodoApp";
import { Provider } from "react-redux";
import AppStore from "../Utils/AppStore";
const App = () => {
  return (
    <>
      <Provider store={AppStore}>
        <TodoApp />
      </Provider>
    </>
  );
};

export default App;
