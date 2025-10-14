import Header from './components/Header';
import Footer from './components/Footer';
import UserSearch from './components/UserSearch';

function App() {
  return (
    <div className="min-h-screen bg-gray-800/95 flex flex-col">
      <Header />
      <main className="flex-1">
        <UserSearch />
      </main>
      <Footer />
    </div>
  );
}

export default App;
