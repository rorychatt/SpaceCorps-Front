export function SubscribeNewsletterForm() {
    return (
        <form>
            <h6 className="footer-title">Newsletter</h6>
            <fieldset className="form-control w-80">
                <label className="label">
                    <span className="label-text">Enter your email address</span>
                </label>
                <div className="join">
                    <input
                        type="text"
                        placeholder="username@site.com"
                        className="input input-bordered join-item" />
                    <button className="btn btn-primary join-item">Subscribe</button>
                </div>
            </fieldset>
        </form>
    )
}