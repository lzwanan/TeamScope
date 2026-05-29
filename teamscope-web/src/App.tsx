import { Suspense } from 'react';
import { BrowserRouter, Routes, Route } from 'react-router-dom';
import { routes } from '@/config/routes';
import AuroraShell from '@/shared/components/layout/AuroraShell';

/**
 * App 根组件
 * <p>
 * 1. 路由由 config/routes.ts 配置驱动，新增页面只改配置文件
 * 2. AuroraShell 作为布局壳，内部渲染 <Outlet />
 * 3. Suspense 处理懒加载时的 loading 状态
 */
export default function App() {
  return (
    <BrowserRouter>
      <Routes>
        <Route element={<AuroraShell />}>
          {routes.map((route) => (
            <Route
              key={route.path}
              path={route.path}
              index={route.index}
              element={
                <Suspense fallback={<PageLoading />}>
                  <route.element />
                </Suspense>
              }
            />
          ))}
        </Route>
      </Routes>
    </BrowserRouter>
  );
}

function PageLoading() {
  return (
    <div className="flex items-center justify-center h-full min-h-[200px]">
      {/* 极光旋转加载 */}
      <div className="w-8 h-8 rounded-full border-2 border-transparent
                      bg-aurora-gradient animate-spin"
           style={{ mask: 'radial-gradient(farthest-side, transparent calc(100% - 3px), #000 calc(100% - 3px))' }} />
    </div>
  );
}
