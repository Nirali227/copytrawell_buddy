import { useState } from "react";
import { QueryClient, QueryClientProvider } from "react-query";
import { ReactQueryDevtools } from "react-query/devtools";
import { Route, Routes } from "react-router";
import Account from "./Account";
import Search from "./Search";
import Feed from "./Feed";
import Nav from "./Nav";
import PostModal from "./PostModal";
import StyledSignedInApp from "./styled/SignedInApp.styled";
import Home from "./Home";

const queryClient = new QueryClient();

const SignedInApp = () => {
  const [modalOpen, setModal] = useState(false);
  return (
    <QueryClientProvider client={queryClient}>
      <StyledSignedInApp>
        <Nav setModal={setModal} />
        <Routes>
          <Route path="/" element={<Home />} />
          <Route path="/account" element={<Account />} />
          <Route path="/feed" element={<Feed />} />
          <Route path="/search" element={<Search />} />
        </Routes>
        {modalOpen && <PostModal setModal={setModal} />}
      </StyledSignedInApp>
      <ReactQueryDevtools position="bottom-right" initialIsOpen={false} />
    </QueryClientProvider>
  );
};

export default SignedInApp;