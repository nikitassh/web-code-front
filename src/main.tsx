import { Home } from "@/pages/Home";
import { createRoot } from "react-dom/client";
import { BrowserRouter, Route, Routes } from "react-router-dom";

import "@/shared/i18n/config";
import "@/shared/styles/index.scss";
import { QueryClient, QueryClientProvider } from "react-query";
import { BaseLayout } from "./components/layouts/BaseLayout/BaseLayout";
import { Examples } from "./pages/Examples";
import { FAQ } from "./pages/FAQ";
import { Test } from "./pages/Test";
import { VideoPage } from "./pages/VideoPage";

const client = new QueryClient();

createRoot(document.getElementById("root")!).render(
  <QueryClientProvider client={client}>
    <BrowserRouter>
      <Routes>
        <Route path="/" element={<BaseLayout />}>
          <Route path="/" element={<Home />} />
          <Route path="/examples" element={<Examples />} />
          <Route path="/video/:uuid" element={<VideoPage />} />
          <Route path="/faq" element={<FAQ />} />
          <Route path="/test" element={<Test />} />
        </Route>
      </Routes>
    </BrowserRouter>
  </QueryClientProvider>
);
