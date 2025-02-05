import { render, screen, fireEvent, waitFor } from "@testing-library/react";
import { describe, it, expect, vi } from "vitest";
import Messages from "./Messages";
import { supabase } from "@/integrations/supabase/client";
import { BrowserRouter } from "react-router-dom";

// Mock Supabase client
vi.mock("@/integrations/supabase/client", () => ({
  supabase: {
    from: vi.fn(() => ({
      select: vi.fn().mockReturnThis(),
      order: vi.fn().mockReturnThis(),
      eq: vi.fn().mockReturnThis(),
      data: [],
      error: null,
    })),
  },
}));

// Mock Layout component
vi.mock("@/components/Layout", () => ({
  Layout: ({ children }: { children: React.ReactNode }) => <div>{children}</div>,
}));

describe("Messages Component", () => {
  const renderMessages = () => {
    return render(
      <BrowserRouter>
        <Messages />
      </BrowserRouter>
    );
  };

  it("renders the messages page with header", () => {
    renderMessages();
    expect(screen.getByText("Messages")).toBeInTheDocument();
  });

  it("renders the search input", () => {
    renderMessages();
    expect(screen.getByPlaceholderText("Search messages...")).toBeInTheDocument();
  });

  it("renders action buttons", () => {
    renderMessages();
    expect(screen.getByText("Compose")).toBeInTheDocument();
  });

  it("renders the messages table with correct headers", () => {
    renderMessages();
    expect(screen.getByText("From")).toBeInTheDocument();
    expect(screen.getByText("Subject")).toBeInTheDocument();
    expect(screen.getByText("Date")).toBeInTheDocument();
    expect(screen.getByText("Actions")).toBeInTheDocument();
  });

  it("handles search input changes", () => {
    renderMessages();
    const searchInput = screen.getByPlaceholderText("Search messages...");
    fireEvent.change(searchInput, { target: { value: "test" } });
    expect(searchInput).toHaveValue("test");
  });
});