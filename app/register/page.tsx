import RegisterForm from "@/components/RegisterForm";

export default function RegisterPage() {
  return (
    <div className="min-h-screen relative flex items-center justify-center">

      <div
        className="absolute inset-0 bg-cover bg-center"
        style={{
          backgroundImage: "url('/register.jpg')",
        }}
      />

      <div className="absolute inset-0 bg-black/60" />

      <div className="relative z-10">
        <RegisterForm />
      </div>

    </div>
  );
}