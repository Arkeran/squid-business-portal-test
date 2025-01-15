function ErrorBusinessData() {
  // TODO: Have conditional error message for 40X or 50X for example.
  return (
    <div className="text-center content-center w-full h-32 text-gray-700 bg-white shadow-md rounded-lg bg-clip-border mt-5 mx-3 text-lg">
      Something went wrong while retrieving your data, please try again.
    </div>
  );
}

export default ErrorBusinessData;
