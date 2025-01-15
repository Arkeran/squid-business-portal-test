function EmptyTransaction() {
  return (
    <tr>
      <td colSpan={4}>
        <div className="text-center content-center w-full h-14 text-gray-700 bg-white">
          No transactions found
        </div>
      </td>
    </tr>
  );
}

export default EmptyTransaction;
