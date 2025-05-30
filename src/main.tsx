import { Home } from "@/pages/Home";
import { createRoot } from "react-dom/client";
import { BrowserRouter, Route, Routes } from "react-router-dom";

import "@/shared/i18n/config";
import "@/shared/styles/index.scss";

import {
  ConfigUiProvider,
  NotificationProvider,
  QueryClientProvider,
} from "./app/providers";
import { BaseLayout } from "./components/layouts/BaseLayout/BaseLayout";
import { Examples } from "./pages/Examples";
import { FAQ } from "./pages/FAQ";
import { VideoPage } from "./pages/VideoPage";

createRoot(document.getElementById("root")!).render(
  <QueryClientProvider>
    <ConfigUiProvider>
      <NotificationProvider>
        <BrowserRouter>
          <Routes>
            <Route path="/" element={<BaseLayout />}>
              <Route path="/" element={<Home />} />
              <Route path="/examples" element={<Examples />} />
              <Route path="/video/:uuid" element={<VideoPage />} />
              <Route path="/faq" element={<FAQ />} />
            </Route>
          </Routes>
        </BrowserRouter>
      </NotificationProvider>
    </ConfigUiProvider>
  </QueryClientProvider>
);
