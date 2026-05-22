import { APP_NAME, APP_DESCRIPTION } from "@/lib/constants"
import { Button } from "@/components/ui/button"
import { Input } from "@/components/ui/input"
import { Factory } from "lucide-react"
import Link from "next/link"

export default function LoginPage() {
  return (
    <div className="flex min-h-screen items-center justify-center bg-zinc-50 dark:bg-zinc-950 p-4">
      <div className="w-full max-w-md space-y-8 glass p-8 rounded-2xl shadow-xl border border-white/20 dark:border-white/5 animate-in zoom-in duration-500">
        <div className="flex flex-col items-center text-center space-y-2">
          <div className="rounded-2xl bg-primary p-3 text-primary-foreground shadow-lg">
            <Factory className="h-8 w-8" />
          </div>
          <h1 className="text-3xl font-bold tracking-tight mt-4">{APP_NAME}</h1>
          <p className="text-muted-foreground">{APP_DESCRIPTION}</p>
        </div>

        <form className="space-y-6 mt-8">
          <div className="space-y-2">
            <label className="text-sm font-medium leading-none peer-disabled:cursor-not-allowed peer-disabled:opacity-70" htmlFor="email">
              E-posta
            </label>
            <Input id="email" placeholder="ornek@tetikpet.com" type="email" required className="bg-background/50" />
          </div>
          <div className="space-y-2">
            <div className="flex items-center justify-between">
              <label className="text-sm font-medium leading-none peer-disabled:cursor-not-allowed peer-disabled:opacity-70" htmlFor="password">
                Şifre
              </label>
              <Link href="#" className="text-xs text-primary hover:underline">
                Şifremi unuttum
              </Link>
            </div>
            <Input id="password" type="password" required className="bg-background/50" />
          </div>
          <Button className="w-full h-11 text-base shadow-lg transition-transform active:scale-95" type="submit">
            Giriş Yap
          </Button>
        </form>

        <p className="text-center text-sm text-muted-foreground">
          Hesabınız yok mu? <Link href="#" className="text-primary font-medium hover:underline">Yöneticiyle iletişime geçin</Link>
        </p>
      </div>
    </div>
  )
}
