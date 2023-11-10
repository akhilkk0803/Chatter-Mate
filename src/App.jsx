import { Button } from "@chakra-ui/react";
import { createBrowserRouter, RouterProvider } from "react-router-dom";
import Home from "./components/Home";
import ChatPage from "./components/ChatPage";
import { UserProvider } from "./usercontext";
export const router = createBrowserRouter([
  {
    path: "/",
    element: <Home />,
  },
  {
    path: "/chats",
    element: <ChatPage />,
  },
]);
function App() {
  return (
    <div className="min-h-screen">
      <UserProvider>
        <div className="bg-[url('./images/bg.avif')] min-h-screen bg-center bg-cover   ">
          <RouterProvider router={router}></RouterProvider>
        </div>
      </UserProvider>
    </div>
  );
}

export default App;
