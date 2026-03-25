import CustomersListPage from "./CustomersListPage";

export default function NewCustomers() {
  return (
    <CustomersListPage
      title="New Customers"
      subtitle="Customers who recently placed their first orders"
      defaultFilter="New"
    />
  );
}
