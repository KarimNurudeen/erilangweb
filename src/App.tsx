import React from 'react';
import { BrowserRouter, Route, Routes } from 'react-router-dom';
import { AuthProvider } from './lib/AuthContext';
import { AnnouncementBar } from './components/layout/AnnouncementBar';
import { SiteHeader } from './components/layout/SiteHeader';
import { SiteFooter } from './components/layout/SiteFooter';
import { ScrollToTop } from './components/layout/ScrollToTop';
import { SmoothScroll } from './components/layout/SmoothScroll';
import { DismissAppLoader } from './components/layout/DismissAppLoader';
import { Home } from './pages/Home';
import { Docs } from './pages/Docs';
import { DocPage } from './pages/DocPage';
import { Sandbox } from './pages/Sandbox';
import { CaseStudies } from './pages/CaseStudies';
import { CaseStudyDetail } from './pages/CaseStudyDetail';
import { Community } from './pages/Community';
import { Register } from './pages/auth/Register';
import { VerifyEmail } from './pages/auth/VerifyEmail';
import { Login } from './pages/auth/Login';
import { ForgotPassword } from './pages/auth/ForgotPassword';
import { ResetPassword } from './pages/auth/ResetPassword';
import { Account } from './pages/Account';
import { UserProfile } from './pages/UserProfile';
import { Blog } from './pages/Blog';
import { BlogPostPage } from './pages/BlogPost';
import { NewsletterConfirm } from './pages/NewsletterConfirm';
import { NewsletterUnsubscribe } from './pages/NewsletterUnsubscribe';
import { ForumLayout } from './pages/forum/ForumLayout';
import { ForumWelcome } from './pages/forum/ForumWelcome';
import { ForumThreadView } from './pages/forum/ForumThreadView';
import { Packages } from './pages/Packages';
import { PackageDetail } from './pages/PackageDetail';
import { Releases } from './pages/Releases';
import { ReleaseDetail } from './pages/ReleaseDetail';

export function App() {
  return (
    <BrowserRouter>
      <AuthProvider>
        <div className="flex min-h-screen w-full flex-col bg-ink">
          <DismissAppLoader />
          <SmoothScroll />
          <ScrollToTop />
          <AnnouncementBar />
          <SiteHeader />
          <div className="flex-1">
            <Routes>
              <Route path="/" element={<Home />} />
              <Route path="/docs" element={<Docs />} />
              <Route path="/docs/:slug" element={<DocPage />} />
              <Route path="/sandbox" element={<Sandbox />} />
              <Route path="/case-studies" element={<CaseStudies />} />
              <Route path="/case-studies/:slug" element={<CaseStudyDetail />} />
              <Route path="/community" element={<Community />} />

              <Route path="/register" element={<Register />} />
              <Route path="/verify-email" element={<VerifyEmail />} />
              <Route path="/login" element={<Login />} />
              <Route path="/forgot-password" element={<ForgotPassword />} />
              <Route path="/reset-password" element={<ResetPassword />} />
              <Route path="/account" element={<Account />} />
              <Route path="/users/:username" element={<UserProfile />} />

              <Route path="/blog" element={<Blog />} />
              <Route path="/blog/:slug" element={<BlogPostPage />} />

              <Route path="/newsletter/confirm" element={<NewsletterConfirm />} />
              <Route path="/newsletter/unsubscribe" element={<NewsletterUnsubscribe />} />

              <Route path="/forum" element={<ForumLayout />}>
                <Route index element={<ForumWelcome />} />
                <Route path=":id" element={<ForumThreadView />} />
              </Route>

              <Route path="/packages" element={<Packages />} />
              <Route path="/packages/:name" element={<PackageDetail />} />

              <Route path="/releases" element={<Releases />} />
              <Route path="/releases/:version" element={<ReleaseDetail />} />

              <Route path="*" element={<Home />} />
            </Routes>
          </div>
          <SiteFooter />
        </div>
      </AuthProvider>
    </BrowserRouter>);

}
