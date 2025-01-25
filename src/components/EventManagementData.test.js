import { render, screen, waitFor } from "@testing-library/react";

import { Provider } from "react-redux";

import EventManagementData from "./EventManagementData"; // Update with the correct path

import store from "../redux/store";

describe("EventManagementData", () => {
  test("delete button removes an event", async () => {
    render(
      <Provider store={store}>
        <EventManagementData />
      </Provider>
    );

    await waitFor(() =>
      expect(screen.queryByText(/John Doe/i)).not.toBeInTheDocument()
    );
  });
});
