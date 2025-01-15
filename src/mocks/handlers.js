import { http, delay, HttpResponse } from 'msw'
 
export const handlers = [
  http.get('/business', async () => {
    await delay(1000)
    return HttpResponse.json({
        businessName: "Yellow Door Coffee",
        totalCustomers: 120,
        pointsIssued: 34500,
      })
  }),
  http.post('/recentTransactions', async ({ request }) => {
    const filters = await request.json();

    if (!filters)
      await delay(2000);

    // The request would only retrieve the first 5 most recent results based on the filtering.
    const mockTransactions = [
        {
          date: "2024-11-30",
          customerName: "Emma Davis",
          description: "Dinner Special",
          points: 30,
        },
        {
          date: "2024-11-27",
          customerName: "Michael Green",
          description: "Grocery Shopping",
          points: 45,
        },
        {
          date: "2024-12-01",
          customerName: "John Doe",
          description: "Coffee Purchase",
          points: 10,
        },
        {
          date: "2024-11-25",
          customerName: "Sophia Carter",
          description: "Fuel Purchase",
          points: 20,
        },
        {
          date: "2024-11-28",
          customerName: "Jane Smith",
          description: "Bakery Item",
          points: 15,
        },
      ];

    // Simulate filtering - This would be done in the database request directly
    let transactions = mockTransactions;

    if (filters) {
      const customerFilter = filters.customers;
      const dateRangeFilter = filters.dateRange;
      if (customerFilter && customerFilter.length > 0)
        transactions = transactions.filter(
          (transaction) =>
            customerFilter.includes(transaction.customerName)
        );
      if (dateRangeFilter && dateRangeFilter.start) {
        transactions = transactions.filter(
          (transaction) => {
            const transactionDate = new Date(transaction.date).toISOString();
            return (
              transactionDate >= dateRangeFilter.start &&
              transactionDate <= dateRangeFilter.end
            );
          }
        )};
    }
    // Simulate sorting - This would be done in the database request directly
    transactions = transactions
      .sort((a, b) => (a.date < b.date ? 1 : -1))
      .map((transaction) => transaction);

      return HttpResponse.json({ transactions })
    }),
  http.get('/customers', async () => {
    await delay(500)
    return HttpResponse.json({
        customers: [
          { name: "John Doe" },
          { name: "Emma Davis" },
          { name: "Jane Smith" },
          { name: "Michael Green" },
          { name: "Sophia Carter" },
          { name: "Jane Smith" },
        ]
      })
  }),
  http.get('/pointsPerCategories', async () => {
    await delay(500)
    return HttpResponse.json({
        pointsPerCategories: [
          { points: 244, label: "Coffee Purchase" },
          { points: 155, label: "Dinner Special" },
          { points: 313, label: "Bakery item" },
          { points: 43, label: "Grocery Shopping" },
          { points: 122, label: "Fuel Purchase" },
        ]
      })
  }),
  http.get('/pointIssued', async () => {
    await delay(500)
    return HttpResponse.json({
        pointIssued: [
          { points: 120, day: "Wed" },
          { points: 125, day: "Thu" },
          { points: 195, day: "Fri" },
          { points: 207, day: "Sat" },
          { points: 305, day: "Sun" },
          { points: 327, day: "Mon" },
          { points: 385, day: "Tue" },
        ]
      })
  })
]