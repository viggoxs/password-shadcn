import { PasswordGenerator } from "@/components/password-generator";

export default function Home() {
  return (
    <div className="min-h-screen flex flex-col items-center justify-center p-4 bg-gradient-to-b from-gray-50 to-gray-100 dark:from-gray-900 dark:to-gray-950">
      <header className="mb-8 text-center">
        <h1 className="text-3xl font-bold mb-2">密码生成器</h1>
        <p className="text-muted-foreground">使用 Shadcn UI 构建的安全密码生成工具</p>
      </header>
      
      <main className="w-full max-w-md">
        <PasswordGenerator />
      </main>
      
      <footer className="mt-12 text-center text-sm text-muted-foreground">
        <p>© {new Date().getFullYear()} 密码生成器 | 使用 Next.js 和 Shadcn UI 构建</p>
      </footer>
    </div>
  );
}
