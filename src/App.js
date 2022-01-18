import logo from './assets/tb.png';
import AddItem from './pages/AddItem';
import UpdateItem from './pages/UpdateItem';
import styles from './App.module.scss';

function App() {
  return (
    <div className={styles.App}>
      <header className={styles.appHeader}>
        <img src={logo} className={styles.appLogo} alt="logo" />
        Top Beauty Admin Page
      </header>
      {/* <AddItem /> */}
      <UpdateItem />
    </div>
  );
}

export default App;
