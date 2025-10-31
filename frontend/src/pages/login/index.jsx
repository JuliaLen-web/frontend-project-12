import {useFormik} from "formik";
import Layout from "../../layout";

const LoginPage = () => {
  const formik = useFormik({
    initialValues: {
      username: null,
      password: null
    },
    onSubmit: values => {
      console.log(values)
    },
  })

  return (
    <Layout>
      <div className="card py-3 px-4">
        <form onSubmit={formik.handleSubmit} className="d-flex flex-column gap-3">
          <div>
            <label htmlFor="username" className="form-label">Username</label>
            <input
              id="username"
              name="username"
              type="text"
              onChange={formik.handleChange}
              value={formik.values.username}
              placeholder="Username"
              className="form-control"
            />
          </div>

          <div>
            <label htmlFor="password">Password</label>
            <input
              id="password"
              name="password"
              type="password"
              onChange={formik.handleChange}
              value={formik.values.password}
              placeholder="Password"
              className="form-control"
            />
          </div>

          <button type="submit" className="btn btn-primary">Submit</button>
        </form>
      </div>
    </Layout>
  )
}

export default LoginPage
