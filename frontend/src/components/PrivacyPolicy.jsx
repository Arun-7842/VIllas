import React from "react";

const PrivacyPolicy = () => {
  return (
    <div className="p-8 text-gray-800 flex flex-col gap-11">
      <div className="privacyPolicy max-w-5xl rounded-lg mx-auto ">
        <div className="rounded-lg bg-gradient-to-b from-[#014D4E]/10 via-[#014D4E]/50 to-[#014D4E]/50 w-full h-full flex items-center justify-center">
          <h1 className="text-5xl font-bold  text-white">Privacy Policy</h1>
        </div>
      </div>
      <div className="max-w-4xl mx-auto">
        <p>
          <strong>Data Collection:</strong> We collect personal details like ID
          proof and contact information for security and legal compliance.
        </p>
        <p className="mt-4">
          <strong>Usage:</strong> Your information is used solely for
          communication and identification during your stay.
        </p>
        <p className="mt-4">
          <strong>Security:</strong> We store your information securely and do
          not share it with third parties unless required by law.
        </p>
        <p className="mt-4">
          <strong>Data Rights:</strong> You can request deletion of your data
          post your stay by contacting us.
        </p>
        <p className="mt-6">
          By using our services, you consent to our privacy practices as
          outlined above.
        </p>
      </div>
    </div>
  );
};

export default PrivacyPolicy;
