import Header from './header';

const Layout = ({ children }) => (
  <div className="d-flex flex-column vh-100">
    <Header />
    <main className="container-fluid h-100">
      <div className="d-flex flex-column justify-content-center align-items-center h-100">
        {children}
      </div>
    </main>
  </div>
);

export default Layout;
