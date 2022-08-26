import { Route, Routes } from "react-router-dom";
import { AuthProvider } from "./contexts/auth-context";

import CategoryAddNew from "module/category/CategoryAddNew";
import CategoryManage from "module/category/CategoryManage";
import HomePage from "pages/HomePage";
import SignInPage from "pages/SignInPage";
import SignUpPage from "./pages/SignUpPage";
import PageNotFound from "pages/PageNotFound";
import UserAddNew from "module/user/UserAddNew";
import UserProfile from "module/user/UserProfile";
import UserManage from "module/user/UserManage";
import PostAddNew from "module/post/PostAddNew";
import PostManage from "module/post/PostManage";
import DashboardPage from "pages/DashboardPage";
import { DashboardLayout } from "module/dashboard";
import PostDetailsPage from "pages/PostDetailsPage";

function App() {
  return (
    <div>
      <AuthProvider>
        <Routes>
          <Route path="/" element={<HomePage></HomePage>}></Route>
          <Route path="/sign-in" element={<SignInPage></SignInPage>}></Route>
          <Route path="/sign-up" element={<SignUpPage></SignUpPage>}></Route>
          <Route path="*" element={<PageNotFound></PageNotFound>}></Route>

          <Route
            path="/:slug"
            element={<PostDetailsPage></PostDetailsPage>}
          ></Route>
          <Route element={<DashboardLayout></DashboardLayout>}>
            <Route
              path="/dashboard"
              element={<DashboardPage></DashboardPage>}
            ></Route>
            <Route
              path="/manage/posts"
              element={<PostManage></PostManage>}
            ></Route>
            <Route
              path="/manage/add-post"
              element={<PostAddNew></PostAddNew>}
            ></Route>
            <Route
              path="/manage/category"
              element={<CategoryManage></CategoryManage>}
            ></Route>
            <Route
              path="/manage/add-category"
              element={<CategoryAddNew></CategoryAddNew>}
            ></Route>
            <Route
              path="/manage/user"
              element={<UserManage></UserManage>}
            ></Route>
            <Route
              path="/manage/add-user"
              element={<UserAddNew></UserAddNew>}
            ></Route>
            <Route
              path="/profile"
              element={<UserProfile></UserProfile>}
            ></Route>
          </Route>
        </Routes>
      </AuthProvider>
    </div>
  );
}

export default App;
