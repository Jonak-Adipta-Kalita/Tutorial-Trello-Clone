import Modal from "@/components/Modal";
import "./globals.css";

export const metadata = {
  title: "JAK Trello Clone",
  description: "Created by JAK following Sonny Sangha's Video",
};

export default function RootLayout({
  children,
}: {
  children: React.ReactNode;
}) {
  return (
    <html lang="en">
      <body className="bg-[#F5F6F8]">
        <Modal />
        {children}
      </body>
    </html>
  );
}
