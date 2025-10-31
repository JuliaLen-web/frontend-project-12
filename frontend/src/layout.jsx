const Layout = ({children}) => {
  return (
    <div className="container-fluid vh-100">
      <div className="d-flex justify-content-center align-items-center h-100">
        {children}
      </div>
    </div>
  )
}

export default Layout
