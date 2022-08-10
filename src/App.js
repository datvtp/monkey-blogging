import { Route, Routes } from "react-router-dom";
import { AuthProvider } from "./contexts/auth-context";

import HomePage from "pages/HomePage";
import SignInPage from "pages/SignInPage";
import SignUpPage from "./pages/SignUpPage";
import NotFoundPage from "pages/NotFoundPage";
import PostManage from "module/post/PostManage";
import PostAddNew from "module/post/PostAddNew";

function App() {
  return (
    <div>
      <AuthProvider>
        <Routes>
          <Route path="/" element={<HomePage></HomePage>}></Route>
          <Route path="/sign-in" element={<SignInPage></SignInPage>}></Route>
          <Route path="/sign-up" element={<SignUpPage></SignUpPage>}></Route>
          <Route path="*" element={<NotFoundPage></NotFoundPage>}></Route>
          <Route
            path="/manage/post"
            element={<PostManage></PostManage>}
          ></Route>
          <Route
            path="/manage/add-post"
            element={<PostAddNew></PostAddNew>}
          ></Route>
        </Routes>
      </AuthProvider>
    </div>
  );
}

export default App;
