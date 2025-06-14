const generatedOtp = () => {
  return Math.floor(Math.random() * 900000) + 100000; ///100000 to 99999
};

export default generatedOtp;
