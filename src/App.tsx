import OfiRecaudPage from "./Pages/OfiRecaudPage";
import { Counter } from "./features/counter/Counter";
import { store } from "./redux/store/store";
import { Provider } from "react-redux";

const App = () => {
	return (
		<Provider store={store}>
			<OfiRecaudPage />
      <br className="mt-10"/>
      <Counter />
		</Provider>
	);
};

export default App;
