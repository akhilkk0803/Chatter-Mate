import { Button } from "@chakra-ui/react";
import { createBrowserRouter, RouterProvider } from "react-router-dom";
import Home from "./components/Home";
import ChatPage from "./components/ChatPage";
import { UserProvider } from "./usercontext";
import bg from "../images/bg.avif";
import EditProfile from "./components/authentication/EditProfile";
export const router = createBrowserRouter([
  {
    path: "/",
    element: <Home />,
  },
  {
    path: "/chats",
    element: <ChatPage />,
  },
  {
    path:'/edit',
    element:<EditProfile/>
  },
]);
function App() {
  return (
    <div>
      <UserProvider>
        <div
          className={`bg-slate-900
         min-h-screen bg-center bg-cover   `}
        >
          <RouterProvider router={router}></RouterProvider>
        </div>
      </UserProvider>
    </div>
  );
}

export default App;
