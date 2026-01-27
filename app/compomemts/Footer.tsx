export default function Footer() {
    return (
        <footer className="w-full bg-gray-900 text-gray-300 bottom-0 sticky">
            <div className="max-w-7xl mx-auto px-6 py-6 text-center">
                <p className="text-sm">
                    © {new Date().getFullYear()} ProductCatalog. All rights reserved.
                </p>
            </div>
        </footer>
    );
}
