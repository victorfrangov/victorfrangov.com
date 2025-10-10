export default function Footer() {
  return (
    <footer className="py-8 px-6 border-t border-gray-200 dark:border-gray-800">
      <div className="container mx-auto text-center">
        <p className="text-sm opacity-60">
          © {new Date().getFullYear()} Victor Frangov. All rights reserved.
        </p>
      </div>
    </footer>
  );
}
