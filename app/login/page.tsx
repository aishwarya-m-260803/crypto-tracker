import LoginForm from "@/components/LoginForm";

export default function LoginPage() {
  return (
    <div className="min-h-screen relative flex items-center justify-center">

  <div
    className="absolute inset-0 bg-cover bg-center"
    style={{
      backgroundImage: "url('/login.jpg')",
    }}
  />
  <div className="absolute inset-0 bg-black/60" />

  <div className="relative z-10">
    <LoginForm />
  </div>

</div>
  );
}