import logo from './assets/tb.png';
import InventoryInput from './components/InventoryInput';
import styles from './App.module.scss';

function App() {
  return (
    <div className={styles.App}>
      <header className={styles.appHeader}>
        <img src={logo} className={styles.appLogo} alt="logo" />
        Top Beauty Admin Page
      </header>
      <InventoryInput />
    </div>
  );
}

export default App;
