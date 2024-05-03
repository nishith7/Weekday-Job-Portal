import { Provider } from 'react-redux';
import './App.css';
import JobCard from './components/JobCard';
import SearchBarFilters from './components/SearchBarFilters';
import store from './store';


function App() {
  return (
    <>
    <Provider store={store}>
    <SearchBarFilters/>
    <JobCard/>
    </Provider>
     
    </>
  
  );
}

export default App;
