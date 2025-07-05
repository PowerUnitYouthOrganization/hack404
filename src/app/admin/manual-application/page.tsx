import ManualApplicationForm from "@/components/admin/ManualApplicationForm";

export default function ManualApplicationPage() {
  return (
    <div className="w-full px-2 sm:px-4 md:px-6 py-4 sm:py-8 max-w-none">
      <div className="mb-6 sm:mb-8">
        <h1 className="text-2xl sm:text-3xl md:text-4xl font-normal font-['FH_Lecturis_Rounded'] text-white mb-2">
          Manual Application Creation
        </h1>
        <p className="text-white/60 text-base sm:text-lg font-light">
          Create an application manually for a user by entering their email
        </p>
      </div>
      
      <ManualApplicationForm />
    </div>
  );
}
