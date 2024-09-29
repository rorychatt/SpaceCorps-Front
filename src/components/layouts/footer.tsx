import { AboutCompany, AboutLegal, AboutServices, SubscribeNewsletterForm } from "../footer-components";

export function Footer() {
    return (
        <footer className="footer bg-base-200 text-base-content p-10">
            <AboutServices />
            <AboutCompany />
            <AboutLegal />
            <SubscribeNewsletterForm />
        </footer>
    )
}