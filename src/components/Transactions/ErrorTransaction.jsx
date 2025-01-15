function ErrorTransaction() {
  // TODO: Have conditional error message for 40X or 50X for example.
  return (
    <tr>
      <td colSpan={4}>
        <div className="text-center content-center w-full h-14 text-gray-700 bg-white">
          Something went wrong while retrieving your data.
        </div>
      </td>
    </tr>
  );
}

export default ErrorTransaction;
