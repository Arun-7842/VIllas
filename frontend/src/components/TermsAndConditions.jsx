import React from "react";

const TermsAndConditions = () => {
  return (
    <div className="p-8 text-gray-800 flex flex-col gap-11">
      <div className="teamscondition max-w-5xl rounded-lg mx-auto ">
        <div className="rounded-lg bg-gradient-to-b from-[#014D4E]/10 via-[#014D4E]/30 to-[#014D4E] w-full h-full flex items-center justify-center">
          <h1 className="text-5xl font-bold  text-white">Terms & Conditions</h1>
        </div>
      </div>
      <div className="max-w-4xl mx-auto">
        <p>
          <strong>Check-In/Check-Out:</strong> Check-in time is 1 PM, and
          check-out time is 11 AM. Valid government ID is required for all
          guests. Non-Indian nationals must present a passport and valid Indian
          visa.
        </p>
        <p className="mt-4">
          <strong>Security Deposit:</strong> A refundable deposit is required
          before check-in and may be adjusted for damages, extra services, or
          unpaid bills.
        </p>
        <p className="mt-4">
          <strong>Guest Limit:</strong> The number of guests should not exceed
          the agreed number at booking.
        </p>
        <p className="mt-4">
          <strong>Liability Disclaimer:</strong> Villa Owner and staff are not
          responsible for injuries, accidents, or loss of personal belongings.
        </p>
        <p className="mt-4">
          <strong>Swimming Pool:</strong> Pool use is at your own risk. No
          lifeguard is present. Children under 12 must be supervised.
        </p>
        <p className="mt-4">
          <strong>Power & Nature:</strong> There may be power outages and
          occasional insects due to the villa's natural surroundings.
        </p>
        <p className="mt-6">
          By using our services, you agree to all the terms and conditions
          stated above.
        </p>
      </div>
    </div>
  );
};

export default TermsAndConditions;
