import Header from './components/Header';
import Footer from './components/Footer';
import UserSearchDashboard from './components/User/UserSearchDashboard';

function App() {
  return (
    <div className="min-h-screen bg-gray-800/95 flex flex-col">
      <Header />
      <main className="flex-1">
        <UserSearchDashboard />
      </main>
      <Footer />
    </div>
  );
}

export default App;
